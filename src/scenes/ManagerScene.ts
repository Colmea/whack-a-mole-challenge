import Phaser from "phaser";
import CONFIG from "../config";
import { LeaderBoardScore } from "../types/LeaderBoard";

export default class ManagerScene extends Phaser.Scene {
  private bgMusic: any;
  private leaderBoard: LeaderBoardScore[] = [{ name: "Arthur", score: 1325 }];

  constructor() {
    super("ManagerScene");
  }

  preload() {
    // UI assets
    this.load.image("background", "assets/game_background_opti.jpg");
    this.load.image("hammer", "assets/hammer.png");
    this.load.image("mole_down", "assets/mole_down.png");
    this.load.image("mole_up", "assets/mole_up.png");
    // Sound assets
    this.load.audio("music/bg", ["assets/sfx/bg_music.ogg"]);
    this.load.audio("sfx/blop", ["assets/sfx/blop.wav"]);
    this.load.audio("sfx/punch", ["assets/sfx/punch.wav"]);
  }

  create() {
    console.log("Init Manager Scene");

    const bgAsset = this.add.image(
      CONFIG.GAME_WIDTH / 2,
      CONFIG.GAME_HEIGHT / 2,
      "background"
    );
    bgAsset.setDisplaySize(CONFIG.GAME_WIDTH, CONFIG.GAME_HEIGHT);

    this.scene.launch("BoardScene");

    this.bgMusic = this.sound.add("music/bg", { loop: true, volume: 0.5 });
    this.bgMusic.play();

    // this.registry.set("leaderBoard", this.leaderBoard);
    // this.registry.set("lastScore", 325);

    this.registry.events.on("changedata-remainingTime", (parent, value) => {
      if (value <= 0) {
        this.gameOver();
      }
    });
  }

  private gameOver() {
    const score = this.registry.get("score");

    this.registerScore("Player", score);
    (this.scene.get("GameScene") as any).resetGame();

    this.scene.stop("GameScene");
    this.scene.stop("HUDScene");
    this.scene.launch("BoardScene");
  }

  private registerScore(name: string, score: number) {
    const newScore: LeaderBoardScore = { name, score };

    // Add new score to leaderboard if top 10
    this.leaderBoard.push(newScore);
    this.leaderBoard.sort((a, b) => b.score - a.score);
    this.leaderBoard = this.leaderBoard.slice(0, CONFIG.GAME.MAX_LEADERBOARD);
    this.registry.set("leaderBoard", this.leaderBoard);

    // Save score as last score
    this.registry.set("lastScore", score);
  }
}
