import Phaser from "phaser";
import CONFIG from "../config";

type LeaderBoardScore = {
  name: string;
  score: number;
};

export default class ManagerScene extends Phaser.Scene {
  private bgMusic: any;
  private leaderBoard: LeaderBoardScore[] = [];

  constructor() {
    super("ManagerScene");
  }

  preload() {
    this.load.image("background", "assets/game_background_opti.jpg");
    this.load.image("hammer", "assets/hammer.png");
    this.load.image("mole_down", "assets/mole_down.png");
    this.load.image("mole_up", "assets/mole_up.png");

    this.load.audio("music/bg", ["assets/sfx/bg_music.ogg"]);
    this.load.audio("sfx/blop", ["assets/sfx/blop.wav"]);
    this.load.audio("sfx/punch", ["assets/sfx/punch.wav"]);
  }

  create() {
    console.log("Init Manager Scene");

    const bgAsset = this.add.image(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2,
      "background"
    );
    bgAsset.setDisplaySize(CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);

    this.scene.launch("BoardScene");

    this.bgMusic = this.sound.add("music/bg", { loop: true, volume: 0.5 });
    this.bgMusic.play();

    this.registry.events.on("changedata-remainingTime", (parent, value) => {
      if (value <= 0) {
        this.gameOver();
      }
    });
  }

  gameOver() {
    (this.scene.get("GameScene") as any).resetGame();

    this.scene.stop("GameScene");
    this.scene.stop("HUDScene");
    this.scene.launch("BoardScene");
  }
}
