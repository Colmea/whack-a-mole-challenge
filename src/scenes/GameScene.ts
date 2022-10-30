import Phaser from 'phaser';
import CONFIG from '../config';
import Mole from '../components/Mole';
import Hammer from '../components/Hammer';
import { IWhackable } from '../types/IWhackable';
import { Tag } from '../types/Tag';

export default class GameScene extends Phaser.Scene {
  private static readonly MIN_SPAWN_FREQUENCY: number = 500;
  private static readonly MAX_SPAWN_FREQUENCY: number = 3000;
  private static readonly GAME_TIMER: number = 1200000; // 2min

  score: number = 0;
  remainingTime: number = 120;

  private isStarted: boolean = false;
  private hammer: Hammer;
  private moles: Mole[];

  constructor() {
    super({ key: 'GameScene', active: false });
  }

  create() {
    console.log('Init GameScene');

    this.registry.set('score', this.score);
    this.registry.set('remainingTime', this.remainingTime);

    // @TODO Find better way to position moles
    this.moles = [
      new Mole(this, CONFIG.GAME_WIDTH/3, CONFIG.GAME_HEIGHT/3),
      new Mole(this, CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/3),
      new Mole(this, CONFIG.GAME_WIDTH/1.5, CONFIG.GAME_HEIGHT/3),
    ];

    this.hammer = new Hammer(this, CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/2);

    this.input
    .setTopOnly(false)
    .on('pointerdown', (pointer: Phaser.Input.Pointer, objectsClicked: IWhackable[]) => {
        objectsClicked.forEach(object => {
          if (object.tags?.includes(Tag.WHACKABLE))
            object.onWhack?.();
          if (object.tags?.includes(Tag.SCORE))
            this.increaseScore();
        })
      }
    );

    this.scene.launch('HUDScene');
  }

  update() {
    // @TODO Refactor with a real RandomSpawner
    const number = Math.floor(Math.random() * 20);
    if (number === 1) {
      const moleIndex = Math.floor(Math.random() * this.moles.length);
      this.moles[moleIndex].setUp();
    }
  }

  increaseScore() {
    this.score += CONFIG.SCORE_MOLE;
    this.registry.set('score', this.score);
  } 
}