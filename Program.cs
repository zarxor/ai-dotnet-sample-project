using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

var trips = new[]
{
    new Trip(
        1,
        "Kungsleden North",
        "Abisko to Nikkaluokta",
        "Late summer hut-to-hut route with big valleys, open fell, and a summit day near Kebnekaise.",
        "August 18-24",
        "Moderate",
        108,
        7,
        4,
        ["Huts", "Train access", "Alpine views"],
        "#0f766e"),
    new Trip(
        2,
        "High Coast Circuit",
        "Skuleskogen and coastline",
        "Compact long weekend with forest ridges, red granite slabs, and sea-level camp spots.",
        "June 6-9",
        "Easy",
        46,
        4,
        3,
        ["Coast", "Camping", "Family friendly"],
        "#2563eb"),
    new Trip(
        3,
        "Jamtland Triangle",
        "Storulvan loop",
        "Classic mountain stations, broad trails, and a flexible route that works well for mixed groups.",
        "September 5-8",
        "Moderate",
        47,
        4,
        2,
        ["Mountain stations", "Loop", "Sauna"],
        "#b45309"),
    new Trip(
        4,
        "Sarek Approach",
        "Kvikkjokk base route",
        "Remote national park approach with heavier planning needs, river decisions, and wide weather margins.",
        "July 12-19",
        "Hard",
        86,
        8,
        5,
        ["Remote", "Navigation", "Weather window"],
        "#be123c")
};

var checklist = new[]
{
    new PackingItem("Shell jacket", "Wear", true),
    new PackingItem("Waterproof map case", "Navigation", false),
    new PackingItem("First aid kit", "Safety", true),
    new PackingItem("Stove fuel", "Food", false),
    new PackingItem("Headlamp", "Camp", true),
    new PackingItem("Repair tape", "Safety", false)
};

var notes = new List<TrailNote>
{
    new("Route", "Book train seats before hut reservations for Kungsleden North."),
    new("Weather", "Build one flexible rest day into Sarek plans."),
    new("Food", "Pack one hot lunch option for exposed coastal days.")
};

app.MapGet("/api/trips", () => Results.Ok(trips));

app.MapGet("/api/packing-list", () => Results.Ok(checklist));

app.MapGet("/api/trail-notes", () => Results.Ok(notes));

app.MapPost("/api/trail-notes", (CreateTrailNoteRequest request) =>
{
    var category = string.IsNullOrWhiteSpace(request.Category) ? "General" : request.Category.Trim();
    var text = string.IsNullOrWhiteSpace(request.Text) ? "Untitled note" : request.Text.Trim();
    var note = new TrailNote(category, text);

    notes.Insert(0, note);
    if (notes.Count > 8)
    {
        notes.RemoveAt(notes.Count - 1);
    }

    return Results.Created("/api/trail-notes", note);
});

app.MapGet("/api/summary", () =>
{
    var summary = new PlannerSummary(
        trips.Length,
        trips.Sum(trip => trip.DistanceKm),
        trips.Sum(trip => trip.Days),
        checklist.Count(item => item.Packed),
        checklist.Length);

    return Results.Ok(summary);
});

app.MapFallbackToFile("index.html");

app.Run();

public sealed record Trip(
    int Id,
    string Name,
    string Location,
    string Description,
    string Dates,
    string Difficulty,
    int DistanceKm,
    int Days,
    int WeatherRisk,
    string[] Highlights,
    string AccentColor);

public sealed record PackingItem(
    string Name,
    string Category,
    bool Packed);

public sealed record TrailNote(
    string Category,
    string Text);

public sealed record CreateTrailNoteRequest(
    string Category,
    string Text);

public sealed record PlannerSummary(
    int TripCount,
    int TotalDistanceKm,
    int TotalDays,
    int PackedItems,
    int TotalPackingItems);

[JsonSerializable(typeof(Trip[]))]
[JsonSerializable(typeof(PackingItem[]))]
[JsonSerializable(typeof(TrailNote[]))]
[JsonSerializable(typeof(List<TrailNote>))]
[JsonSerializable(typeof(TrailNote))]
[JsonSerializable(typeof(CreateTrailNoteRequest))]
[JsonSerializable(typeof(PlannerSummary))]
internal sealed partial class AppJsonSerializerContext : JsonSerializerContext;
