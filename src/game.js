export function Game(canvasId, width, height, gameMap, viewport, player) {
  this.gameMap = gameMap;
  this.viewport = viewport;
  this.player = player;
  const { tileSize, scaleUp } = this.gameMap;
  this.canvasId = canvasId;
  this.width = width;
  this.height = height;
  this.tileSize = tileSize;
  this.scaleUp = scaleUp;
  this.isGameReady = false;
  this.isTilesImageReady = false;

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      this.viewport.y -= 1;
    }

    if (event.key === "ArrowDown") {
      this.viewport.y += 1;
    }

    if (event.key === "ArrowRight") {
      if (this.viewport.x + this.viewport.width > this.gameMap.cols - 1) {
        if (this.player.positionX + this.viewport.x >= this.gameMap.cols - 1) {
          return;
        }
        this.player.moveRight();
      } else {
        if (this.player.positionX < this.player.defaultPositionX) {
          this.player.moveRight();
        } else {
          this.viewport.x += 1;
        }
      }
    }

    if (event.key === "ArrowLeft") {
      if (this.viewport.x === 0) {
        if (this.player.positionX === 0) {
          return;
        }
        this.player.moveLeft();
      } else {
        if (this.player.positionX > this.player.defaultPositionX) {
          this.player.moveLeft();
        } else {
          this.viewport.x -= 1;
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
    const { tileSize, scaleUp } = this.gameMap;
    const { positionX, positionY } = this.player;
    this.context.drawImage(
      this.tilesImage,
      4 * tileSize,
      0,
      tileSize,
      tileSize,
      positionX * tileSize * scaleUp,
      positionY * tileSize * scaleUp,
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