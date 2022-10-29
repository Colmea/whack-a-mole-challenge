import Phaser from "phaser";
import CONFIG from '../config';

export default class BootstrapScene extends Phaser.Scene {
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
    console.log('start', CONFIG);
  }
}