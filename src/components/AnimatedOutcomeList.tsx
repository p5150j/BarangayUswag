"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Outcome = {
  title: string;
  desc: string;
};

export default function AnimatedOutcomeList({
  outcomes,
}: {
  outcomes: Outcome[];
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".outcome-divider", listRef.current)
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
        .toArray<HTMLElement>(".outcome-row", listRef.current)
        .forEach((row) => {
          const content = row.querySelector<HTMLElement>(".outcome-content");
          const num = row.querySelector<HTMLElement>(".outcome-num");

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          }

          if (num) {
            gsap.fromTo(
              num,
              { opacity: 0, x: 32 },
              {
                opacity: 1,
                x: 0,
                duration: 0.85,
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
      {outcomes.map((outcome, i) => (
        <div key={outcome.title}>
          <div className="outcome-divider h-px bg-[#e8e3d8] origin-left" />
          <div className="outcome-row flex items-start gap-8 sm:gap-16 py-10 sm:py-12">
            <div
              className="outcome-content pt-2 sm:pt-4 flex-1 grid sm:grid-cols-[1fr_1.5fr] gap-4 sm:gap-16 items-start"
              style={{ opacity: 0 }}
            >
              <h3
                className="font-serif font-bold text-[#1c1a16]"
                style={{ fontSize: "clamp(1.35rem, 2.5vw, 2rem)" }}
              >
                {outcome.title}
              </h3>
              <p className="text-[#8a8074] text-sm sm:text-base leading-relaxed sm:pt-5">
                {outcome.desc}
              </p>
            </div>
            <span
              className="outcome-num font-serif font-bold leading-none shrink-0 select-none"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                color: "rgba(28,26,22,0.07)",
                opacity: 0,
              }}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      ))}
      <div className="outcome-divider h-px bg-[#e8e3d8] origin-left" />
    </div>
  );
}
