import Phaser from 'phaser';
import CONFIG from '../config';
import { Tag } from '../types/Tag';
import { IWhackable } from '../types/IWhackable';

export default class Mole extends Phaser.GameObjects.Container implements Phaser.GameObjects.Container, IWhackable {
  private static TEXTURE_DOWN: string = "mole_down";
  private static TEXTURE_UP: string = "mole_up";

  public tags = [Tag.WHACKABLE, Tag.SCORE];
  public spriteDown: Phaser.GameObjects.Image;
  public spriteUp: Phaser.GameObjects.Image;

  public isActive: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {    
    super(scene, x, y);
    scene.add.existing(this);

    this.spriteDown = this.scene.add.image(0, 0, Mole.TEXTURE_DOWN);
    this.spriteUp = this.scene.add.image(0, 0, Mole.TEXTURE_UP);
    this.spriteUp.setAlpha(0);
    this.spriteUp.setPosition(0, -34);
    
    this.setInteractive(new Phaser.Geom.Circle(0, 0, 100), Phaser.Geom.Circle.Contains);
    this.setInteractive(true);
    this.add(this.spriteDown);
    this.add(this.spriteUp);

    if (CONFIG.DEBUG) {
      this.debug();
    }
  }

  private debug() {
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(2, 0x00ffff, 1);
    graphics.strokeCircle(this.x, this.y, this.input.hitArea.radius);
  }

  public onWhack() {
    console.log('Whack mole');
    this.setDown();
  }

  public setDown() {
    this.spriteDown?.setAlpha(1);
    this.spriteUp?.setAlpha(0);
    this.isActive = false;
  }

  public setUp() {
    this.spriteDown?.setAlpha(0);
    this.spriteUp?.setAlpha(1);
    this.isActive = true;
  }
}