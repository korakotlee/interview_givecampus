---
description: "Task list for Manage Posts UI implementation"
---

# Tasks: Manage Posts UI

**Input**: Design documents from `/specs/001-manage-posts-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit TDD requested in spec.md; implementation focuses on functionality and inline validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project Structure**: Web app with `backend/` and `frontend/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T000 Search codebase for existing similar form components or GraphQL mutation patterns
- [X] T001 [P] Ensure `backend` and `frontend` dev servers are configured for local development
- [X] T002 [P] Verify `frontend/src/components/GclProvider.tsx` supports mutation calls as planned

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Implement slug generation logic in `backend/app/models/post.rb` using `ActiveSupport::Inflector#parameterize`
- [X] T004 Add uniqueness validation for `slug` in `backend/app/models/post.rb`
- [X] T005 [P] Create `BaseMutation` if not present in `backend/app/graphql/mutations/base_mutation.rb`
- [X] T006 [P] Update `Author` model validations in `backend/app/models/author.rb` to ensure name presence

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create a New Post (Priority: P1) 🎯 MVP

**Goal**: Allow users to share thoughts by creating a post without authentication.

**Independent Test**: Navigate to `/posts/new`, submit the form, and verify redirection to the list with the new post visible.

### Implementation for User Story 1

- [X] T007 [P] [US1] Create `CreatePost` mutation class in `backend/app/graphql/mutations/create_post.rb`
- [X] T008 [US1] Implement `Author.find_or_create_by(name: author_name)` logic in `CreatePost` mutation resolver
- [X] T009 [P] [US1] Register `create_post` field in `backend/app/graphql/types/mutation_type.rb`
- [X] T010 [P] [US1] Create modular `PostForm.tsx` component in `frontend/src/components/PostForm.tsx` using Tailwind CSS
- [X] T011 [US1] Implement Create Post page at `frontend/src/app/posts/new/page.tsx` using `PostForm`
- [X] T012 [US1] Add success toast notification and redirection logic after successful creation in `frontend/src/app/posts/new/page.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Edit an Existing Post (Priority: P2)

**Goal**: Enable users to update content to fix errors or add new info.

**Independent Test**: Click "Edit" on a post, change the title, save, and verify the title is updated in the list.

### Implementation for User Story 2

- [ ] T013 [P] [US2] Create `UpdatePost` mutation class in `backend/app/graphql/mutations/update_post.rb`
- [ ] T014 [P] [US2] Register `update_post` field in `backend/app/graphql/types/mutation_type.rb`
- [ ] T015 [P] [US2] Implement Edit Post page at `frontend/src/app/posts/[slug]/edit/page.tsx`
- [ ] T016 [US2] Fetch existing post data by slug and populate `PostForm` in `frontend/src/app/posts/[slug]/edit/page.tsx`
- [ ] T017 [US2] Handle update submission and display feedback in `frontend/src/app/posts/[slug]/edit/page.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Delete a Post (Priority: P3)

**Goal**: Provide a way to remove posts with a safety confirmation modal.

**Independent Test**: Click "Delete", confirm in the modal, and verify the post is removed from the list.

### Implementation for User Story 3

- [ ] T018 [P] [US3] Create `DeletePost` mutation class in `backend/app/graphql/mutations/delete_post.rb`
- [ ] T019 [P] [US3] Register `delete_post` field in `backend/app/graphql/types/mutation_type.rb`
- [ ] T020 [P] [US3] Create `DeleteModal.tsx` confirmation component in `frontend/src/components/DeleteModal.tsx`
- [ ] T021 [US3] Integrate `DeleteModal` into the post list or post card component (e.g., `frontend/src/components/BlogList.tsx`)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T022 [P] Implement inline error message display for all fields in `frontend/src/components/PostForm.tsx`
- [ ] T023 [P] Update `specs/001-manage-posts-ui/quickstart.md` with any actual usage details discovered during implementation
- [ ] T024 Perform final validation of SC-001 through SC-004 from `spec.md`
- [ ] T025 Run `backend` and `frontend` tests to ensure no regressions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion. Can run in parallel US1, US2, US3 once foundation is set.

---

## Parallel Example: User Story 1

```bash
# Implement backend and frontend parts of US1 in parallel:
Task: "Create CreatePost mutation class in backend/app/graphql/mutations/create_post.rb"
Task: "Create modular PostForm.tsx component in frontend/src/components/PostForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 (Setup & Foundational).
2. Complete Phase 3 (US1: Create Post).
3. **STOP and VALIDATE**: Verify a post can be created and viewed.

### Incremental Delivery

1. Foundation -> Create Post (MVP)
2. Add Edit Post (P2)
3. Add Delete Post (P3)
