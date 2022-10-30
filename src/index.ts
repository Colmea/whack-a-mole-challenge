import Phaser from "phaser";
import CONFIG from './config';
import BootstrapScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";
import HUDScene from "./scenes/HUDScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'container',
  dom: { createContainer: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  width: CONFIG.GAME_WIDTH,
  height: CONFIG.GAME_HEIGHT,
  scene: [
    BootstrapScene,
    GameScene,
    HUDScene,
  ]
};

const game = new Phaser.Game(config);

export default game;