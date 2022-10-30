import Phaser from "phaser";
import CONFIG from "../config";

export default class BootScene extends Phaser.Scene {
  private bgMusic: any;

  constructor() {
    super("BootScene");
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
    console.log("Init Bootstrap Scene");
    const bgAsset = this.add.image(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2,
      "background"
    );
    bgAsset.setDisplaySize(CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);

    this.scene.launch("BoardScene");

    this.bgMusic = this.sound.add("music/bg", { loop: true, volume: 0.5 });
    this.bgMusic.play();
  }

  update() {
    // this.gameManager.update();
  }
}
