# Quickstart: Manage Posts UI

## Development Setup

1. **Backend**:
   - Ensure the server is running: `cd backend && bin/rails s -p 3001`
   - Run tests: `cd backend && bundle exec rspec`

2. **Frontend**:
   - Ensure the dev server is running: `cd frontend && npm run dev`
   - Navigate to `http://localhost:3000/posts/new` to create your first post.

## Key Files
- Backend Mutations: `backend/app/graphql/mutations/*.rb`
- Frontend Pages:
  - Create: `frontend/src/app/posts/new/page.tsx`
  - Edit: `frontend/src/app/posts/[slug]/edit/page.tsx`
- Shared Components:
  - `frontend/src/components/PostForm.tsx`
  - `frontend/src/components/DeleteModal.tsx`

## Testing the Flow
- **Create**: Fill form -> Submit -> Check list.
- **Edit**: Click edit -> Update title -> Save -> Check list.
- **Delete**: Click delete -> Confirm modal -> Check list.

## Running Automated Tests
- **Backend (RSpec)**:
  ```bash
  cd backend
  bundle exec rspec
  ```
- **Frontend (Vitest)**:
  ```bash
  cd frontend
  npm test
  ```
