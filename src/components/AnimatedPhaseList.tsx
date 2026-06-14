"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Phase = {
  number: string;
  title: string;
  sub: string;
  desc: string;
};

export default function AnimatedPhaseList({ phases }: { phases: Phase[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".phase-divider", listRef.current)
        .forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.65,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".phase-row", listRef.current)
        .forEach((row) => {
          const num = row.querySelector<HTMLElement>(".phase-num");
          const content = row.querySelector<HTMLElement>(".phase-content");

          if (num) {
            gsap.fromTo(
              num,
              { opacity: 0, x: -32 },
              {
                opacity: 1,
                x: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                delay: 0.18,
                scrollTrigger: {
                  trigger: row,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          }
        });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="mt-16">
      {phases.map((phase) => (
        <div key={phase.number}>
          <div className="phase-divider h-px bg-white/10 origin-left" />
          <div className="phase-row flex items-start gap-8 sm:gap-16 py-10 sm:py-12">
            <span
              className="phase-num font-serif font-bold leading-none shrink-0 select-none"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "rgba(255,255,255,0.10)",
                opacity: 0,
              }}
              aria-hidden
            >
              {phase.number}
            </span>
            <div
              className="phase-content pt-2 sm:pt-4 flex-1 grid sm:grid-cols-[1fr_1.5fr] gap-4 sm:gap-16 items-start"
              style={{ opacity: 0 }}
            >
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#4ade80] font-medium mb-3">
                  {phase.sub}
                </p>
                <h3
                  className="font-serif font-bold text-white"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {phase.title}
                </h3>
              </div>
              <p className="text-white/45 text-sm sm:text-base leading-relaxed sm:pt-6">
                {phase.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="phase-divider h-px bg-white/10 origin-left" />
    </div>
  );
}
