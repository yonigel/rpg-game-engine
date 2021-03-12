import { Player } from "./src/player.js";
import { Viewport } from "./src/viewport.js";
import { GameMap } from "./src/map.js";
import { Game } from "./src/game.js";

const gameMap = new GameMap();
const viewport = new Viewport(10, 0, 10, 10);
const player = new Player(5, 5, 5, 5);

const game = new Game("myCanvas", 15, 15, gameMap, viewport, player);
game.init();
