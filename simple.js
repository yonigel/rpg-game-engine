export const tileSize = 16;
export const scaleUp = 2;
export const rows = 20;
export const cols = 20;
export const map = [
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
]

const context = document.getElementById("myCanvas").getContext("2d");
const canvasWidth = tileSize * 15 * scaleUp;
const canvasHeight = tileSize * 15 * scaleUp;
context.canvas.width = canvasWidth;
context.canvas.height = canvasHeight;

const Player = function (
  positionX,
  positionY,
  defaultPositionX,
  defaultPositionY
) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.defaultPositionX = defaultPositionX;
  this.defaultPositionY = defaultPositionY;
};

const player = new Player(5, 5, 5, 5);

const Viewport = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};

const viewport = new Viewport(10, 0, 10, 10);

function loop() {
  window.requestAnimationFrame(loop);
  for (let x = viewport.x; x < viewport.width + viewport.x; x++) {
    for (let y = viewport.y; y < viewport.height + viewport.y; y++) {
      const viewportXOffset = viewport.x * tileSize * scaleUp;
      const viewportYOffset = viewport.y * tileSize * scaleUp;

      // draw board
      context.drawImage(
        tilesImage,
        map[x + rows * y] * tileSize,
        0,
        tileSize,
        tileSize,
        x * tileSize * scaleUp - viewportXOffset,
        y * tileSize * scaleUp - viewportYOffset,
        tileSize * scaleUp,
        tileSize * scaleUp
      );

      // draw player
      context.drawImage(
        tilesImage,
        4 * tileSize,
        0,
        tileSize,
        tileSize,
        player.positionX * tileSize * scaleUp,
        player.positionY * tileSize * scaleUp,
        tileSize * scaleUp,
        tileSize * scaleUp
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
    if (viewport.x + viewport.width > cols - 1) {
      if (player.positionX + viewport.x >= cols - 1) {
        return;
      }
      player.positionX += 1;
    } else {
      if (player.positionX < player.defaultPositionX) {
        player.positionX += 1;
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
      player.positionX -= 1;
    } else {
      if (player.positionX > player.defaultPositionX) {
        player.positionX -= 1;
      } else {
        viewport.x -= 1;
      }
    }

    // viewport.x -= 1;
  }
});
