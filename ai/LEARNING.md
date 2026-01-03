# Learning Diary

## Project: GC Tech Blog

- **Stack**: Next.js (Frontend), Ruby on Rails (Backend), GraphQL, SQLite.
- **Goal**: Build a casual blog for the GC Tech Team.

## 2026-01-02: Manage Posts UI (Edit/Delete) & Testing
- **Integration**: `Next.js` dynamic routes need defensive parameter handling (`slug`). Always cast to string explicitly.
- **GraphQL**: `graphql-ruby` mutations inheriting from `BaseMutation` often enforce Relay-style `input` object wrapping. Frontend must comply by sending `{ input: { args... } }`.
- **Testing**:
  - **Backend**: `RSpec` + `FactoryBot` + `ShouldaMatchers` provide a robust, readable DSL for model and request testing. Don't forget `config.include FactoryBot::Syntax::Methods`.
  - **Frontend**: `Vitest` + `@testing-library/react` is a fast replacement for Jest. Use `vi.fn()` for mocks.
