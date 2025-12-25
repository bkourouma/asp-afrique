# ASPCI Web Application

## Authentication Setup

This application uses NextAuth.js with JWT authentication for secure admin access.

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/aspc_ci_db"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# JWT Configuration
JWT_AUDIENCE="aspc-ci-web"
JWT_ISSUER="aspc-ci"

# Admin User (for seeding)
ADMIN_EMAIL="admin@aspc-ci.org"
ADMIN_PASSWORD="Admin123!"
```

### Database Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   cd packages/db && pnpm install
   ```

2. **Run migrations:**
   ```bash
   cd packages/db && pnpm db:migrate
   ```

3. **Generate Prisma client:**
   ```bash
   cd packages/db && pnpm db:generate
   ```

4. **Seed database:**
   ```bash
   cd packages/db && pnpm db:seed
   ```

### JWT Token Flow

- **Access Token**: Short-lived (15 minutes), used for API authentication
- **Refresh Token**: Long-lived (30 days), stored hashed in database, rotated on use
- **Rotation**: Each refresh generates a new refresh token, previous ones are revoked

### API Endpoints

- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Revoke refresh tokens
- `GET /api/v1/me` - Get current user info (requires access token)

### Security Features

- bcrypt password hashing (cost 12)
- Rate limiting on login attempts (5/min per email/IP)
- HTTP-only, Secure, SameSite cookies for refresh tokens
- CSRF-safe authentication flows
- Audit logging for all auth events

### Resetting Admin Password

To reset the admin password:

1. Update the `ADMIN_PASSWORD` in your `.env.local`
2. Re-run the seed:
   ```bash
   cd packages/db && pnpm db:seed
   ```

### Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run E2E tests
npx playwright test
```

### Production Deployment

1. Set secure `NEXTAUTH_SECRET` (32+ characters)
2. Use HTTPS in production
3. Configure proper database connection
4. Set `NODE_ENV=production`
5. Use environment-specific secrets (not the demo ones)
