import Phaser from "phaser";
import CONFIG from "../config";
import Mole from "../components/Mole";
import Hammer from "../components/Hammer";
import { IWhackable } from "../types/IWhackable";
import { Tag } from "../types/Tag";
import SpawnManager from "../services/SpawnManager";

export default class GameScene extends Phaser.Scene {
  score: number = 0;
  remainingTime: number = CONFIG.GAME.TIMER;

  private spawnManager: SpawnManager;
  private hammer: Hammer;
  private moles: Mole[];
  private blopSfx: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: "GameScene", active: false });
  }

  create() {
    console.log("Init GameScene");
    this.scene.launch("HUDScene");

    this.registry.set("score", this.score);
    this.registry.set("remainingTime", this.remainingTime);

    this.blopSfx = this.sound.add("sfx/blop", { volume: 0.3 });

    this.createMoles();

    // Initialize SpawnManager
    this.spawnManager = new SpawnManager(this, this.moles, this.spawnMoleSFX);

    this.hammer = new Hammer(this, this.input.x, this.input.y);

    // Listen for mouse click
    // Only click if object is whackable
    this.input
      .setTopOnly(false)
      .on(
        "pointerdown",
        (pointer: Phaser.Input.Pointer, objectsClicked: IWhackable[]) => {
          objectsClicked.forEach((object) => {
            if (object.tags?.includes(Tag.SCORE) && object.isActive) {
              this.increaseScore();
            }
            if (object.tags?.includes(Tag.WHACKABLE)) {
              object.onWhack?.();
            }
          });
        }
      );

    this.startGame();
  }

  createMoles() {
    // @TODO Find better way to position moles
    this.moles = [
      // Row 1
      new Mole(this, CONFIG.GAME_WIDTH / 3, CONFIG.GAME_HEIGHT / 3),
      new Mole(this, CONFIG.GAME_WIDTH / 2, CONFIG.GAME_HEIGHT / 3),
      new Mole(this, CONFIG.GAME_WIDTH / 1.5, CONFIG.GAME_HEIGHT / 3),
      new Mole(this, CONFIG.GAME_WIDTH / 1.2, CONFIG.GAME_HEIGHT / 3),
      // Row 2
      new Mole(this, CONFIG.GAME_WIDTH / 3, CONFIG.GAME_HEIGHT / 2),
      new Mole(this, CONFIG.GAME_WIDTH / 2, CONFIG.GAME_HEIGHT / 2),
      new Mole(this, CONFIG.GAME_WIDTH / 1.5, CONFIG.GAME_HEIGHT / 2),
      new Mole(this, CONFIG.GAME_WIDTH / 1.2, CONFIG.GAME_HEIGHT / 2),
      // Row 3
      new Mole(this, CONFIG.GAME_WIDTH / 3, CONFIG.GAME_HEIGHT / 1.5),
      new Mole(this, CONFIG.GAME_WIDTH / 2, CONFIG.GAME_HEIGHT / 1.5),
      new Mole(this, CONFIG.GAME_WIDTH / 1.5, CONFIG.GAME_HEIGHT / 1.5),
      new Mole(this, CONFIG.GAME_WIDTH / 1.2, CONFIG.GAME_HEIGHT / 1.5),
    ];
  }

  spawnMoleSFX = () => {
    this.blopSfx.play();
  };

  startGame() {
    // Start SpawnManager
    this.spawnManager.start();

    // Start timer
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.remainingTime--;
        this.registry.set("remainingTime", this.remainingTime);
      },
      loop: true,
    });
  }

  resetGame() {
    this.score = 0;
    this.remainingTime = CONFIG.GAME.TIMER;
    this.spawnManager.stop();
    this.registry.set("score", this.score);
    this.registry.set("remainingTime", this.remainingTime);
  }

  increaseScore() {
    this.score += CONFIG.GAME.MOLE_SCORE;
    this.registry.set("score", this.score);
  }
}
