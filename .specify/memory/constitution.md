<!--
Sync Impact Report:
- Version change: 1.1.0 → 1.2.0
- List of modified principles: None (single tenant clarification)
- Added sections: None
- Removed sections: None
- Templates requiring updates: None (templates are generic)
- Follow-up TODOs: None
-->

# ASPCI Website Constitution

## Purpose & Scope

Institutional marketing site (FR primary, EN optional later) focused on credibility and lead generation. Future-ready for portals (students/companies) without enabling them now.

## Core Principles

### I. No Mock Data (NON-NEGOTIABLE)
No mock data; use DB seeders. Never bypass auth; enforce JWT. No hardcoded IDs/roles/secrets (only in test/seed files).

Rationale: Ensures production-grade security and data integrity from day one, preventing common development shortcuts that lead to security vulnerabilities.

### II. Debug with Chrome DevTools + Puppeteer (NON-NEGOTIABLE)
Debug via Chrome DevTools & Puppeteer.

Rationale: Comprehensive testing and debugging ensures cross-browser compatibility and catches issues early in development.

### III. Admin-Only Authentication with Production-Grade JWT
Admin-only authentication with production-grade JWT.

Rationale: Restricts content management to authorized personnel while maintaining security standards.

### IV. Server-Side Validation and Security Measures
Server-side validation for all inputs; rate limiting & anti-spam on forms.

Rationale: Protects against malicious inputs and automated attacks on contact forms.

### V. Privacy Policy & Analytics Consent
Privacy policy & analytics consent; audit logs for admin actions.

Rationale: Ensures compliance with data protection regulations and maintains audit trails for administrative activities.

### VI. Secure Media Storage & Access Control
Secure media storage & access control; backups & secret rotation.

Rationale: Protects sensitive media assets and ensures data availability through proper backup and security practices.

### VII. Content Model Structure
Programs (CQP): title, duration (hours), outcomes, short syllabus. Consulting services: name, description, sectors, CTA. Partnerships/Accreditations: label, logo, link. Pages: Home, Formations, Consulting, Partenaires/Accréditations, À propos, FAQ, Contact. Global settings: org info, phones/WhatsApp, address/map, social, SEO defaults. Media entries require alt text.

Rationale: Defines the information architecture for content management without specifying implementation details.

### VIII. WCAG 2.1 AA Accessibility
WCAG 2.1 AA; keyboard nav; contrast ≥ 4.5:1.

Rationale: Ensures the website is accessible to users with disabilities, complying with international standards.

### IX. Performance Budgets
Performance budgets (home): LCP < 2.5s, CLS < 0.1, TBT < 200ms.

Rationale: Guarantees fast loading and smooth user experience critical for credibility and lead generation.

### X. i18n-Ready with SEO Optimization
i18n-ready (fr→en), sitemap.xml, robots.txt, schema.org (Organization, Course, FAQ), OG/Twitter cards.

Rationale: Prepares for bilingual expansion while optimizing for search engines and social media sharing.

### XI. Privacy-Friendly Analytics
Privacy-friendly analytics with consent.

Rationale: Enables data-driven improvements while respecting user privacy preferences.

### XII. Error Tracking and Uptime Monitoring
Error tracking and uptime monitoring.

Rationale: Ensures reliability and quick resolution of issues affecting user experience.

### XIII. Admin CRUD Audit Logging
Admin CRUD audit logging.

Rationale: Maintains complete audit trails for all content management operations.

### XIV. Roles: Admin Only
Admin (CMS) only; Public visitors are anonymous (read-only).

Rationale: Defines clear access control boundaries for the marketing-focused website.

### XV. Quality Gates
Linting/formatting; strict typing if supported by stack. Unit tests for server logic; Lighthouse ≥ 90. E2E flows via Puppeteer: contact submission, program/consulting navigation, admin CRUD.

Rationale: Establishes automated quality assurance processes to maintain code and performance standards.

## Governance

Constitution supersedes all other practices. Amendments require documentation, approval, migration plan. All PRs/reviews must verify compliance. Complexity must be justified. Use this constitution for runtime development guidance.

**Version**: 1.2.0 | **Ratified**: 2025-10-16 | **Last Amended**: 2025-10-16
