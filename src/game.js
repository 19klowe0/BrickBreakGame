import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import { buildLevel, level1, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};
export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameStates = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    new InputHandler(this.paddle, this);

    //level information
    this.levels = [level1, level2];
    this.currentLevel = 0;
  }

  start() {
    if (
      this.gameStates !== GAMESTATE.MENU &&
      this.gameStates !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gameStates = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gameStates = GAMESTATE.GAMEOVER;
    }
    if (
      this.gameStates === GAMESTATE.PAUSED ||
      this.gameStates === GAMESTATE.MENU ||
      this.gameStates === GAMESTATE.GAMEOVER
    )
      return;

    //new levels
    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gameStates = GAMESTATE.NEWLEVEL;
      this.start();
    }
    [...this.gameObjects, ...this.bricks].forEach((Object) =>
      Object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((Object) => Object.draw(ctx));

    //writing lives on screen
    ctx.font = "30px Arial";
    ctx.fillStyle = "purple";
    ctx.textAlign = "center";
    ctx.fillText(
      "Lives: " + this.lives,
      this.gameWidth / 2,
      this.gameHeight - 16
    );

    //level
    ctx.font = "30px Arial";
    ctx.fillStyle = "purple";
    ctx.textAlign = "center";
    ctx.fillText(
      "Level: " + (this.currentLevel + 1),
      this.gameWidth - 100,
      this.gameHeight - 16
    );

    //shade the screen when paused
    if (this.gameStates === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0, 0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "purple";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameStates === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "purple";
      ctx.textAlign = "center";
      ctx.fillText(
        "Push Space to Begin!",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameStates === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("GAMEOVER LOSER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    //gameStates
    if (this.gameStates === GAMESTATE.PAUSED) {
      this.gameStates = GAMESTATE.RUNNING;
    } else {
      this.gameStates = GAMESTATE.PAUSED;
    }
  }
}
