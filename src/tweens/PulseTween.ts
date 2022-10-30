export default function pulseTween(
  target: any,
  repeat: number = -1,
  delay: number = 0,
  duration: number = 500
): Phaser.Types.Tweens.TimelineBuilderConfig {
  return {
    targets: [target],
    ease: "Sine.easeInOut",
    delay: delay,
    repeat: repeat,
    tweens: [
      {
        scale: 1.1,
        duration: duration,
        yoyo: true,
      },
    ],
  };
}
