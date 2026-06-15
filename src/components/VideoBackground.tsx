"use client";
import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("[VideoBackground] render — typeof window:", typeof window);

  useEffect(() => {
    const video = videoRef.current;
    console.log("[VideoBackground] useEffect fired");
    console.log("[VideoBackground] videoRef.current:", video);

    if (!video) {
      console.warn("[VideoBackground] no video element — bailing");
      return;
    }

    console.log(
      "[VideoBackground] video.readyState:",
      video.readyState,
      "(0=HAVE_NOTHING, 1=HAVE_METADATA, 2=HAVE_CURRENT_DATA, 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA)",
    );
    console.log(
      "[VideoBackground] video.networkState:",
      video.networkState,
      "(0=EMPTY, 1=IDLE, 2=LOADING, 3=NO_SOURCE)",
    );
    console.log("[VideoBackground] video.muted (before set):", video.muted);
    console.log("[VideoBackground] video.autoplay:", video.autoplay);
    console.log("[VideoBackground] video.paused (before play):", video.paused);
    console.log(
      "[VideoBackground] video.src:",
      video.src,
      "| currentSrc:",
      video.currentSrc,
    );

    video.muted = true;
    console.log("[VideoBackground] video.muted (after set):", video.muted);

    const onPlay = () =>
      console.log("[VideoBackground] event: play fired — video is playing");
    const onPause = () => console.log("[VideoBackground] event: pause fired");
    const onStalled = () =>
      console.log("[VideoBackground] event: stalled — browser can't get data");
    const onWaiting = () =>
      console.log("[VideoBackground] event: waiting — buffering");
    const onCanPlay = () =>
      console.log(
        "[VideoBackground] event: canplay — readyState:",
        video.readyState,
      );
    const onCanPlayThrough = () =>
      console.log("[VideoBackground] event: canplaythrough");
    const onError = () =>
      console.error(
        "[VideoBackground] event: error —",
        video.error?.message,
        "code:",
        video.error?.code,
      );
    const onLoadStart = () => console.log("[VideoBackground] event: loadstart");
    const onLoadedMetadata = () =>
      console.log(
        "[VideoBackground] event: loadedmetadata — duration:",
        video.duration,
        "dimensions:",
        video.videoWidth,
        "x",
        video.videoHeight,
      );
    const onSuspend = () =>
      console.log("[VideoBackground] event: suspend — browser stopped loading");

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("stalled", onStalled);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.addEventListener("error", onError);
    video.addEventListener("loadstart", onLoadStart);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("suspend", onSuspend);

    console.log("[VideoBackground] calling video.play()...");
    video
      .play()
      .then(() =>
        console.log("[VideoBackground] video.play() promise resolved ✓"),
      )
      .catch((err) =>
        console.error(
          "[VideoBackground] video.play() rejected:",
          err.name,
          err.message,
        ),
      );

    return () => {
      console.log("[VideoBackground] cleanup — removing event listeners");
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("error", onError);
      video.removeEventListener("loadstart", onLoadStart);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("suspend", onSuspend);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster="/hero-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
