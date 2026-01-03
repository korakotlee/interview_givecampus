# Quickstart: Manage Posts UI

## Development Setup

1. **Backend**:
   - Ensure the server is running: `cd backend && bin/rails s -p 3001`
   - Run tests: `cd backend && bundle exec rspec` (if RSpec matches your setup)

2. **Frontend**:
   - Ensure the dev server is running: `cd frontend && npm run dev`
   - Navigate to `http://localhost:3000/posts/new` to create your first post.

## Key Files
- Backend Mutation: `backend/app/graphql/mutations/create_post.rb`
- Frontend Page: `frontend/src/app/posts/new/page.tsx`
- Shared Component: `frontend/src/components/PostForm.tsx`

## Testing the Flow
- **Create**: Fill form -> Submit -> Check list.
- **Edit**: Click edit -> Update title -> Save -> Check list.
- **Delete**: Click delete -> Confirm modal -> Check list.
