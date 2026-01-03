# Implementation Plan: Manage Posts UI

**Branch**: `001-manage-posts-ui` | **Date**: 2026-01-02 | **Spec**: `/specs/001-manage-posts-ui/spec.md`
**Input**: Feature specification from `/specs/001-manage-posts-ui/spec.md`

## Summary

The primary requirement is to implement a full CRUD (Create, Read, Update, Delete) UI for blog posts without authentication. The technical approach involves:
- **Backend**: Adding GraphQL mutations for `createPost`, `updatePost`, and `deletePost`. Implementation of logic to find-or-create authors by name and generate unique slugs.
- **Frontend**: Creating Next.js pages for `/posts/new` and `/posts/[slug]/edit`. Using a custom `GclProvider` for data fetching and `shadcn/ui` (or similar) for a premium look, including a custom deletion confirmation modal.

## Technical Context

**Language/Version**: Ruby 3.x (Rails 8.1), TypeScript (Next.js 15)
**Primary Dependencies**: Rails, GraphQL-Ruby, SQLite, React, Tailwind CSS
**Storage**: SQLite
**Testing**: Vitest (Frontend), RSpec/Minitest (Backend)
**Target Platform**: Web (Next.js/Rails)
**Project Type**: Web Application
**Performance Goals**: < 1s for post creation/listing updates.
**Constraints**: No authentication required. All actions unauthenticated.
**Scale/Scope**: Small scale (MVP blog functionality).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Technical Documentation First (Markdown/Clear/Concise)
- [x] Code Reuse & Style Policy (Search existing, use theme vars, DRY)
- [x] Simplicity (Focus on practical usage)

## Project Structure

### Documentation (this feature)

```text
specs/001-manage-posts-ui/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (generated separately)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── graphql/
│   │   ├── mutations/   # New mutations for CRUD
│   │   ├── types/       # Updated/New types
│   │   └── backend_schema.rb
│   └── models/
│       ├── post.rb      # Logic for slugs/authors
│       └── author.rb
└── tests/

frontend/
├── src/
│   ├── app/
│   │   └── posts/
│   │       ├── new/     # Create page
│   │       └── [slug]/
│   │           └── edit/# Edit page
│   └── components/
│       ├── PostForm.tsx  # Shared form component
│       └── DeleteModal.tsx# Confirmation modal
└── tests/
```

**Structure Decision**: Web application structure as detected in the project root. Using existing `backend` and `frontend` directories.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | | |
