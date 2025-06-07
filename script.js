const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let oTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setMessage("");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? "o" : "x";
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    oTurn = !oTurn;
  }
}

function placeMark(cell, mark) {
  cell.classList.add(mark);
}

function setMessage(msg) {
  message.textContent = msg;
}

function endGame(draw) {
  if (draw) {
    setMessage("It's a draw!");
  } else {
    setMessage(`${oTurn ? "O" : "X"} wins!`);
  }
  cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function checkWin(currentClass) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winCombos.some(combination => {
    return combination.every(index =>
      cells[index].classList.contains(currentClass)
    );
  });
}