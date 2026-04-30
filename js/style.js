"use strict";

let allGames = [];

// Hent JSON-data
async function fetchGames() {
  try {
    const res = await fetch("json/games.json");
    const data = await res.json();
    allGames = data;
    filterAndSortGames();
  } catch (err) {
    console.error("Kunne ikke hente JSON:", err);
  }
}

// Vis spil
function displayGames(games) {
  const container = document.getElementById("game-list");
  container.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${game.image}">
      <h3>${game.name}</h3>
      <p>${game.players} spillere</p>
      <p>${game.time} min</p>
    `;

    card.addEventListener("click", () => openModal(game));
    container.appendChild(card);
  });
}

// Modal
function openModal(game) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <h2>${game.name}</h2>
    <img src="${game.image}">
    <p>${game.description}</p>
    <p><strong>Spillere:</strong> ${game.players}</p>
    <p><strong>Tid:</strong> ${game.time} min</p>
    <p><strong>Genre:</strong> ${game.category}</p>
    <p><strong>Sværhed:</strong> ${game.difficulty}</p>
  `;

  modal.classList.remove("hidden");
}

// Luk modal
document.getElementById("close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

// Filtrering + sortering
function filterAndSortGames() {
  let filtered = [...allGames];

  const searchValue = document.getElementById("search").value.toLowerCase();
  const selectedGenre = document.getElementById("genre").value;
  const selectedSort = document.getElementById("sort").value;

  // Søgning
  if (searchValue) {
    filtered = filtered.filter(game =>
      game.name.toLowerCase().includes(searchValue)
    );
  }

  // Genre
  if (selectedGenre !== "all") {
    filtered = filtered.filter(game =>
      game.category.toLowerCase() === selectedGenre.toLowerCase()
    );
  }

  // Sortering
  if (selectedSort === "title") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (selectedSort === "time") {
    filtered.sort((a, b) => parseInt(a.time) - parseInt(b.time));
  }

  displayGames(filtered);
}

// Event listeners
document.getElementById("search").addEventListener("input", filterAndSortGames);
document.getElementById("genre").addEventListener("change", filterAndSortGames);
document.getElementById("sort").addEventListener("change", filterAndSortGames);

// Start
fetchGames();




