"use strict";
let allGames = [];

async function fetchGames() {
  const res = await fetch("json/games.json");
  const data = await res.json();
  allGames = data;
  displayGames(allGames);
}

function displayGames(games) {
  const container = document.getElementById("games");
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

//Filtrering
document.getElementById("filter").addEventListener("change", (e) => {
  const value = e.target.value;

  if (value === "all") {
    displayGames(allGames);
  } else {
    const filtered = allGames.filter(game => game.category === value);
    displayGames(filtered);
  }
});

//Modal
function openModal(game) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <h2>${game.name}</h2>
    <img src="${game.image}">
    <p>${game.description}</p>
    <p><strong>Spillere:</strong> ${game.players}</p>
    <p><strong>Tid:</strong> ${game.time} min</p>
    <p><strong>Sværhed:</strong> ${game.difficulty}</p>
  `;

  modal.classList.remove("hidden");
}

//Luk modal
document.getElementById("close").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

fetchGames();