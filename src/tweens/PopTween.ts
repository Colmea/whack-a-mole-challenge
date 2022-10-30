export default function popTween(
  target: any,
  delay: number = 0
): Phaser.Types.Tweens.TimelineBuilderConfig {
  return {
    targets: [target],
    ease: "Sine.easeInOut",
    tweens: [
      {
        scale: 1.3,
        duration: 130,
        delay: delay,
      },
      {
        scale: 1,
        duration: 50,
      },
    ],
  };
}
