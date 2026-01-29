---
description: "Task list for ASPCI Website implementation"
---

# Tasks: ASPCI Website

**Input**: Design documents from `/specs/001-featurename-aspc-web/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included for critical functionality as specified in requirements

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `apps/api/src/` (backend), `apps/web/src/` (frontend), `packages/db/` (database)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize database schema with Prisma
- [ ] T003 [P] Configure linting and formatting tools
- [ ] T004 [P] Setup environment configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Setup PostgreSQL database connection and migrations
- [ ] T006 [P] Implement JWT authentication middleware in apps/api/src/middleware/
- [ ] T007 [P] Setup Express.js API routing structure in apps/api/src/routes/
- [ ] T008 Create base database models (AdminUser, AuditLog) in packages/db/prisma/schema.prisma
- [ ] T009 Configure error handling and logging infrastructure
- [ ] T010 Setup file upload handling for images

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Public Website Visitor (Priority: P1) 🎯 MVP

**Goal**: Enable visitors to view homepage with company information, programs, and contact details

**Independent Test**: Navigate to homepage and verify all content loads correctly

### Tests for User Story 1 ⚠️

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] E2E test for homepage content loading in tests/e2e/homepage.spec.ts
- [ ] T012 [P] [US1] API contract test for formations endpoint in tests/e2e/api.spec.ts

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create Formation model in packages/db/prisma/schema.prisma
- [ ] T014 [P] [US1] Create ContactMessage model in packages/db/prisma/schema.prisma
- [ ] T015 [US1] Implement formations API endpoint in apps/api/src/routes/formations.ts
- [ ] T016 [US1] Create homepage component in apps/web/src/app/page.tsx
- [ ] T017 [US1] Create program card components in apps/web/src/components/
- [ ] T018 [US1] Add TailwindCSS styling with ASPCI brand colors
- [ ] T019 [US1] Implement responsive design for mobile/desktop

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Program Details Viewer (Priority: P1)

**Goal**: Allow detailed viewing of individual training programs

**Independent Test**: Click program cards and view detailed information pages

### Tests for User Story 2 ⚠️

- [ ] T020 [P] [US2] E2E test for program detail pages in tests/e2e/program-details.spec.ts
- [ ] T021 [P] [US2] API contract test for single formation endpoint

### Implementation for User Story 2

- [ ] T022 [US2] Implement formation detail API endpoint in apps/api/src/routes/formations.ts
- [ ] T023 [US2] Create formations listing page in apps/web/src/app/formations/page.tsx
- [ ] T024 [US2] Create program detail page in apps/web/src/app/formation/[id]/page.tsx
- [ ] T025 [US2] Add navigation between homepage and formation pages
- [ ] T026 [US2] Implement registration CTA buttons

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Admin Content Manager (Priority: P2)

**Goal**: Enable secure admin login and content management

**Independent Test**: Admin can log in and access dashboard with content management options

### Tests for User Story 3 ⚠️

- [ ] T027 [P] [US3] E2E test for admin login flow in tests/e2e/admin-login.spec.ts
- [ ] T028 [P] [US3] API contract test for admin authentication

### Implementation for User Story 3

- [ ] T029 [US3] Implement admin login API endpoint in apps/api/src/routes/auth.ts
- [ ] T030 [US3] Create admin login page in apps/web/src/app/(auth)/login/page.tsx
- [ ] T031 [US3] Create admin dashboard in apps/web/src/app/admin/page.tsx
- [ ] T032 [US3] Implement admin sidebar navigation in apps/web/src/components/admin/
- [ ] T033 [US3] Add JWT token management in frontend
- [ ] T034 [US3] Implement admin route protection middleware

**Checkpoint**: Admin authentication and basic dashboard should be functional

---

## Phase 6: User Story 4 - Contact Form User (Priority: P2)

**Goal**: Enable visitors to submit contact forms for lead generation

**Independent Test**: Fill and submit contact form successfully

### Tests for User Story 4 ⚠️

- [ ] T035 [P] [US4] E2E test for contact form submission in tests/e2e/contact-form.spec.ts
- [ ] T036 [P] [US4] API contract test for contact endpoint

### Implementation for User Story 4

- [ ] T037 [US4] Implement contact form API endpoint in apps/api/src/routes/contact.ts
- [ ] T038 [US4] Create contact page in apps/web/src/app/contact/page.tsx
- [ ] T039 [US4] Add form validation and error handling
- [ ] T040 [US4] Integrate Google Maps component
- [ ] T041 [US4] Add spam protection (rate limiting)

---

## Phase 7: User Story 5 - Consulting Services Viewer (Priority: P3)

**Goal**: Display consulting services and enable service inquiries

**Independent Test**: View consulting page and service information

### Tests for User Story 5 ⚠️

- [ ] T042 [P] [US5] E2E test for consulting page in tests/e2e/consulting.spec.ts

### Implementation for User Story 5

- [ ] T043 [P] [US5] Create ConsultingService model in packages/db/prisma/schema.prisma
- [ ] T044 [US5] Implement consulting API endpoints in apps/api/src/routes/consulting.ts
- [ ] T045 [US5] Create consulting page in apps/web/src/app/consulting/page.tsx
- [ ] T046 [US5] Add service inquiry CTAs

---

## Phase 8: User Story 6 - Partnership Viewer (Priority: P3)

**Goal**: Showcase partnerships and accreditations for credibility

**Independent Test**: View partners page with logos and information

### Tests for User Story 6 ⚠️

- [ ] T047 [P] [US6] E2E test for partners page in tests/e2e/partners.spec.ts

### Implementation for User Story 6

- [ ] T048 [P] [US6] Create Partner model in packages/db/prisma/schema.prisma
- [ ] T049 [US6] Implement partners API endpoints in apps/api/src/routes/partners.ts
- [ ] T050 [US6] Create partners page in apps/web/src/app/partenaires/page.tsx
- [ ] T051 [US6] Implement image upload for partner logos

---

## Phase 9: Admin CRUD Operations

**Purpose**: Complete admin content management for all entities

- [ ] T052 [P] Admin CRUD for formations in apps/web/src/app/admin/formations/
- [ ] T053 [P] Admin CRUD for consulting services in apps/web/src/app/admin/consulting/
- [ ] T054 [P] Admin CRUD for partners in apps/web/src/app/admin/partners/
- [ ] T055 [P] Admin contact messages viewer in apps/web/src/app/admin/messages/
- [ ] T056 Implement file upload for admin content
- [ ] T057 Add audit logging for all admin actions

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and optimizations

- [ ] T058 [P] Performance optimization and Lighthouse score improvements
- [ ] T059 [P] Accessibility compliance (WCAG 2.1 AA)
- [ ] T060 [P] SEO optimization with meta tags and schema markup
- [ ] T061 [P] Error handling and user feedback improvements
- [ ] T062 [P] Database seeding with initial content
- [ ] T063 [P] Final testing and bug fixes
- [ ] T064 Deploy configuration and documentation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Admin CRUD (Phase 9)**: Depends on User Stories 3 completion
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Independent - can start after Foundational
- **US2 (P1)**: Independent - can start after Foundational
- **US3 (P2)**: Independent - can start after Foundational
- **US4 (P2)**: Independent - can start after Foundational
- **US5 (P3)**: Independent - can start after Foundational
- **US6 (P3)**: Independent - can start after Foundational

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- Once Foundational completes, all user stories can start in parallel
- Admin CRUD operations can be developed in parallel
- Polish tasks can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1-2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Homepage)
4. Complete Phase 4: User Story 2 (Program Details)
5. **STOP and VALIDATE**: Test both stories independently
6. Deploy/demo MVP

### Full Implementation

1. Complete Setup + Foundational → Foundation ready
2. Implement all user stories in parallel or priority order
3. Add admin CRUD operations
4. Polish and optimize
5. Deploy production

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task completion
- Stop at any checkpoint to validate independently
- All paths use monorepo structure: apps/api/, apps/web/, packages/db/