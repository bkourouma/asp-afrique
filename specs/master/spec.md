# Feature Specification: ASPCI Website

## Overview

Institutional marketing website for ASPCI (Association for Professional Skills and Career Innovation) focused on credibility and lead generation. The site will showcase programs (CQP), consulting services, partnerships/accreditations, and provide contact mechanisms.

## Functional Requirements

### Public Pages
- **Home**: Hero section, featured programs, services overview, testimonials, CTA
- **Formations**: List of CQP programs with details (title, duration, outcomes, syllabus)
- **Consulting**: Consulting services by sector with descriptions and CTAs
- **Partenaires/Accréditations**: Partnership and accreditation logos with links
- **À propos**: Organization information, mission, team
- **FAQ**: Frequently asked questions
- **Contact**: Contact form with validation, rate limiting, anti-spam

### Content Management (Admin Only)
- CRUD operations for all content types
- Secure authentication with JWT
- Audit logging for all admin actions
- Media management with alt text requirements

### Technical Requirements
- Server-side validation for all forms
- Privacy policy and analytics consent
- WCAG 2.1 AA accessibility compliance
- Performance budgets: LCP < 2.5s, CLS < 0.1, TBT < 200ms
- i18n-ready (French primary, English optional)
- SEO optimization with schema.org markup
- Privacy-friendly analytics
- Error tracking and uptime monitoring

## Content Models

### Programs (CQP)
- Title
- Duration (hours)
- Learning outcomes
- Short syllabus

### Consulting Services
- Name
- Description
- Target sectors
- Call-to-action

### Partnerships/Accreditations
- Label
- Logo (secure storage)
- Link

### Pages
- Home, Formations, Consulting, Partenaires/Accréditations, À propos, FAQ, Contact

### Global Settings
- Organization info
- Contact details (phones/WhatsApp)
- Address/map coordinates
- Social media links
- SEO defaults

## Non-Functional Requirements

### Security
- Admin-only authentication
- Production-grade JWT
- No mock data (use DB seeders)
- Secure media storage with access control
- Backups and secret rotation

### Performance
- Lighthouse score ≥ 90
- Fast loading times
- Responsive design

### Quality
- Unit tests for server logic
- E2E tests with Puppeteer
- Linting and strict typing
- Debug with Chrome DevTools

### Compliance
- GDPR/privacy compliance
- Accessibility standards
- Audit trails

## Acceptance Criteria

- All pages load within performance budgets
- Contact form submissions are validated and protected
- Admin can manage all content securely
- Site passes WCAG 2.1 AA audits
- SEO markup implemented
- Analytics consent functional
- Error tracking configured