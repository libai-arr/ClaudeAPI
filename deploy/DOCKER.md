# Sub2API Docker Image

Sub2API is an AI API Gateway Platform for distributing and managing AI product subscription API quotas.

## Quick Start

```bash
docker run -d \
  --name sub2api \
  -p 8080:8080 \
  -e DATABASE_URL="postgres://user:pass@host:5432/sub2api" \
  -e REDIS_URL="redis://host:6379" \
  ghcr.io/libai-arr/sub2api:main
```

## Docker Compose

```yaml
version: '3.8'

services:
  sub2api:
    image: ${SUB2API_IMAGE:-ghcr.io/libai-arr/sub2api:main}
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/sub2api?sslmode=disable
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=sub2api
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Use `SUB2API_IMAGE` in your `.env` or compose override to pin a deployment to `main`, a release tag like `v1.2.3`, or a commit image like `sha-abcdef0`.

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `REDIS_URL` | Redis connection string | Yes | - |
| `PORT` | Server port | No | `8080` |
| `GIN_MODE` | Gin framework mode (`debug`/`release`) | No | `release` |

## Supported Architectures

- `linux/amd64`
- `linux/arm64`

## Tags

- `main` - Latest image built from the main branch
- `sha-<shortsha>` - Immutable image for a specific commit
- `vX.Y.Z` - Specific release version
- `latest` / `x.y` / `x` - Release tags published by the release workflow

## Links

- [GitHub Repository](https://github.com/libai-arr/ClaudeAPI)
- [Documentation](https://github.com/libai-arr/ClaudeAPI#readme)
