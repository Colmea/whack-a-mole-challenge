import Phaser from "phaser";
import CONFIG from "../config";
import floatingTween from "../tweens/FloatingTween";
import { LeaderBoardScore } from "../types/LeaderBoard";
import popTween from "../tweens/PopTween";

type HUDData = {
  score: number;
  time: number;
};

const textOptions: Phaser.Types.GameObjects.Text.TextStyle = {
  font: "40px Arial Black",
  color: "#fff",
  fontStyle: "bold",
  shadow: {
    offsetX: 1,
    offsetY: 1,
    color: "black",
    blur: 1,
    stroke: true,
    fill: true,
  },
};

export default class BoardScene extends Phaser.Scene {
  private boardContainer: Phaser.GameObjects.Container;
  private playContainer: Phaser.GameObjects.Container;
  private leaderBoardContainer: Phaser.GameObjects.Container;

  constructor() {
    super({ key: "BoardScene", active: false });
  }

  preload() {
    this.load.image("ui/board", "assets/ui/board.png");
    this.load.image("ui/play", "assets/ui/play.png");
    this.load.image("score_hud", "assets/ui/score_hud.png");
    this.load.image("particles/star", "assets/ui/star.png");
  }

  create() {
    console.log("Init BoardScene");

    this.createBoard();
    this.createPlayButton();

    const playerScore = this.registry.get("lastScore");

    // Display Leaderboard if player played at least one game
    if (playerScore !== undefined) {
      this.createPlayButton();
      this.createLeaderBoard();
      this.createPlayerScore();
    } else {
      this.createWelcomeText();
    }

    this.tweens.timeline(popTween(this.boardContainer, 400));
  }

  createBoard() {
    this.boardContainer = this.add.container(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2 - 100
    );

    const board = this.add.image(0, 0, "ui/board");
    this.boardContainer.add(board);
    this.boardContainer.setScale(0);

    this.tweens.timeline(floatingTween(this.boardContainer, false, 3));
  }

  createWelcomeText() {
    const welcomeText = this.add.text(-250, -70, CONFIG.WELCOME_TEXT, {
      ...textOptions,
      font: "25px Arial Black",
    });

    this.boardContainer.add(welcomeText);
  }

  createLeaderBoard() {
    this.leaderBoardContainer = this.add.container(-230, -100);
    this.boardContainer.add(this.leaderBoardContainer);

    const leaderBoard = this.registry.get("leaderBoard");
    const leaderBoardText = this.add.text(0, 0, "LEADERBOARD", {
      ...textOptions,
      font: "30px Arial Black",
    });
    this.leaderBoardContainer.add(leaderBoardText);

    const scoreTextOptions = { ...textOptions, font: "16px Arial Black" };
    leaderBoard.forEach((score: LeaderBoardScore, index: number) => {
      const yPosition = 50 + index * 25;

      const playerText = this.add.text(
        0,
        yPosition,
        score.name,
        scoreTextOptions
      );
      const scoreText = this.add.text(
        200,
        yPosition,
        score.score.toString(),
        scoreTextOptions
      );

      this.leaderBoardContainer.add(playerText);
      this.leaderBoardContainer.add(scoreText);
    });
  }

  createPlayerScore() {
    const playerScore = this.registry.get("lastScore");
    const scoreContainer = this.add.container(170, 40);
    this.boardContainer.add(scoreContainer);

    const scoreHud = this.add.image(0, 0, "score_hud");
    const scoreText = this.add
      .text(0, 30, playerScore, textOptions)
      .setOrigin(0.5)
      .setDepth(1000);

    scoreContainer.add(scoreHud);
    scoreContainer.add(scoreText);
    scoreContainer.setScale(0);

    this.tweens.timeline(popTween(scoreContainer, 750));

    setTimeout(() => {
      this.explodeParticles(
        scoreContainer.parentContainer.x + scoreContainer.x,
        scoreContainer.parentContainer.y + scoreContainer.y,
        50
      );
    }, 900);
  }

  createPlayButton() {
    this.playContainer = this.add.container(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2 + 300
    );

    const playButton = this.add.image(0, 0, "ui/play");
    playButton.setInteractive({ useHandCursor: true });
    this.playContainer.add(playButton);
    this.playContainer.setScale(0);

    playButton.on("pointerover", () => {
      playButton.setTint(0xe3e3e3);
    });
    playButton.on("pointerout", function () {
      this.clearTint();
    });

    playButton.on("pointerdown", () => {
      this.scene.launch("GameScene");
      this.scene.stop("BoardScene");
    });

    this.tweens.timeline(floatingTween(this.playContainer));
    this.tweens.timeline(popTween(this.playContainer, 700));
  }

  explodeParticles(x: number, y: number, intensity: number = 20) {
    const particlesEmitter = this.add
      .particles("particles/star")
      .createEmitter({
        x: x,
        y: y,
        speed: { min: -800, max: 800 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.1, end: 0 },
        blendMode: "SCREEN",
        lifespan: 1000,
        gravityY: 800,
      });

    particlesEmitter.explode(intensity);
  }
}
