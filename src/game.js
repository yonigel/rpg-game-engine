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
    const currentPlayerPositionInMapDetails =
      this.player.positionX +
      this.viewport.x +
      this.player.positionY * this.gameMap.rows;
    const currentTileType = this.gameMap.mapDetails[
      currentPlayerPositionInMapDetails
    ];

    const rightTileType = this.gameMap.mapDetails[
      currentPlayerPositionInMapDetails + 1
    ];

    const leftTileType = this.gameMap.mapDetails[
      currentPlayerPositionInMapDetails - 1
    ];

    const upperTileType = this.gameMap.mapDetails[
      currentPlayerPositionInMapDetails - this.gameMap.cols
    ];

    const downTileType = this.gameMap.mapDetails[
      currentPlayerPositionInMapDetails + this.gameMap.cols
    ];
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (this.gameMap.blockingTile.includes(upperTileType)) {
        return;
      }
      if (this.viewport.y === 0) {
        if (this.player.positionY === 0) {
          return;
        }
        this.player.moveUp();
      } else {
        this.viewport.y -= 1;
      }
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (this.gameMap.blockingTile.includes(downTileType)) {
        return;
      }
      if (this.viewport.y === this.viewport.height) {
        if (this.player.positionY + this.viewport.y === this.gameMap.rows - 1) {
          return;
        }
        this.player.moveDown();
      } else if (this.player.positionY < this.player.defaultPositionY) {
        this.player.moveDown();
      } else {
        this.viewport.y += 1;
      }
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (this.gameMap.blockingTile.includes(rightTileType)) {
        return;
      }
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
      event.preventDefault();
      if (this.gameMap.blockingTile.includes(leftTileType)) {
        return;
      }
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
