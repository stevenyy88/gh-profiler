# API Docs

## `POST /api/summarize`

**Description:** Fetch and summarize a GitHub user profile.

### Request Body
```json
{
  "url": "https://github.com/username"
}
```

### Response Body
```json
{
  "success": true,
  "data": {
    "username": "...",
    "profile": { ... },
    "overview": { ... },
    "repositories": [ ... ],
    "summary": {
      "predominantLanguages": [ ... ],
      "totalStars": 0,
      "totalForks": 0,
      "activeReposCount": 0,
      "notableRepos": [ ... ],
      "latestActivity": "2024-01-01T00:00:00Z",
      "isMaintained": true
    },
    "warnings": [],
    "generatedAt": "..."
  }
}
```

### Errors
If failure, returns:
```json
{
  "success": false,
  "error": "Error message",
  "code": "VALIDATION_ERROR"
}
```
with status 400, 404, or 500.
