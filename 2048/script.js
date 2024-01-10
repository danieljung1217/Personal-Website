document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("grid-container");
  const scoreValue = document.getElementById("score-value");
  const messageOverlay = document.getElementById("message-overlay");
  const message = document.getElementById("message");
  const retryButton = document.getElementById("retry-button");

  let grid = Array.from({length: 4}, () => Array(4).fill(0));
  let score = 0;

  function initializeGame() {
    grid = Array.from({length: 4}, () => Array(4).fill(0));
    score = 0;
    updateGrid();
    generateRandomTile();
    generateRandomTile();
    updateScore();
    messageOverlay.style.display = "none";
  }

  function updateGrid() {
    gridContainer.innerHTML = "";
    grid.forEach((row) => {
      row.forEach((cell) => {
        const tile = document.createElement("div");
        tile.className = `tile tile-${cell}`;
        tile.textContent = cell !== 0 ? cell : "";
        gridContainer.appendChild(tile);
      });
    });
  }

  function generateRandomTile() {
    const availableCells = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          availableCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (availableCells.length > 0) {
      const randomCell =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
      updateGrid();
    }
  }

  function move(direction) {
    let moved = false;

    switch (direction) {
      case "UP":
        moved = moveUp();
        break;
      case "DOWN":
        moved = moveDown();
        break;
      case "LEFT":
        moved = moveLeft();
        break;
      case "RIGHT":
        moved = moveRight();
        break;
    }

    if (moved) {
      generateRandomTile();
      checkGameOver();
    }
  }

  function moveUp() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
      for (let row = 1; row < 4; row++) {
        if (grid[row][col] !== 0) {
          let currentRow = row;

          while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
            grid[currentRow - 1][col] = grid[currentRow][col];
            grid[currentRow][col] = 0;
            currentRow--;
            moved = true;
          }

          if (
            currentRow > 0 &&
            grid[currentRow - 1][col] === grid[currentRow][col]
          ) {
            grid[currentRow - 1][col] *= 2;
            score += grid[currentRow - 1][col];
            grid[currentRow][col] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  }

  function moveDown() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
      for (let row = 2; row >= 0; row--) {
        if (grid[row][col] !== 0) {
          let currentRow = row;

          while (currentRow < 3 && grid[currentRow + 1][col] === 0) {
            grid[currentRow + 1][col] = grid[currentRow][col];
            grid[currentRow][col] = 0;
            currentRow++;
            moved = true;
          }

          if (
            currentRow < 3 &&
            grid[currentRow + 1][col] === grid[currentRow][col]
          ) {
            grid[currentRow + 1][col] *= 2;
            score += grid[currentRow + 1][col];
            grid[currentRow][col] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  }

  function moveLeft() {
    let moved = false;

    for (let row = 0; row < 4; row++) {
      for (let col = 1; col < 4; col++) {
        if (grid[row][col] !== 0) {
          let currentCol = col;

          while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
            grid[row][currentCol - 1] = grid[row][currentCol];
            grid[row][currentCol] = 0;
            currentCol--;
            moved = true;
          }

          if (
            currentCol > 0 &&
            grid[row][currentCol - 1] === grid[row][currentCol]
          ) {
            grid[row][currentCol - 1] *= 2;
            score += grid[row][currentCol - 1];
            grid[row][currentCol] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  }

  function moveRight() {
    let moved = false;

    for (let row = 0; row < 4; row++) {
      for (let col = 2; col >= 0; col--) {
        if (grid[row][col] !== 0) {
          let currentCol = col;

          while (currentCol < 3 && grid[row][currentCol + 1] === 0) {
            grid[row][currentCol + 1] = grid[row][currentCol];
            grid[row][currentCol] = 0;
            currentCol++;
            moved = true;
          }

          if (
            currentCol < 3 &&
            grid[row][currentCol + 1] === grid[row][currentCol]
          ) {
            grid[row][currentCol + 1] *= 2;
            score += grid[row][currentCol + 1];
            grid[row][currentCol] = 0;
            moved = true;
          }
        }
      }
    }

    return moved;
  }

  function updateScore() {
    scoreValue.textContent = score;
  }

  function checkGameOver() {
    if (!grid.flat().includes(0)) {
      let gameOver = true;

      // Check horizontally and vertically
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === grid[i + 1][j] || grid[i][j] === grid[i][j + 1]) {
            gameOver = false;
            break;
          }
        }
      }

      // Check the last row and column
      for (let i = 0; i < 3; i++) {
        if (grid[3][i] === grid[3][i + 1] || grid[i][3] === grid[i + 1][3]) {
          gameOver = false;
          break;
        }
      }

      if (gameOver) {
        message.textContent = `Game Over! Your score is ${score}`;
        messageOverlay.style.display = "flex";
      }
    }
  }

  initializeGame();

  document.addEventListener("keydown", function (event) {
    if (
      !messageOverlay.style.display ||
      messageOverlay.style.display === "none"
    ) {
      switch (event.key) {
        case "ArrowUp":
          move("UP");
          break;
        case "ArrowDown":
          move("DOWN");
          break;
        case "ArrowLeft":
          move("LEFT");
          break;
        case "ArrowRight":
          move("RIGHT");
          break;
      }
      updateScore();
    }
  });

  retryButton.addEventListener("click", function () {
    messageOverlay.style.display = "none";
    initializeGame();
  });
});
