export const Player = function (x, y, defaultX, defaultY) {
  this.x = x;
  this.y = y;
  this.defaultX = defaultX;
  this.defaultY = defaultY;
  this.walkSpeed = 0.07;
};

Player.prototype = {
  moveRight: function () {
    console.log(`before: ${this.x}`);
    this.x += this.walkSpeed;
    console.log(`after: ${this.x}`);
  },
  moveLeft: function () {
    this.x -= this.walkSpeed;
  },
  moveUp: function () {
    this.y -= this.walkSpeed;
  },
  moveDown: function () {
    this.y += this.walkSpeed;
  },
  jump: function () {
    this.y -= 0.5;
    setTimeout(() => (this.y += 0.5), 1000);
  },
};
