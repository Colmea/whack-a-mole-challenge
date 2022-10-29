import Phaser from 'phaser';
import CONFIG from '../config';
import Mole from '../components/Mole';
import Hammer from '../components/Hammer';
import { IWhackable } from '../types/IWhackable';
import { Tag } from '../types/Tag';

export default class GameManager extends Phaser.GameObjects.Container {
  private static readonly MIN_SPAWN_FREQUENCY: number = 500;
  private static readonly MAX_SPAWN_FREQUENCY: number = 3000;
  private static readonly GAME_TIMER: number = 1200000; // 2min

  score: number = 0;
  startTime: Date = new Date();

  private isStarted: boolean = false;
  private hammer: Hammer;
  private moles: Mole[];

  constructor(readonly scene: Phaser.Scene) {
    super(scene, CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/2);

    // @TODO Find better way to position moles
    this.moles = [
      new Mole(scene, CONFIG.GAME_WIDTH/3, CONFIG.GAME_HEIGHT/3),
      new Mole(scene, CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/3),
      new Mole(scene, CONFIG.GAME_WIDTH/1.5, CONFIG.GAME_HEIGHT/3),
    ];

    this.hammer = new Hammer(this.scene, CONFIG.GAME_WIDTH/2, CONFIG.GAME_HEIGHT/2);

    this.scene.input
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
    console.log('increase score');
    this.score += CONFIG.SCORE_MOLE;
  } 
}