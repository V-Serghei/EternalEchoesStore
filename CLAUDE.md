# Claude Working Rules

## Language

- **Respond to the user in Russian.**
- Write all project files, code, comments, README.md, and this file in **English**.

---

## Git Protocol

1. **No commits** — only the user makes git commits.
   Never run `git commit`, `git push`, `git reset`, or any destructive git command
   without an explicit user request.
2. **All git commands are executed by the user only** — provide commands as
   plain text, never run them via Bash/PowerShell.
3. **Suggest a commit message** — after every set of changes, provide a
   ready-made conventional-commit message for the user to copy.

---

## Documentation

### README.md
- Contains **project description only**: what it is, tech stack, quick start,
  environment variables, architecture overview.
- Must be updated after every significant code change.
- Rules and instructions for Claude go **only** in CLAUDE.md, never in README.md.

### CLAUDE.md (this file)
- Contains Claude's working rules, project context, and conventions.
- Add new rules and agreements here as they arise.
- Keep it up to date; stale rules are worse than no rules.

### .gitignore
- Must cover: build artifacts (`bin/`, `obj/`), IDE files (`.vs/`, `.idea/`),
  secrets (`.env`, `*.user`, `secrets.json`, `appsettings.*.json` except
  `appsettings.json`), OS files (`.DS_Store`, `Thumbs.db`), `node_modules/`.
- Maintain continuously — add entries whenever new tool output or secrets appear.

---

## start.bat / stop.bat

**Both files must exist at the repository root and always be kept accurate.**

`start.bat` checks prerequisites, starts PostgreSQL, applies migrations, builds
and starts the .NET API, and launches the Next.js dev server.

`stop.bat` terminates all processes started by `start.bat`.

Update both files immediately when: a new dependency is added, an environment
variable is required, a service is added or removed, or a config file is renamed.

---

## Architecture

Clean Architecture with CQRS:

```
Domain ──► Contracts
  │                 \
  └──► Infrastructure ──► Application ──► Presentation
                                              └── Client/ (Next.js)
```

| Project | Responsibility |
|---|---|
| **Domain** | Entities, value objects. No external NuGet dependencies. |
| **Contracts** | DTOs, request/response records, custom exceptions. |
| **Infrastructure** | EF Core DbContexts, migrations, data access. |
| **Application** | MediatR handlers, FluentValidation validators, Mapster mappings. |
| **Presentation** | ASP.NET Core host, Minimal API endpoint modules, middleware. |

### Key conventions

- Endpoint groups live in `Presentation/Modules/` — one static class per domain aggregate.
- Each CQRS operation has its own folder: `Application/Commands/Create/CreateProductCommand.cs`.
- Two DbContexts (`ProductDbContext`, `UserDbContext`) both target PostgreSQL via Npgsql.
- Connection string key: `ConnectionStrings:DbConnectionString`.
- CORS allows `http://localhost:3000` for the local Next.js dev server.
- OpenAPI/Scalar docs are served only in Development (`/scalar/v1`).

### Technology versions

| Technology | Version |
|---|---|
| .NET | 10 |
| EF Core | 10.0.x |
| Npgsql.EntityFrameworkCore.PostgreSQL | 10.0.x |
| MediatR | 12.x |
| FluentValidation | 11.x |
| Mapster | 7.x |
| Next.js | 15.x |
| React | 19.x |

---

## Code Style

- No speculative features, no abstractions beyond the current task.
- No comments explaining WHAT code does; only add one when the WHY is non-obvious.
- No trailing summaries in responses — the user can read the diff.
