# Feature Specification: Manage Posts UI

**Feature Branch**: `001-manage-posts-ui`
**Created**: 2026-01-02
**Status**: Draft
**Input**: User description: "Add a UI to add/edit/delete post. No need for authentication"

## Clarifications

### Session 2026-01-02
- Q: Post Publication State → A: Immediate (v1)
- Q: Slug Collisions → A: Random Suffix (v1)
- Q: Validation Feedback → A: Inline Fields (v1)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create a New Post (Priority: P1)

As a user, I want to create a new blog post so that I can share my thoughts with everyone without needing to log in.

**Why this priority**: Core functionality of the requested feature. Without creation, there is no content to manage.

**Independent Test**: Can be fully tested by navigating to `/posts/new`, filling out the form, and submitting. Success is verified by seeing the new post on the list.

**Acceptance Scenarios**:

1. **Given** I am on the "New Post" page, **When** I fill in the Title, Content, Category, and Author Name, and click "Submit", **Then** I should be redirected to the list of posts and see my new post.
2. **Given** I am on the "New Post" page, **When** I leave the Title empty and click "Submit", **Then** I should see a validation error and the post should not be created.

---

### User Story 2 - Edit an Existing Post (Priority: P2)

As a user, I want to update the content of a post I previously created to fix typos or add new information.

**Why this priority**: Essential for maintaining content quality over time.

**Independent Test**: Can be tested by clicking "Edit" on a specific post, changing its title, and saving. Success is verified by seeing the updated title on the post detail/list.

**Acceptance Scenarios**:

1. **Given** I am on the "Edit Post" page for an existing post, **When** I change the content and click "Update", **Then** I should see a success message and the post content should be updated in the system.

---

### User Story 3 - Delete a Post (Priority: P3)

As a user, I want to remove posts that are no longer relevant, with a confirmation step to prevent accidents.

**Why this priority**: Necessary for content moderation/cleanup, but placed lower than creation/editing as it's a destructive action.

**Independent Test**: Can be tested by clicking "Delete" and confirming in the modal. Success is verified by the post no longer appearing in the list.

**Acceptance Scenarios**:

1. **Given** I click the "Delete" button on a post, **When** the confirmation modal appears and I click "Confirm", **Then** the post should be removed and the list should refresh.
2. **Given** I click the "Delete" button, **When** I click "Cancel" in the confirmation modal, **Then** the post should still exist.

---

### Edge Cases

- **Empty Fields**: Submitting the form with mandatory fields (Title, Content, Author Name) empty.
- **Slug Collisions**: Creating two posts with the same title (Slug should be unique).
- **Network Errors**: Backend API is down when submitting the form (UI should show a graceful error).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "Create Post" page at `/posts/new`.
- **FR-002**: System MUST provide an "Edit Post" page at `/posts/[slug]/edit` or `/posts/[id]/edit`.
- **FR-003**: System MUST allow users to enter `Title`, `Content`, `Category`, and `Author Name`.
- **FR-004**: System MUST automatically generate a unique `slug` based on the `Title` (e.g., append random 4-char suffix if title collision occurs).
- **FR-005**: System MUST find or create an `Author` record based on the provided "Author Name" string.
- **FR-006**: System MUST show a custom UI Confirmation Modal before performing a DELETE operation.
- **FR-007**: System MUST NOT require any authentication or authorization headers for CRUD operations.
- **FR-008**: System MUST display toast notifications for global "Success"/"Error" states and INLINE error messages for field validations.

### Key Entities

- **Post**: Represents the blog content. Attributes: `id`, `title`, `content`, `category`, `slug`, `published_at`, `author_id`.
- **Author**: Represents the writer. Attributes: `id`, `name`. (Handled via string lookup/creation during post submission).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can create a post from start to finish in under 30 seconds.
- **SC-002**: 100% of CRUD operations are functional without an "Authorization" header.
- **SC-003**: Deletion is impossible without responding to the confirmation modal.
- **SC-004**: Post listing UI updates immediately (optimistically or via refresh) after any CRUD action.
