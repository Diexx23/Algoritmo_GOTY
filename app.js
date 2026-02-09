// Base del algoritmo: videojuegos (antes cursos)
let games = [
  { name: "Elden Ring: Shadow of the Erdtree", wins: 0, battles: 0 },
  { name: "Final Fantasy VII Rebirth", wins: 0, battles: 0 },
  { name: "Helldivers 2", wins: 0, battles: 0 },
  { name: "Baldur’s Gate 3", wins: 0, battles: 0 },
  { name: "Hades II", wins: 0, battles: 0 }
];

let gameA, gameB;

const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const rankingList = document.getElementById("ranking");
const resetBtn = document.getElementById("resetBtn");

// Selección aleatoria A/B
function pickTwoGames() {
  const shuffled = [...games].sort(() => Math.random() - 0.5);
  [gameA, gameB] = shuffled.slice(0, 2);

  optionA.textContent = gameA.name;
  optionB.textContent = gameB.name;
}

// Registro de decisión humana
function registerVote(winner, loser) {
  winner.wins++;
  winner.battles++;
  loser.battles++;

  updateRanking();
  pickTwoGames();
}

// Ranking relativo (victorias / comparaciones)
function updateRanking() {
  const sorted = [...games].sort((a, b) => {
    const scoreA = a.battles ? a.wins / a.battles : 0;
    const scoreB = b.battles ? b.wins / b.battles : 0;
    return scoreB - scoreA;
  });

  rankingList.innerHTML = "";

  sorted.forEach((game, index) => {
    const li = document.createElement("li");

    const score = game.battles
      ? (game.wins / game.battles).toFixed(2)
      : "0.00";

    li.innerHTML = `
      <span>${index + 1}. ${game.name}</span>
      <span>${score}</span>
    `;

    rankingList.appendChild(li);
  });
}

// Reinicio consciente del algoritmo
function resetAlgorithm() {
  games.forEach(game => {
    game.wins = 0;
    game.battles = 0;
  });

  updateRanking();
  pickTwoGames();
}

// Eventos
optionA.addEventListener("click", () => registerVote(gameA, gameB));
optionB.addEventListener("click", () => registerVote(gameB, gameA));
resetBtn.addEventListener("click", resetAlgorithm);

// Inicio
pickTwoGames();
updateRanking();
