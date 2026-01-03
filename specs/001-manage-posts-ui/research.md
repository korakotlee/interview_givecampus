# Research: Manage Posts UI

## Decision: Slug Generation
- **Chosen**: Manual generation using Rails `ActiveSupport::Inflector#parameterize` in a `before_validation` callback.
- **Rationale**: Keeps the project simple and avoids extra dependencies (`friendly_id`) for a feature that only requires basic slug functionality.
- **Alternatives considered**: `friendly_id` (rejected for adding unnecessary complexity to a small MVP).

## Decision: Author Association
- **Chosen**: Find or create author by name in the GraphQL mutation resolver.
- **Rationale**: Since there is no auth, allowing users to just type their name is the lowest friction. `Author.find_or_create_by(name: name)` handles this gracefully in one line.
- **Alternatives considered**: Hardcoded author (rejected as it removes personalization), Dropdown of existing authors (rejected as it requires a separate user flow to create authors).

## Decision: API Pattern
- **Chosen**: Standard GraphQL mutations with return types including the post object and any errors.
- **Rationale**: Follows the existing `GraphQL-Ruby` setup in the backend and provides consistent error handling for the frontend.
- **Alternatives considered**: REST endpoints (rejected for inconsistency with the current architecture's core principle of API-First GraphQL).

## Decision: UI Components
- **Chosen**: Custom React components with Tailwind CSS for layouts and modals.
- **Rationale**: The project doesn't have a UI library like shadcn/ui yet, so custom Tailwind components are the fastest way to achieve a "premium" look without overhead.
- **Alternatives considered**: Simple browser `confirm()` (rejected for "poor" UX/Aesthetics).
