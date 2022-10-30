export default function floatingTween(
  target: Phaser.GameObjects.Container,
  rotate: boolean = true,
  intensity: number = 5
): Phaser.Types.Tweens.TimelineBuilderConfig {
  return {
    targets: [target],
    duration: 1000,
    ease: "Sine.easeInOut",
    yoyo: true,
    repeat: -1,
    delay: Math.random() * 1000,
    tweens: [
      {
        y: `+=${intensity}`,
        rotation: rotate ? "+=0.01" : 0,
        ease: "Sine.easeInOut",
        duration: 1000,
        yoyo: true,
      },
    ],
  };
}
