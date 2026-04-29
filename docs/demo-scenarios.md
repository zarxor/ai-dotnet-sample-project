# TrailForge AI Demo Scenarios

Use these scenarios to demonstrate AI-assisted development against TrailForge Planner. The app should remain a normal hiking planner; the AI workflow happens in the editor, terminal, MCP tools, GitHub, and documentation.

## Before The Demo

Run the app:

```bash
dotnet run
```

Open `http://localhost:5025`, then keep these files visible in the editor:

- `Program.cs`
- `wwwroot/app.js`
- `wwwroot/index.html`
- `wwwroot/styles.css`
- `AGENTS.md`
- `.codex/skills/trail-feature/SKILL.md`

## 1. Prompting And Code Explanation

Goal: show that a good prompt can produce a useful explanation grounded in the current code.

Prompt:

```text
Explain how TrailForge Planner loads data and updates the UI. Focus on the flow from Program.cs endpoints to wwwroot/app.js rendering functions. Mention any design tradeoffs you see.
```

Expected demo result:

- The assistant identifies `/api/trips`, `/api/packing-list`, `/api/trail-notes`, and `/api/summary`.
- The assistant explains `loadPlanner`, rendering functions, and note creation.
- The assistant points out that data is currently in memory.

Follow-up prompt:

```text
Explain this code again for a product manager. Avoid implementation jargon and focus on user-visible behavior.
```

## 2. Generate Code

Goal: generate a visible feature from a product request.

Prompt:

```text
Add a route search box above the trip board. It should filter trips by name, location, difficulty, and highlights. Keep the existing difficulty filter working together with search.
```

Expected demo result:

- `wwwroot/index.html` gets a search input.
- `wwwroot/app.js` combines text search and difficulty filtering.
- `wwwroot/styles.css` styles the control without changing the app architecture.

Good talking point:

- Show how a specific product request produces better code than “make this better”.

## 3. Refactor And Improve Existing Code

Goal: show structural improvement without changing behavior.

Prompt:

```text
Refactor wwwroot/app.js so filtering logic is easier to test and reason about. Keep behavior the same. Extract small pure functions where useful and explain what changed.
```

Expected demo result:

- Filtering and DOM rendering become more separated.
- The assistant preserves the UI behavior.
- The explanation names the unchanged behavior.

Follow-up prompt:

```text
Review your own refactor for unnecessary abstraction. Simplify anything that does not make the app easier to maintain.
```

## 4. Generate Tests

Goal: show test creation for existing behavior.

Prompt:

```text
Add tests for the TrailForge API endpoints. Cover trip summary totals, note creation, and the trip list shape. Use the simplest test setup that fits this .NET project.
```

Expected demo result:

- A test project is added.
- Tests verify `/api/summary`, `/api/trips`, and `POST /api/trail-notes`.
- The assistant updates the solution or docs with test commands if needed.

Follow-up prompt:

```text
Run the tests and fix any failures. If the test setup requires a design change, explain the smallest safe change first.
```

## 5. Fix A Bug

Goal: show diagnosis, change, and verification.

Setup option:

Introduce this bug before the demo by changing `renderTrips` in `wwwroot/app.js` so it ignores the difficulty filter.

Prompt:

```text
The difficulty filter no longer changes the visible trip cards. Reproduce the bug from the code, find the cause, fix it, and explain the verification you used.
```

Expected demo result:

- The assistant traces the event listener and filtering path.
- The fix is scoped to `wwwroot/app.js`.
- Verification includes `node --check wwwroot/app.js` and browser or API reasoning.

Alternative bug prompt:

```text
Adding a trail note appears to work, but the note list does not refresh. Find and fix the issue.
```

## 6. Document Code

Goal: demonstrate targeted code documentation without noisy comments.

Prompt:

```text
Add concise comments only where they help a new developer understand non-obvious TrailForge behavior. Do not comment obvious assignments or DOM calls.
```

Expected demo result:

- Comments are limited and useful.
- The assistant avoids turning every line into documentation.

Follow-up prompt:

```text
Explain why each comment you added is worth keeping.
```

## 7. Document The Solution

Goal: create project-level documentation for users and maintainers.

Prompt:

```text
Update README.md with a concise architecture section for TrailForge Planner. Include the API endpoints, frontend files, run command, test command if one exists, and two good demo prompts.
```

Expected demo result:

- README becomes more useful without becoming long.
- The assistant distinguishes app documentation from AI-demo instructions.

Optional prompt:

```text
Create docs/architecture.md with a short system overview, data flow, and extension points.
```

## 8. AGENTS.md

Goal: show how repository instructions steer the assistant.

Prompt:

```text
Read AGENTS.md first, then add a packing category filter. Follow the repository guidance and summarize which AGENTS.md rules affected your implementation.
```

Expected demo result:

- The assistant references domain copy, visible UI behavior, accessible controls, and small changes.
- The implementation stays in `Program.cs`, `wwwroot/app.js`, and `wwwroot/styles.css`.

Good talking point:

- AGENTS.md is persistent repo guidance, not something you paste into every prompt.

## 9. Skills

Goal: show a reusable workflow instruction for a repeated task.

Prompt:

```text
Use the trail-feature skill to add a small feature that helps hikers compare weather risk across trips.
```

Expected demo result:

- The assistant reads `.codex/skills/trail-feature/SKILL.md`.
- The change follows the skill process.
- The feature is small, visual, and domain-specific.

Follow-up prompt:

```text
Using the same skill, propose three more small TrailForge features and rank them by demo value.
```

## 10. MCP Servers

Goal: show tool-assisted actions around the project.

Prompt with GitHub MCP:

```text
Use GitHub tools to create an issue titled "Add route search to TrailForge Planner". Include acceptance criteria and files likely to change.
```

Prompt with documentation MCP:

```text
Use official documentation tools to check current ASP.NET Core minimal API testing guidance, then recommend the simplest test setup for this project.
```

Prompt with repo or filesystem MCP:

```text
Use available repository tools to inspect AGENTS.md, the trail-feature skill, and the current project files. Then propose the smallest safe implementation plan for editable packing items.
```

Expected demo result:

- The assistant calls external tools instead of guessing.
- The output includes source-backed or repository-backed context.
- The app remains a normal product.

## 11. Cloud Agents

Goal: show delegation of larger work to an agent running away from the local editor.

Scenario:

Ask a cloud agent to implement a complete but bounded feature in a branch or PR.

Prompt:

```text
Implement editable packing items for TrailForge Planner. Users should be able to add an item, mark it packed, and see the packing summary update. Follow AGENTS.md, keep the app dependency-light, and include tests if the project has a test setup.
```

Expected cloud-agent result:

- A branch or PR with a focused implementation.
- Clear changed files.
- Build and test results.
- A concise summary of behavior and risks.

Good review prompt after the cloud agent finishes:

```text
Review this branch for bugs, missing tests, and unnecessary complexity. Focus on user-visible regressions in the packing workflow.
```

## Suggested Demo Order

1. Explain code.
2. Generate route search.
3. Refactor filtering.
4. Generate tests.
5. Fix a prepared bug.
6. Update README or architecture docs.
7. Repeat a feature using AGENTS.md.
8. Repeat a feature using the trail-feature skill.
9. Use MCP tools for GitHub or docs.
10. Send editable packing items to a cloud agent.
