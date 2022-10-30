import Phaser from "phaser";
import CONFIG from "../config";
import floatingTween from "../tweens/FloatingTween";
import pulseTween from "../tweens/PulseTween";

type HUDData = {
  score: number;
  time: number;
};

export default class HUDScene extends Phaser.Scene {
  private static TEXT_OPTIONS: Phaser.Types.GameObjects.Text.TextStyle = {
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

  private score: number = 0;
  private scoreContainer: Phaser.GameObjects.Container;
  private scoreText: Phaser.GameObjects.Text;

  private remainingTime: number = 120;
  private remainingTimeContainer: Phaser.GameObjects.Container;
  private remainingTimeText: Phaser.GameObjects.Text;
  private dd: Phaser.Types.GameObjects.Text.TextStyle;
  constructor() {
    super({ key: "HUDScene", active: false });
  }

  preload() {
    this.load.image("score_hud", "assets/ui/score_hud.png");
    this.load.image("time_hud", "assets/ui/time_hud.png");
  }

  create() {
    console.log("Init UHDScene");

    this.createScore();
    this.createTimer();
  }

  createScore() {
    // Create score container
    this.scoreContainer = this.add.container(170, 150);

    const scoreHud = this.add.image(0, 0, "score_hud");
    this.scoreText = this.add
      .text(0, 30, "0", HUDScene.TEXT_OPTIONS)
      .setOrigin(0.5)
      .setDepth(1000);

    this.scoreContainer.add(scoreHud);
    this.scoreContainer.add(this.scoreText);

    this.tweens.timeline(floatingTween(this.scoreContainer));

    // Register for score updates
    this.registry.events.on("changedata-score", this.updateScore);
  }

  createTimer() {
    // Create timer container
    this.remainingTimeContainer = this.add.container(1750, 170);

    const timeHud = this.add.image(0, 0, "time_hud");
    this.remainingTimeText = this.add
      .text(0, -10, CONFIG.GAME.TIMER.toString(), {
        ...HUDScene.TEXT_OPTIONS,
        font: "60px Arial Black",
      })
      .setOrigin(0.5)
      .setDepth(1000);

    this.remainingTimeContainer.add(timeHud);
    this.remainingTimeContainer.add(this.remainingTimeText);
    this.remainingTimeContainer.setScale(0.8);

    this.tweens.timeline(floatingTween(this.remainingTimeContainer));
    this.tweens.timeline(pulseTween(this.remainingTimeText));

    // Register for timer updates
    this.registry.events.on("changedata-remainingTime", this.updateTimer);
  }

  updateScore = (parent: any, value: string) => {
    if (this.scene.isActive("HUDScene")) {
      this.scoreText.setText(value);
      this.tweens.timeline(pulseTween(this.scoreText, 0, 0, 100));
    }
  };

  updateTimer = (parent: any, value: number) => {
    if (this.scene.isActive("HUDScene")) {
      this.remainingTimeText.setText(value.toString());
    }
  };
}
