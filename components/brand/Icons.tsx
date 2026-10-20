import type { SVGProps } from "react";
import type { PlatformKey } from "@/lib/content/site";

type IconProps = SVGProps<SVGSVGElement>;

export function SpotifyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 511.991" fill="currentColor" aria-hidden {...props}>
      <path d="M255.998.003C114.616.003 0 114.616 0 255.997c0 141.385 114.616 255.994 255.998 255.994C397.395 511.991 512 397.386 512 255.997 512 114.624 397.395.015 255.994.015l.004-.015v.003zm117.4 369.22c-4.585 7.519-14.427 9.908-21.949 5.288-60.104-36.714-135.771-45.027-224.882-24.668-8.587 1.954-17.146-3.425-19.104-12.015-1.967-8.591 3.394-17.15 12.003-19.104 97.518-22.28 181.164-12.688 248.645 28.55 7.522 4.616 9.907 14.427 5.288 21.95l-.001-.001zm31.335-69.703c-5.779 9.389-18.067 12.353-27.452 6.578-68.813-42.298-173.703-54.548-255.096-29.837-10.556 3.187-21.704-2.761-24.906-13.298-3.18-10.556 2.772-21.68 13.309-24.891 92.971-28.208 208.551-14.546 287.574 34.015 9.385 5.779 12.35 18.067 6.575 27.441v-.004l-.004-.004zm2.692-72.584c-82.511-49.006-218.635-53.51-297.409-29.603-12.649 3.837-26.027-3.302-29.86-15.955-3.832-12.656 3.303-26.023 15.96-29.867 90.428-27.452 240.753-22.149 335.747 34.245 11.401 6.754 15.133 21.446 8.375 32.809-6.728 11.378-21.462 15.13-32.802 8.371h-.011z" />
    </svg>
  );
}

export function SoundCloudIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 229.209" fill="currentColor" aria-hidden {...props}>
      <path d="M511.962 161.134c-2.146 38.361-34.164 68.201-72.576 67.67H264.935c-7.99-.083-14.44-6.564-14.483-14.546V26.423a16.007 16.007 0 019.635-15.295S276.134 0 309.931 0a114.36 114.36 0 0158.657 16.117 116.064 116.064 0 0154.613 75.641 67.288 67.288 0 0118.504-2.52 69.843 69.843 0 0150.395 21.035 69.83 69.83 0 0119.87 50.864l-.008-.003zM228.68 38.299c5.261 63.709 9.084 121.814 0 185.315a5.662 5.662 0 01-5.627 5.044 5.668 5.668 0 01-5.635-5.044c-8.47-62.961-4.781-122.158 0-185.315a5.646 5.646 0 012.626-5.419 5.706 5.706 0 016.021 0 5.66 5.66 0 012.615 5.419zm-35.298 185.378a5.931 5.931 0 01-5.868 5.044 5.929 5.929 0 01-5.875-5.044 708.398 708.398 0 010-163.52 5.946 5.946 0 015.907-5.312 5.95 5.95 0 015.906 5.312 636.109 636.109 0 01-.074 163.52h.004zM158.009 54.625c5.729 58.377 8.336 110.678-.063 168.918a5.672 5.672 0 01-5.667 5.666 5.673 5.673 0 01-5.666-5.666c-8.128-57.491-5.399-111.293 0-168.918a5.713 5.713 0 015.698-5.104 5.716 5.716 0 015.698 5.104zm-35.425 169.127a5.817 5.817 0 01-5.78 5.166c-2.957 0-5.45-2.229-5.761-5.166a598.204 598.204 0 010-152.675 5.867 5.867 0 015.867-5.867c3.241 0 5.876 2.626 5.876 5.867a558.013 558.013 0 01-.209 152.675h.007zM87.204 109.25c8.951 39.59 4.918 74.557-.335 114.907a5.538 5.538 0 01-5.469 4.667 5.536 5.536 0 01-5.458-4.667c-4.78-39.799-8.742-75.589-.343-114.919a5.812 5.812 0 015.804-5.804 5.806 5.806 0 015.805 5.811l-.004.005zm-35.298-6.013c8.198 40.558 5.532 74.9-.209 115.597-.677 6.012-10.982 6.075-11.534 0-5.19-40.083-7.647-75.452-.208-115.597a6.026 6.026 0 015.981-5.368 5.995 5.995 0 015.97 5.368zm-35.633 19.661c8.596 26.903 5.659 48.761-.343 76.337a5.595 5.595 0 01-5.564 4.982 5.614 5.614 0 01-5.575-4.982c-5.19-27.036-7.293-49.364-.469-76.337.311-3.052 2.898-5.368 5.97-5.368a5.995 5.995 0 015.969 5.368h.012z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 447 512.57" fill="currentColor" aria-hidden {...props}>
      <path d="M380.23 102.74c-27.61-18-47.53-46.81-53.75-80.38-1.34-7.25-2.09-14.72-2.09-22.36h-88.12l-.14 353.16c-1.48 39.55-34.03 71.29-73.93 71.29-12.4 0-24.08-3.1-34.36-8.51-23.58-12.41-39.72-37.12-39.72-65.56 0-40.85 33.24-74.08 74.07-74.08 7.63 0 14.94 1.26 21.86 3.42v-89.96c-7.16-.98-14.44-1.58-21.86-1.58C72.76 188.18 0 260.93 0 350.38c0 54.87 27.41 103.43 69.25 132.8 26.34 18.5 58.39 29.39 92.95 29.39 89.44 0 162.2-72.76 162.2-162.19l-.01-179.09c34.56 24.81 76.92 39.42 122.61 39.42v-88.12c-24.61 0-47.53-7.31-66.77-19.85z" />
    </svg>
  );
}

export function AppleMusicIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.37 1.43c0 1.14-.42 2.2-1.13 3.03-.86 1-2.17 1.6-3.33 1.53a3.3 3.3 0 0 1-.03-.4c0-1.1.48-2.27 1.33-3.08C13.63 1.7 14.5 1.17 15.6 1c.03.15.05.3.05.43zm3.9 16.1c-.56 1.27-.83 1.84-1.55 2.96-1 1.57-2.42 3.52-4.17 3.54-1.56.01-1.96-1.02-4.07-1.01-2.1.01-2.55 1.03-4.1 1.01-1.76-.02-3.1-1.78-4.1-3.35C-.54 16.3-.84 11.14.95 8.4c1.27-1.95 3.28-3.09 5.16-3.09 1.92 0 3.13 1.05 4.72 1.05 1.54 0 2.48-1.06 4.7-1.06 1.68 0 3.46.92 4.72 2.5-4.15 2.27-3.48 8.2.02 9.73z" />
    </svg>
  );
}

export function BandcampIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}

const lineProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...lineProps} aria-hidden {...props}>
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...lineProps} aria-hidden {...props}>
      <path d="M8 4H4.5A1.5 1.5 0 0 0 3 5.5v10A1.5 1.5 0 0 0 4.5 17h10a1.5 1.5 0 0 0 1.5-1.5V12M12 3h5v5M17 3l-8 8" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <path d="M6 4.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden {...props}>
      <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...lineProps} aria-hidden {...props}>
      <path d="M10 3v10M6 9l4 4 4-4M4 16h12" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...lineProps} aria-hidden {...props}>
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...lineProps} aria-hidden {...props}>
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  );
}

export function PlatformIcon({ platform, ...props }: IconProps & { platform: PlatformKey }) {
  switch (platform) {
    case "spotify":
      return <SpotifyIcon {...props} />;
    case "appleMusic":
      return <AppleMusicIcon {...props} />;
    case "soundcloud":
      return <SoundCloudIcon {...props} />;
    case "bandcamp":
      return <BandcampIcon {...props} />;
    case "instagram":
      return <InstagramIcon {...props} />;
    case "youtube":
      return <YouTubeIcon {...props} />;
    case "tiktok":
      return <TikTokIcon {...props} />;
  }
}
