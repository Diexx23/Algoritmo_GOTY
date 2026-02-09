// Lista base de videojuegos (equivalente a "courses" en CourseMash)
const games = [
  { name: "Elden Ring: Shadow of the Erdtree", wins: 0, battles: 0 },
  { name: "Final Fantasy VII Rebirth", wins: 0, battles: 0 },
  { name: "Helldivers 2", wins: 0, battles: 0 },
  { name: "Baldur’s Gate 3", wins: 0, battles: 0 },
  { name: "Hades II", wins: 0, battles: 0 }
];

// Selección aleatoria A/B
let gameA, gameB;

const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const rankingList = document.getElementById("ranking");

function pickTwoGames() {
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  [gameA, gameB] = shuffled.slice(0, 2);

  optionA.textContent = gameA.name;
  optionB.textContent = gameB.name;
}

// Registro de la decisión (corazón del algoritmo)
function registerVote(winner, loser) {
  winner.wins++;
  winner.battles++;

  loser.battles++;

  updateRanking();
  pickTwoGames();
}

// Ranking por ratio de victorias (no absoluto)
function updateRanking() {
  const sorted = [...games].sort((a, b) => {
    const scoreA = a.battles ? a.wins / a.battles : 0;
    const scoreB = b.battles ? b.wins / b.battles : 0;
    return scoreB - scoreA;
  });

  rankingList.innerHTML = "";

  sorted.forEach((game, index) => {
    const item = document.createElement("li");
    item.className = "list-group-item";

    const score = game.battles
      ? (game.wins / game.battles).toFixed(2)
      : "0.00";

    item.innerHTML = `
      <span>${index + 1}. ${game.name}</span>
      <span>${score}</span>
    `;

    rankingList.appendChild(item);
  });
}

// Eventos
optionA.addEventListener("click", () => registerVote(gameA, gameB));
optionB.addEventListener("click", () => registerVote(gameB, gameA));

// Inicio
pickTwoGames();
updateRanking();
