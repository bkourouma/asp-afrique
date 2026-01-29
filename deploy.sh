#!/bin/bash

# ============================================
# ASPCI Web Application Deployment Script
# ============================================
# This script helps deploy the application to VPS
# Run this script on your VPS server
#
# Usage: ./deploy.sh [update]
#   - Without arguments: Initial deployment
#   - With 'update': Update existing deployment
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/asp-afrique"
GIT_BRANCH="main"  # Change to your branch name
LOG_DIR="$APP_DIR/logs"

# Functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root or with sudo"
    exit 1
fi

# Create logs directory
mkdir -p "$LOG_DIR"

print_info "Starting deployment process..."

# Check if this is an update or initial deployment
if [ "$1" = "update" ] && [ -d "$APP_DIR" ]; then
    print_info "Updating existing deployment..."
    cd "$APP_DIR"
    
    # Backup current environment files
    print_info "Backing up environment files..."
    cp apps/api/.env apps/api/.env.backup 2>/dev/null || true
    cp apps/web/.env.local apps/web/.env.local.backup 2>/dev/null || true
    cp packages/db/.env packages/db/.env.backup 2>/dev/null || true
    
    # Pull latest changes
    print_info "Pulling latest changes from git..."
    git pull origin "$GIT_BRANCH"
else
    print_info "Initial deployment..."
    
    # Check if directory exists
    if [ -d "$APP_DIR" ]; then
        print_warning "Directory $APP_DIR already exists. Use './deploy.sh update' to update."
        exit 1
    fi
    
    print_error "Initial deployment requires manual setup first."
    print_info "Please follow the DEPLOYMENT_VPS_GUIDE.md step by step."
    exit 1
fi

# Install/Update dependencies
print_info "Installing dependencies..."
cd "$APP_DIR"
pnpm install --frozen-lockfile

# Generate Prisma client
print_info "Generating Prisma client..."
cd packages/db
pnpm prisma generate
cd ../..

# Run database migrations
print_info "Running database migrations..."
cd packages/db
pnpm prisma migrate deploy
cd ../..

# Build application
print_info "Building application for production..."
pnpm build

# Restart PM2 processes
print_info "Restarting PM2 processes..."
pm2 restart ecosystem.config.js

# Save PM2 configuration
pm2 save

print_info "Deployment completed successfully!"
print_info "Checking application status..."
pm2 status

print_info "Deployment finished. Check logs with: pm2 logs"

