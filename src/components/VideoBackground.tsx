"use client";
import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const p = video.play();
    if (p !== undefined) p.catch(() => {});
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
