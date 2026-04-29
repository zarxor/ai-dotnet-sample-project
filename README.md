# TrailForge Planner

A small ASP.NET Core web app targeting .NET 10. The app is a visual hiking trip planner, intended as a realistic codebase you can use while demonstrating AI-assisted development.

The app itself does not simulate AI. It gives you a concrete product surface to change, explain, refactor, and extend during demos.

## Run

Install the .NET 10 SDK, then run:

```bash
dotnet run
```

The launch profile uses `http://localhost:5025`.

## What The App Does

- Shows candidate Nordic hiking routes.
- Filters routes by difficulty.
- Displays planning metrics for distance, days, and packing readiness.
- Shows a packing checklist.
- Lets users add short planning notes through a backend API.

## AI Demo Moves

- Code generation: add a search box, a region filter, or a trip comparison view.
- Code explanation: ask for a walkthrough of `Program.cs`, `wwwroot/app.js`, and the API contract.
- Code changes: add editable packing items or persist notes to a file.
- MCP actions: use external MCP tools against the repo, such as creating an issue, reading PR comments, or checking CI.
- AGENTS.md: ask the assistant to change the UI while following repository guidance.
- Skills: ask the assistant to use `.codex/skills/trail-feature/SKILL.md` when adding a new product feature.

## Useful Files

- `Program.cs` contains the API endpoints and in-memory sample data.
- `TrailForgePlanner.csproj` targets .NET 10.
- `wwwroot/index.html` contains the planner layout.
- `wwwroot/app.js` loads API data and handles note creation.
- `wwwroot/styles.css` controls the visual design.
- `AGENTS.md` provides repository instructions for AI agents.
- `.codex/skills/trail-feature/SKILL.md` is a local skill for adding TrailForge features.
- `docs/demo-scenarios.md` contains presenter-ready prompts for AI workflow demos.
- `docs/mcp-actions.md` lists MCP-oriented demo prompts that operate around the app.

## Suggested Prompts

```text
Explain how TrailForge loads trips, renders cards, and creates trail notes.
```

```text
Add a route search box that filters by trip name, location, and highlight. Follow AGENTS.md.
```

```text
Use the trail-feature skill to add a packing category filter.
```
