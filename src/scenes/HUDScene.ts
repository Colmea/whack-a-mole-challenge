import Phaser from "phaser";
import CONFIG from '../config';

type HUDData = {
  score: number;
  time: number;
}

const textOptions: Phaser.Types.GameObjects.Text.TextStyle = { font: '40px Arial Black', color: '#fff', fontStyle: 'bold', shadow: {
  offsetX: 1,
  offsetY: 1,
  color: 'black',
  blur: 1,
  stroke: true,
  fill: true,
}};

export default class HUDScene extends Phaser.Scene {

  private score: number = 0;
  private scoreContainer: Phaser.GameObjects.Image;
  private scoreText: Phaser.GameObjects.Text;

  private remainingTime: number = 120;
  private remainingTimeContainer: Phaser.GameObjects.Image;
  private remainingTimeText: Phaser.GameObjects.Text;
 private  dd: Phaser.Types.GameObjects.Text.TextStyle;
  constructor() {
    super({ key: 'HUDScene', active: false });
  }

  preload() {
    this.load.image('score_hud', 'assets/ui/score_hud.png');
    this.load.image('time_hud', 'assets/ui/time_hud.png');
  }

  create() {
    console.log('Init UHDScene');

    this.scoreContainer = this.add.image(200, 200, 'score_hud');
    this.scoreText = this.add.text(200, 230, '0', textOptions).setOrigin(0.5).setDepth(1000);

    // Add remainingTime text
    this.remainingTimeContainer = this.add.image(1000, 900, 'time_hud');
    this.remainingTimeText = this.add.text(998, 890, '120', { ...textOptions, font: '60px Arial Black' }).setOrigin(0.5).setDepth(1000);

    this.registry.events.on('changedata', this.updateData);
  }

  updateData = (parent, key, data) => { 

    switch(key) {
      case 'score':
        this.score = data;
        this.scoreText.setText(this.score.toString());
        break;
      case 'remainingTime':
        this.remainingTime = data;
        this.remainingTimeText.setText(this.remainingTime.toString());
        break;
    }
  }
}