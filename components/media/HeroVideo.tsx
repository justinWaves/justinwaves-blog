"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/brand/Icons";
import type { HeroVideoSources } from "@/lib/content/media";

export type { HeroVideoSources };

type Status = "poster" | "loading" | "playing" | "paused" | "unavailable";

const MOBILE_QUERY = "(max-width: 767px)";

type NetworkInformationLike = { saveData?: boolean };

function prefersStill() {
  if (typeof window === "undefined") return true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  return reduced || Boolean(connection?.saveData);
}

/**
 * Performance loop for the homepage hero.
 *
 * - Poster paints immediately (LCP); the video fades in when it can play.
 * - Source is chosen on the client so phones never download the desktop file.
 * - Reduced motion / Save-Data: the poster stays; playback is opt-in.
 * - Offscreen or hidden tab: playback pauses; resumes if the visitor hasn't paused.
 * - Any failure falls back to the poster with no broken rectangle.
 */
export function HeroVideo({ sources, labels, className = "" }: { sources: HeroVideoSources; labels: { pause: string; play: string }; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("poster");
  const [userPaused, setUserPaused] = useState(false);
  const [variant, setVariant] = useState<"desktop" | "mobile" | null>(null);
  const inViewRef = useRef(true);

  // Decide after first paint whether to load a video at all, and which rendition.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (prefersStill()) {
        setStatus("paused");
        setUserPaused(true);
        return;
      }
      setVariant(window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop");
      setStatus("loading");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Attach playback listeners once a rendition has been chosen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !variant) return;

    const tryPlay = () => {
      if (userPaused || !inViewRef.current || document.hidden) return;
      video.play().then(() => setStatus("playing")).catch(() => setStatus("paused"));
    };

    const onCanPlay = () => tryPlay();
    const onError = () => setStatus("unavailable");
    const onPlaying = () => setStatus("playing");
    const onPause = () => setStatus((s) => (s === "unavailable" ? s : "paused"));

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
        if (!entry?.isIntersecting) video.pause();
        else tryPlay();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [variant, userPaused]);

  const toggle = () => {
    const video = videoRef.current;
    if (status === "playing") {
      setUserPaused(true);
      video?.pause();
      return;
    }
    setUserPaused(false);
    if (!variant) {
      // Opted in from a reduced-motion / save-data start: load now.
      setVariant(window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop");
      setStatus("loading");
      return;
    }
    video?.play().then(() => setStatus("playing")).catch(() => setStatus("paused"));
  };

  const showControl = status !== "unavailable";
  const src = variant ? sources[variant] : null;
  const poster = sources.poster;

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {/* Poster: paints first and remains underneath as the fallback */}
      <picture>
        <source media={MOBILE_QUERY} type="image/webp" srcSet={poster.mobile.webp} />
        <source media={MOBILE_QUERY} srcSet={poster.mobile.jpg} />
        <source type="image/webp" srcSet={poster.desktop.webp} />
        <img
          src={poster.desktop.jpg}
          width={poster.desktop.width}
          height={poster.desktop.height}
          alt={sources.description}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[62%_40%] md:object-[60%_45%]"
        />
      </picture>

      {status !== "unavailable" && src ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover object-[62%_40%] md:object-[60%_45%] transition-opacity duration-700 ease-out ${
            status === "playing" ? "opacity-100" : "opacity-0"
          }`}
        >
          {src.webm ? <source src={src.webm} type="video/webm" /> : null}
          <source src={src.mp4} type="video/mp4" />
        </video>
      ) : null}

      {/* Contrast treatment: gradients keep type legible without flattening the footage */}
      <div className="absolute inset-0 vignette-mobile md:vignette" aria-hidden="true" />
      <div className="absolute inset-0 grain" aria-hidden="true" />

      {showControl ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={status === "playing"}
          aria-label={status === "playing" ? labels.pause : labels.play}
          title={status === "playing" ? labels.pause : labels.play}
          className="absolute bottom-6 right-5 md:bottom-8 md:right-8 z-10 inline-flex size-11 items-center justify-center rounded-none border border-ivory/40 bg-ink text-ivory transition-colors hover:border-ivory hover:bg-ink/70"
        >
          {status === "playing" ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4 translate-x-px" />}
        </button>
      ) : null}
    </div>
  );
}
