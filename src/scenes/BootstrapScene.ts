import Phaser from "phaser";
import CONFIG from '../config';
import GameManager from "../services/GameManager";

export default class BootstrapScene extends Phaser.Scene {
  private gameManager: GameManager;

  constructor() {
    super("Bootstrap");
  }

  preload() {
    this.load.image('background', 'assets/game_background_opti.jpg');
    this.load.image('hammer', 'assets/hammer.png');
    this.load.image('mole_down', 'assets/mole_down.png');
    this.load.image('mole_up', 'assets/mole_up.png');
  }

  create() {
    const bgAsset = this.add.image(CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/2, 'background');
    bgAsset.setDisplaySize(CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT)

    this.gameManager = new GameManager(this);
  }

  update() {
    this.gameManager.update();
  }
}