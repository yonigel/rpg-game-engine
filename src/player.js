export const Player = function (
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

Player.prototype = {
  moveRight: function () {
    this.positionX += 1;
  },
  moveLeft: function () {
    this.positionX -= 1;
  },
};
