const tripCardsElement = document.querySelector("#trip-cards");
const packingListElement = document.querySelector("#packing-list");
const trailNotesElement = document.querySelector("#trail-notes");
const difficultyFilterElement = document.querySelector("#difficulty-filter");
const noteFormElement = document.querySelector("#note-form");

let trips = [];

difficultyFilterElement.addEventListener("change", renderTrips);
noteFormElement.addEventListener("submit", addTrailNote);

await loadPlanner();

async function loadPlanner() {
  const [tripData, packingItems, notes, summary] = await Promise.all([
    getJson("/api/trips"),
    getJson("/api/packing-list"),
    getJson("/api/trail-notes"),
    getJson("/api/summary")
  ]);

  trips = tripData;
  renderTrips();
  renderPackingList(packingItems);
  renderTrailNotes(notes);
  renderSummary(summary);
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${url}`);
  }

  return response.json();
}

function renderSummary(summary) {
  document.querySelector("#trip-count").textContent = summary.tripCount.toString();
  document.querySelector("#distance-total").textContent = `${summary.totalDistanceKm} km`;
  document.querySelector("#day-total").textContent = summary.totalDays.toString();
  document.querySelector("#packing-total").textContent = `${summary.packedItems} / ${summary.totalPackingItems}`;
}

function renderTrips() {
  const selectedDifficulty = difficultyFilterElement.value;
  const visibleTrips = selectedDifficulty === "all"
    ? trips
    : trips.filter(trip => trip.difficulty === selectedDifficulty);

  tripCardsElement.replaceChildren(...visibleTrips.map(createTripCard));
}

function createTripCard(trip) {
  const article = document.createElement("article");
  article.className = "trip-card";
  article.style.setProperty("--trip-accent", trip.accentColor);

  const header = document.createElement("div");
  header.className = "trip-card-header";

  const titleGroup = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = trip.name;
  const location = document.createElement("p");
  location.textContent = trip.location;
  titleGroup.append(title, location);

  const difficulty = document.createElement("span");
  difficulty.className = `difficulty difficulty-${trip.difficulty.toLowerCase()}`;
  difficulty.textContent = trip.difficulty;

  header.append(titleGroup, difficulty);

  const description = document.createElement("p");
  description.className = "trip-description";
  description.textContent = trip.description;

  const metrics = document.createElement("dl");
  metrics.className = "metrics";
  metrics.append(
    createMetric("Dates", trip.dates),
    createMetric("Distance", `${trip.distanceKm} km`),
    createMetric("Days", trip.days.toString()),
    createMetric("Weather risk", `${trip.weatherRisk}/5`)
  );

  const highlights = document.createElement("div");
  highlights.className = "highlights";
  highlights.append(...trip.highlights.map(highlight => {
    const tag = document.createElement("span");
    tag.textContent = highlight;
    return tag;
  }));

  article.append(header, description, metrics, highlights);
  return article;
}

function createMetric(label, value) {
  const group = document.createElement("div");
  const term = document.createElement("dt");
  term.textContent = label;
  const detail = document.createElement("dd");
  detail.textContent = value;
  group.append(term, detail);
  return group;
}

function renderPackingList(items) {
  packingListElement.replaceChildren(...items.map(item => {
    const row = document.createElement("div");
    row.className = item.packed ? "packing-item packed" : "packing-item";

    const status = document.createElement("span");
    status.setAttribute("aria-hidden", "true");

    const content = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = item.name;
    const category = document.createElement("small");
    category.textContent = item.category;
    content.append(name, category);

    row.append(status, content);
    return row;
  }));
}

function renderTrailNotes(notes) {
  trailNotesElement.replaceChildren(...notes.map(note => {
    const item = document.createElement("article");
    item.className = "note";

    const category = document.createElement("strong");
    category.textContent = note.category;

    const text = document.createElement("p");
    text.textContent = note.text;

    item.append(category, text);
    return item;
  }));
}

async function addTrailNote(event) {
  event.preventDefault();

  const formData = new FormData(noteFormElement);
  const response = await fetch("/api/trail-notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category: formData.get("category"),
      text: formData.get("text")
    })
  });

  if (!response.ok) {
    return;
  }

  renderTrailNotes(await getJson("/api/trail-notes"));
  noteFormElement.reset();
}
