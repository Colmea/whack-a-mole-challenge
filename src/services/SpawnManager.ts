import Phaser from "phaser";
import CONFIG from "../config";
import Mole from "../components/Mole";

export default class SpawnManager {
  private static SPAWN_INTERVAL: number = CONFIG.GAME.SPAWN_INTERVAL;
  private static SPAWN_MAX_DELAY: number = CONFIG.GAME.SPAWN_MAX_DELAY;
  private static SPAWN_MIN_DELAY: number = CONFIG.GAME.SPAWN_MIN_DELAY;

  private scene: Phaser.Scene;
  private moles: Mole[];
  private timer: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, moles: Mole[]) {
    this.scene = scene;
    this.moles = moles;
  }

  public start() {
    this.timer = this.scene.time.addEvent({
      delay: SpawnManager.SPAWN_INTERVAL,
      callback: this.spawnMole,
      callbackScope: this,
      loop: true,
    });
  }

  public stop() {
    this.timer.destroy();
  }

  private spawnMole() {
    const mole = Phaser.Utils.Array.GetRandom(this.moles);
    mole.setUp();
    this.scene.time.addEvent({
      delay: this.getRandomInterval(),
      callback: mole.setDown,
      callbackScope: mole,
      loop: false,
    });
  }

  private getRandomInterval() {
    return Phaser.Math.Between(
      SpawnManager.SPAWN_MIN_DELAY,
      SpawnManager.SPAWN_MAX_DELAY
    );
  }
}
