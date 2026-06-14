"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const h1aRef = useRef<HTMLSpanElement>(null);
  const h1bRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const attemptPlay = () => video.play().catch(() => {});

    // Try immediately in case it's already buffered
    attemptPlay();

    // Also fire when browser signals it has enough data — catches the fresh-load case
    video.addEventListener("canplay", attemptPlay, { once: true });

    return () => video.removeEventListener("canplay", attemptPlay);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          labelRef.current,
          h1aRef.current,
          h1bRef.current,
          subRef.current,
          btnRef.current,
        ],
        { opacity: 0, y: 40 },
      );

      gsap
        .timeline({ delay: 0.15, defaults: { ease: "power3.out" } })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(h1aRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(h1bRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.65")
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden min-h-[100svh] flex items-center border-b border-[#e8e3d8]"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1c1a16]/60" />

      {/* Scrolling barangay names — sits above overlay, below content */}
      <div
        className="absolute inset-0 flex flex-col justify-center gap-10 pointer-events-none select-none overflow-hidden"
        style={{ opacity: 0.07 }}
        aria-hidden
      >
        {(
          [
            { dir: "left", speed: 70, offset: "0s" },
            { dir: "right", speed: 90, offset: "-20s" },
            { dir: "left", speed: 55, offset: "-10s" },
          ] as const
        ).map(({ dir, speed, offset }, i) => (
          <div
            key={i}
            className="flex whitespace-nowrap font-serif text-[7rem] font-bold text-white leading-none"
            style={{
              animation: `marquee-${dir} ${speed}s linear infinite`,
              animationDelay: offset,
            }}
          >
            {"LAPUZ · JARO · MOLO · LA PAZ · MANDURRIAO · AREVALO · CITY PROPER · LEGANES · PAVIA · SANTA BARBARA · CABATUAN · MIAGAO · ".repeat(
              2,
            )}
          </div>
        ))}
      </div>

      {/* Vignette so marquee fades out at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1c1a16]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1c1a16]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1c1a16]/40 to-transparent pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-28 sm:py-36">
        <p
          ref={labelRef}
          className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium"
        >
          Libre nga Coding Workshops · Iloilo City, Philippines
        </p>

        <h1 className="font-serif text-[2.75rem] sm:text-7xl lg:text-[6rem] font-bold text-white leading-[1.02] mb-7 max-w-4xl">
          <span ref={h1aRef} className="block">
            Empowering Iloilo&apos;s
          </span>
          <span ref={h1bRef} className="block">
            Kabataan, One Line of <em className="text-[#4ade80]">Code</em> at a
            Time.
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-white/65 text-base sm:text-xl max-w-lg leading-relaxed mb-10"
        >
          Libre workshops para sa kabataan aged 10–16 in Iloilo&apos;s libraries
          and barangay reading centers. Padayon. Ang kinabukasan starts here.
        </p>

        <div ref={btnRef} className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/classes"
            className="px-7 py-3.5 bg-white text-[#1c1a16] text-sm font-medium tracking-wide rounded-full hover:bg-[#f5f3ee] transition-colors text-center"
          >
            Find a Workshop
          </Link>
          <Link
            href="/volunteer"
            className="px-7 py-3.5 border border-white/35 text-white text-sm tracking-wide rounded-full hover:border-white/70 hover:bg-white/5 transition-colors text-center"
          >
            Volunteer with Us
          </Link>
        </div>
      </div>
    </div>
  );
}
