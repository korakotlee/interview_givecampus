# Data Model: Manage Posts UI

## Entities

### Post
Represents a blog entry.

| Field | Type | Description | Validations |
|-------|------|-------------|-------------|
| title | String | The heading of the post | Presence, Length (min 3) |
| content | Text | The main body text | Presence |
| category | String | Optional category label | Optional |
| slug | String | URL-friendly identifier | Unique, Presence |
| published_at | DateTime | When the post was made public | Default to `Time.current` |
| author_id | Integer | Reference to the author | Presence |

**Relationships**:
- Belongs to `Author`

**State Transitions**:
- `draft` -> `published` (simplified for this MVP: creation sets `published_at`)

### Author
Represents the creator of a post.

| Field | Type | Description | Validations |
|-------|------|-------------|-------------|
| name | String | The display name of the author | Presence, Unique |

**Relationships**:
- Has many `Posts`

## Business Logic
- **Slug Generation**: Generated from `title`. If collision exists, append a random suffix or timestamp.
- **Author Lookup**: On `createPost`, if the name doesn't exist, create a new author.
