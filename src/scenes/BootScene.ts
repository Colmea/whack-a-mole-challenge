import Phaser from "phaser";
import CONFIG from '../config';
import GameManager from "./GameScene";

export default class BootScene extends Phaser.Scene {
  private gameManager: GameManager;

  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image('background', 'assets/game_background_opti.jpg');
    this.load.image('hammer', 'assets/hammer.png');
    this.load.image('mole_down', 'assets/mole_down.png');
    this.load.image('mole_up', 'assets/mole_up.png');
  }

  create() {
    console.log('Init Bootstrap Scene');
    const bgAsset = this.add.image(CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/2, 'background');
    bgAsset.setDisplaySize(CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT)

    this.scene.launch('GameScene');

  }

  update() {
    // this.gameManager.update();
  }
}