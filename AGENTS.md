# Repository Guidance

This repository is TrailForge Planner, a .NET 10 ASP.NET Core sample app for planning Nordic hiking trips.

## Working Rules

- Keep product changes easy to explain in under two minutes.
- Prefer visible planning behavior over hidden infrastructure when adding features.
- Keep the app dependency-light unless a library clearly improves the demo.
- Preserve the simple API shape in `Program.cs` unless the change needs a larger split.
- Keep frontend code in `wwwroot/` and avoid adding a build pipeline for small changes.
- Use accessible HTML controls and responsive CSS for all visible features.
- Keep domain copy focused on hiking routes, packing, weather margins, and trail notes.

## Verification

Run these commands after code changes when the .NET 10 SDK is available:

```bash
dotnet build
dotnet run
```

If the SDK is unavailable, inspect the edited files and call that out in the final response.

## Change Pattern

1. Explain the intended user-visible change.
2. Update the backend sample data or endpoint if needed.
3. Update `wwwroot/app.js` for behavior.
4. Update `wwwroot/styles.css` for layout and visual states.
5. Mention a concise prompt that would demonstrate the change in an AI workflow demo.
