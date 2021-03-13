import { PLAYER_DIRECTION } from "./enums/map.enums.js";

export function Game(canvasId, width, height, gameMap, viewport, player) {
  this.gameMap = gameMap;
  const { tileSize, scaleUp } = this.gameMap;
  this.viewport = viewport;
  this.player = player;
  this.canvasId = canvasId;
  this.width = width;
  this.height = height;
  this.tileSize = tileSize;
  this.scaleUp = scaleUp;

  window.addEventListener("keydown", (event) => {
    const {
      player,
      viewport,
      gameMap: { mapDetails, blockingTile },
    } = this;
    const currentPlayerPositionInMapDetails =
      player.x +
      viewport.x +
      player.y * gameMap.rows +
      viewport.y * gameMap.rows;

    const leftTileType =
      mapDetails[currentPlayerPositionInMapDetails - this.player.walkSpeed];

    const upperTileType =
      mapDetails[currentPlayerPositionInMapDetails - gameMap.cols];

    const downTileType =
      mapDetails[currentPlayerPositionInMapDetails + gameMap.cols];

    if (event.key === " ") {
      event.preventDefault();
      player.jump();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (blockingTile.includes(upperTileType)) {
        return;
      }
      if (viewport.y === 0) {
        if (player.y === 0) {
          return;
        }
        player.moveUp();
      } else {
        if (player.y > player.defaultY) {
          player.moveUp();
        } else {
          viewport.y -= 1;
        }
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (blockingTile.includes(downTileType)) {
        return;
      }
      if (viewport.y === viewport.height) {
        if (player.y + viewport.y === gameMap.rows - 1) {
          return;
        }
        player.moveDown();
      } else if (player.y < player.defaultY) {
        player.moveDown();
      } else {
        viewport.y += 1;
      }
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (
        gameMap.isNextTileBlocking(
          currentPlayerPositionInMapDetails,
          player.walkSpeed,
          PLAYER_DIRECTION.RIGHT
        )
      ) {
        return;
      }

      //   if ((player.x + player.walkSpeed) % 1 > 0) {
      //     player.moveRight();
      //     return;
      //   } else {
      //     console.log(`player.x: ${player.x}`);
      //     console.log(`player.walkSpeed: ${player.walkSpeed}`);
      //     console.log(
      //       `player.x + player.walkSpeed: ${player.x + player.walkSpeed}`
      //     );
      //     console.log(
      //       `(player.x + player.walkSpeed) % 1: ${
      //         (player.x + player.walkSpeed) % 1
      //       }`
      //     );
      //   }

      if (viewport.x + viewport.width > gameMap.cols - player.walkSpeed) {
        if (player.x + viewport.x >= gameMap.cols - player.walkSpeed) {
          return;
        }
        player.moveRight();
      } else {
        if (player.x < player.defaultX) {
          player.moveRight();
        } else {
          console.log(`player.x: ${player.x}`);
          console.log(`player.defaultX: ${player.defaultX}`);
          if (player.x + player.walkSpeed < player.defaultX + 1) {
            player.moveRight();
            return;
          } else {
            player.x = player.defaultX + player.walkSpeed;
            viewport.x += 1;
          }
        }
      }
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (blockingTile.includes(leftTileType)) {
        return;
      }
      if (viewport.x === 0) {
        if (player.x === 0) {
          return;
        }
        player.moveLeft();
      } else {
        if (player.x > player.defaultX) {
          player.moveLeft();
        } else {
          viewport.x -= 1;
        }
      }
    }
  });
}

Game.prototype = {
  init: function () {
    this.context = document.getElementById(this.canvasId).getContext("2d");
    const canvasWidth = this.tileSize * this.width * this.scaleUp;
    const canvasHeight = this.tileSize * this.height * this.scaleUp;
    this.context.canvas.width = canvasWidth;
    this.context.canvas.height = canvasHeight;
    this.tilesImage = new Image();
    this.tilesImage.src = "../public/assets/tile-scroll.png";
    this.tilesImage.addEventListener("load", () => this.drawGame());
    this.context.imageSmoothingEnabled = false;
  },
  drawTiles: function (x, y, viewportXOffset, viewportYOffset) {
    const { mapDetails, rows, tileSize, scaleUp } = this.gameMap;

    this.context.drawImage(
      this.tilesImage,
      mapDetails[x + rows * y] * tileSize,
      0,
      tileSize,
      tileSize,
      x * tileSize * scaleUp - viewportXOffset,
      y * tileSize * scaleUp - viewportYOffset,
      tileSize * scaleUp,
      tileSize * scaleUp
    );
  },
  drawPlayer: function () {
    const { tileSize, scaleUp, playerTileNumber } = this.gameMap;
    const { x, y } = this.player;
    this.context.drawImage(
      this.tilesImage,
      playerTileNumber * tileSize,
      0,
      tileSize,
      tileSize,
      x * tileSize * scaleUp,
      y * tileSize * scaleUp,
      tileSize * scaleUp,
      tileSize * scaleUp
    );
  },
  drawGame: function () {
    window.requestAnimationFrame(() => this.drawGame());
    const { viewport, gameMap } = this;
    for (let x = viewport.x; x < viewport.width + viewport.x; x++) {
      for (let y = viewport.y; y < viewport.height + viewport.y; y++) {
        const viewportXOffset = viewport.x * gameMap.tileSize * gameMap.scaleUp;
        const viewportYOffset = viewport.y * gameMap.tileSize * gameMap.scaleUp;

        this.drawTiles(x, y, viewportXOffset, viewportYOffset);
        this.drawPlayer();
      }
    }
  },
};
