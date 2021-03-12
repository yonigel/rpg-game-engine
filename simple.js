import { Player } from "./src/player.js";
import { Viewport } from "./src/viewport.js";
import { GameMap } from "./src/map.js";

const gameMap = new GameMap();
const context = document.getElementById("myCanvas").getContext("2d");
const canvasWidth = gameMap.tileSize * 15 * gameMap.scaleUp;
const canvasHeight = gameMap.tileSize * 15 * gameMap.scaleUp;
context.canvas.width = canvasWidth;
context.canvas.height = canvasHeight;

const player = new Player(5, 5, 5, 5);
const viewport = new Viewport(10, 0, 10, 10);

function loop() {
  window.requestAnimationFrame(loop);
  for (let x = viewport.x; x < viewport.width + viewport.x; x++) {
    for (let y = viewport.y; y < viewport.height + viewport.y; y++) {
      const viewportXOffset = viewport.x * gameMap.tileSize * gameMap.scaleUp;
      const viewportYOffset = viewport.y * gameMap.tileSize * gameMap.scaleUp;

      // draw board
      context.drawImage(
        tilesImage,
        gameMap.mapDetails[x + gameMap.rows * y] * gameMap.tileSize,
        0,
        gameMap.tileSize,
        gameMap.tileSize,
        x * gameMap.tileSize * gameMap.scaleUp - viewportXOffset,
        y * gameMap.tileSize * gameMap.scaleUp - viewportYOffset,
        gameMap.tileSize * gameMap.scaleUp,
        gameMap.tileSize * gameMap.scaleUp
      );

      // draw player
      context.drawImage(
        tilesImage,
        4 * gameMap.tileSize,
        0,
        gameMap.tileSize,
        gameMap.tileSize,
        player.positionX * gameMap.tileSize * gameMap.scaleUp,
        player.positionY * gameMap.tileSize * gameMap.scaleUp,
        gameMap.tileSize * gameMap.scaleUp,
        gameMap.tileSize * gameMap.scaleUp
      );
    }
  }
}

const tilesImage = new Image();
tilesImage.src = "./public/assets/tile-scroll.png";
tilesImage.addEventListener("load", () => loop());

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    viewport.y -= 1;
  }

  if (event.key === "ArrowDown") {
    viewport.y += 1;
  }

  if (event.key === "ArrowRight") {
    if (viewport.x + viewport.width > gameMap.cols - 1) {
      if (player.positionX + viewport.x >= gameMap.cols - 1) {
        return;
      }
      player.moveRight();
    } else {
      if (player.positionX < player.defaultPositionX) {
        player.moveRight();
      } else {
        viewport.x += 1;
      }
    }
  }

  if (event.key === "ArrowLeft") {
    if (viewport.x === 0) {
      if (player.positionX === 0) {
        return;
      }
      player.moveLeft();
    } else {
      if (player.positionX > player.defaultPositionX) {
        player.moveLeft();
      } else {
        viewport.x -= 1;
      }
    }
  }
});
