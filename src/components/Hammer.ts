import Phaser from "phaser";
import CONFIG from "../config";
import { IWhackable } from "../types/IWhackable";
import { Tag } from "../types/Tag";

export default class Hammer
  extends Phaser.GameObjects.Container
  implements Phaser.GameObjects.Container, IWhackable
{
  private static TEXTURE: string = "hammer";
  private sprite: Phaser.GameObjects.Image;
  private timelineTweens: Phaser.Tweens.Timeline;
  private punchSfx: Phaser.Sound.BaseSound;

  public tags: Tag[] = [Tag.WHACKABLE];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.timelineTweens = this.scene.tweens.createTimeline();

    this.sprite = this.scene.add.image(0, 0, Hammer.TEXTURE);
    this.add(this.sprite);

    this.scene.input.on("pointermove", (pointer) => {
      this.setPosition(pointer.x, pointer.y);
    });

    this.setInteractive(
      new Phaser.Geom.Circle(0, 0, 20),
      Phaser.Geom.Circle.Contains
    );

    this.punchSfx = this.scene.sound.add("sfx/punch", { volume: 1 });
  }

  public onWhack() {
    this.punchSfx.play();
    this.timelineTweens?.stop?.();

    this.timelineTweens = this.scene.tweens.createTimeline();
    this.timelineTweens.add({
      targets: this,
      rotation: 1.2,
      duration: 50,
    });
    this.timelineTweens.add({
      targets: this,
      rotation: -1,
      duration: 50,
    });
    this.timelineTweens.add({
      targets: this,
      rotation: 0,
      duration: 50,
      delay: 250,
    });
    this.timelineTweens.play();
  }
}
