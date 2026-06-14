"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

const phases = [
  {
    phase: "Phase 01",
    title: "Think Like an App Builder",
    sub: "Design Thinking & Systems",
    desc: "Before writing a single line of code, kabataan learn to see how the apps they already use actually work: data, events, and systems thinking.",
    date: "Date TBD",
    time: "Time TBD",
    venue: "Looking for a space",
    ages: "10–16",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
  },
  {
    phase: "Phase 02",
    title: "Design & User Empathy",
    sub: "UI/UX & Product Design",
    desc: "User psychology, jobs to be done, and how to sketch out something people actually want to use.",
    date: "Date TBD",
    time: "Time TBD",
    venue: "Looking for a space",
    ages: "10–16",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
  },
  {
    phase: "Phase 03",
    title: "The App Code Build",
    sub: "React Native & Expo",
    desc: "Laptops open. Real code. Kabataan build a mobile app using the same tools professional developers use every day.",
    date: "Date TBD",
    time: "Time TBD",
    venue: "Looking for a space",
    ages: "10–16",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop",
  },
  {
    phase: "Phase 04",
    title: "Ipakita",
    sub: "Capstone · Demo Day",
    desc: "Every kabataan presents their app live: who it's for, what it does, how it works. In front of parents, volunteers, and community leaders. Then everyone celebrates.",
    date: "Date TBD",
    time: "Time TBD",
    venue: "Looking for a space",
    ages: "10–16",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ClassesPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#1c1a16] py-24 sm:py-32 border-b border-white/10">
        <img
          src="/classes-hero.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#0d0c0a]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium">
              Libre Workshops · Iloilo City
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
              The first cohort is coming. Seats are libre.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-2xl leading-relaxed">
              Four phases. One cohort. Open to kabataan aged 10–16 across Iloilo
              City. We&apos;re still finalizing dates and venues. Register your
              interest now and you&apos;ll hear from us first.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Tab toggle + content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Tabs */}
          <FadeUp>
            <div className="inline-flex rounded-full border border-[#e8e3d8] bg-[#f5f3ee] p-1 mb-14">
              <button
                onClick={() => setTab("upcoming")}
                className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-colors ${
                  tab === "upcoming"
                    ? "bg-[#1c1a16] text-white"
                    : "text-[#8a8074] hover:text-[#1c1a16]"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setTab("past")}
                className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-colors ${
                  tab === "past"
                    ? "bg-[#1c1a16] text-white"
                    : "text-[#8a8074] hover:text-[#1c1a16]"
                }`}
              >
                Past Sessions
              </button>
            </div>
          </FadeUp>

          {/* Upcoming */}
          {tab === "upcoming" && (
            <div className="grid gap-8 sm:grid-cols-2">
              {phases.map((cls, i) => (
                <FadeUp key={cls.phase} delay={i * 0.08}>
                  <div className="border border-[#e8e3d8] rounded-2xl overflow-hidden bg-white flex flex-col h-full">
                    {/* Card image header */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={cls.image}
                        alt=""
                        aria-hidden
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0d0c0a]/55" />
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs tracking-[0.2em] uppercase text-[#4ade80] font-medium">
                            {cls.phase}
                          </p>
                          <span className="shrink-0 inline-block text-xs font-semibold tracking-wide px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm">
                            Coming Soon
                          </span>
                        </div>
                        <div>
                          <h2 className="font-serif text-2xl font-bold text-white leading-snug">
                            {cls.title}
                          </h2>
                          <p className="text-xs text-white/60 mt-1 tracking-wide">
                            {cls.sub}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-5 flex flex-col gap-4 flex-1">
                      <p className="text-sm text-[#8a8074] leading-relaxed">
                        {cls.desc}
                      </p>
                      <div className="mt-auto pt-5 border-t border-[#e8e3d8] flex flex-col gap-3.5">
                        <Detail label="Date" icon="📅" value={cls.date} />
                        <Detail label="Time" icon="🕐" value={cls.time} />
                        <Detail label="Where" icon="📍" value={cls.venue} />
                        <Detail label="Ages" icon="🎒" value={cls.ages} />
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-6 pb-6">
                      <span className="block text-center py-3 rounded-full text-sm font-medium tracking-wide bg-[#e8e3d8] text-[#8a8074] cursor-not-allowed select-none">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          )}

          {/* Past sessions */}
          {tab === "past" && (
            <FadeUp>
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-serif text-2xl font-bold text-[#1c1a16] mb-3">
                  No past sessions yet.
                </p>
                <p className="text-[#8a8074] text-base max-w-sm leading-relaxed">
                  We&apos;re still getting started. Once the first cohort runs,
                  everything will be archived here.
                </p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#e8e3d8] py-16 sm:py-20 bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1a16] mb-2">
                  Have a space in Iloilo City?
                </h3>
                <p className="text-[#8a8074] text-sm leading-relaxed max-w-lg">
                  We&apos;re looking for our first home: a library, barangay
                  reading center, or community space with room for a group of
                  kids and a few laptops. If that&apos;s you, reach out.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 px-7 py-3.5 bg-[#1c1a16] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#3a3630] transition-colors text-center"
              >
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

function Detail({
  label,
  icon,
  value,
}: {
  label: string;
  icon: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-[#8a8074] font-medium shrink-0">
        <span className="text-sm normal-case tracking-normal">{icon}</span>
        {label}
      </span>
      <span className="text-xs text-[#1c1a16] text-right">{value}</span>
    </div>
  );
}
