import Image from "next/image";

export type MotifName =
  | "orbital-arc"
  | "horizon-flare"
  | "harmonic-waveform"
  | "capsule-window"
  | "signal-trace"
  | "frequency-beacon"
  | "owl-totem"
  | "coordinate-frame";

const dimensions: Record<MotifName, { width: number; height: number }> = {
  "orbital-arc": { width: 900, height: 900 },
  "horizon-flare": { width: 900, height: 900 },
  "harmonic-waveform": { width: 900, height: 900 },
  "capsule-window": { width: 600, height: 900 },
  "signal-trace": { width: 900, height: 900 },
  "frequency-beacon": { width: 900, height: 900 },
  "owl-totem": { width: 900, height: 900 },
  "coordinate-frame": { width: 900, height: 900 },
};

/**
 * Decorative line illustration from the transparent asset pack.
 * Always decorative (empty alt), never interactive, and sized by the caller.
 */
export function Motif({ name, className = "", sizes = "(min-width: 1024px) 420px, 60vw", priority = false }: { name: MotifName; className?: string; sizes?: string; priority?: boolean }) {
  const { width, height } = dimensions[name];
  return (
    <Image
      src={`/media/motifs/${name}.webp`}
      alt=""
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`motif ${className}`}
      draggable={false}
    />
  );
}
