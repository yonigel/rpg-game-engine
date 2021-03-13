import { mapMatrix } from "./assets/mapMatrix.js";
import { PLAYER_DIRECTION } from "./enums/map.enums.js";

export function GameMap() {
  this.tileSize = 16;
  this.scaleUp = 2;
  this.rows = 20;
  this.cols = 20;
  this.blockingTile = [3];
  this.playerTileNumber = 4;
  this.mapDetails = mapMatrix;
  this.optionalNextTile = {
    [PLAYER_DIRECTION.RIGHT]: this.getRightOptionalTiles,
  };
}

GameMap.prototype = {
  test: function () {
    this.x += this.walkSpeed;
  },
  isNextTileBlocking: function (
    currentPlayerPosition,
    playerWalkSpeed,
    direction
  ) {
    const optionalTiles = this.optionalNextTile[direction].call(
      this,
      currentPlayerPosition,
      playerWalkSpeed
    );
    const { blockingTile } = this;
    console.log(optionalTiles);
    return optionalTiles.some((tile) => blockingTile.includes(tile));
  },
  getRightOptionalTiles: function (currentPosition, nextPosition) {
    const { mapDetails } = this;
    return [
      mapDetails[currentPosition + nextPosition],
      mapDetails[Math.floor(currentPosition + nextPosition)],
      mapDetails[Math.ceil(currentPosition + nextPosition)],
    ];
  },
};
