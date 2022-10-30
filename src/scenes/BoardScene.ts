import Phaser from "phaser";
import CONFIG from "../config";
import floatingTween from "../tweens/FloatingTween";

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

  constructor() {
    super({ key: "BoardScene", active: false });
  }

  preload() {
    this.load.image("ui/board", "assets/ui/board.png");
    this.load.image("ui/play", "assets/ui/play.png");
  }

  create() {
    console.log("Init BoardScene");

    this.createBoard();
    this.createPlayButton();
  }

  createBoard() {
    this.boardContainer = this.add.container(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2 - 100
    );

    const board = this.add.image(0, 0, "ui/board");
    this.boardContainer.add(board);

    this.tweens.timeline(floatingTween(this.boardContainer, false, 3));
  }

  createPlayButton() {
    this.playContainer = this.add.container(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2 + 300
    );

    const playButton = this.add.image(0, 0, "ui/play");
    playButton.setInteractive();
    this.playContainer.add(playButton);

    playButton.on("pointerdown", () => {
      this.scene.launch("GameScene");
      this.scene.stop("BoardScene");
    });

    this.tweens.timeline(floatingTween(this.playContainer));
  }
}
