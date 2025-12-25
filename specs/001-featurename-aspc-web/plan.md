# Implementation Plan: ASPCI Website

**Branch**: `001-featurename-aspc-web` | **Date**: 2025-10-20 | **Spec**: specs/001-featurename-aspc-web/spec.md
**Input**: Feature specification from `/specs/001-featurename-aspc-web/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Develop a complete web application for ASPCI (Académie de la Sécurité Professionnelle de Côte d'Ivoire) with a public frontend and admin backend connected to PostgreSQL with JWT authentication. The application will showcase 6 security training programs, consulting services, partnerships, and provide contact functionality with secure admin content management.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js 18+, TypeScript 5.0+
**Primary Dependencies**: Next.js 14, Express.js, Prisma ORM, TailwindCSS, JWT
**Storage**: PostgreSQL database with Prisma ORM
**Testing**: Jest, React Testing Library, Playwright for E2E
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge), responsive design
**Project Type**: Full-stack web application (frontend + backend)
**Performance Goals**: LCP < 2.5s, CLS < 0.1, TBT < 200ms, Lighthouse score ≥ 90
**Constraints**: WCAG 2.1 AA accessibility, GDPR compliance, secure admin authentication
**Scale/Scope**: 6 training programs, consulting services, partnerships, contact forms, admin CMS

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ PASSED - Project uses existing monorepo structure with apps/api and apps/web, which aligns with constitution guidelines. No violations detected.

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# Existing Monorepo Structure (apps/ + packages/)
apps/
├── api/                    # Backend API (Express.js + TypeScript)
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models (Prisma)
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation, etc.
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   └── tests/
├── web/                    # Frontend (Next.js + TypeScript)
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   ├── components/     # React components
│   │   ├── lib/            # Utilities, API clients
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
packages/
├── db/                     # Shared database package
│   ├── prisma/             # Database schema & migrations
│   └── src/                # Database utilities
└── ui/                     # Shared UI components (optional)
```

**Structure Decision**: Using existing monorepo structure with apps/api (backend) and apps/web (frontend) as specified in the project setup. Database logic centralized in packages/db with Prisma ORM.

## Complexity Tracking

*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

