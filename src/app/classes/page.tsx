"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Archive } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Cohort } from "@/lib/types";
import FadeUp from "@/components/FadeUp";
import RegistrationModal from "@/components/RegistrationModal";

const STATUS_CONFIG = {
  upcoming: {
    label: "Registration Open",
    dot: "bg-[#059669]",
    badge: "text-[#059669] bg-[#f0fdf4] border border-[#059669]/20",
  },
  active: {
    label: "In Progress",
    dot: "bg-amber-500",
    badge: "text-amber-700 bg-amber-50 border border-amber-200",
  },
  completed: {
    label: "Completed",
    dot: "bg-[#8a8074]",
    badge: "text-[#8a8074] bg-[#f5f3ee] border border-[#e8e3d8]",
  },
};

const PHASES = [
  {
    num: 1,
    title: "Think + Design",
    sub: "Design Thinking & Community Problem",
  },
  { num: 2, title: "Plan the Build", sub: "Data Model & App Blueprint" },
  { num: 3, title: "Build", sub: "Bring the Wireframes to Life" },
  { num: 4, title: "Ipakita", sub: "Capstone · Demo Day" },
];

function CohortCard({
  cohort,
  regCount,
  onRegister,
}: {
  cohort: Cohort;
  regCount: number;
  onRegister: () => void;
}) {
  const cfg = STATUS_CONFIG[cohort.status];

  return (
    <div className="border border-[#e8e3d8] rounded-2xl overflow-hidden bg-white">
      {/* Card header */}
      <div className="relative bg-[#1c1a16] px-8 py-10">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(5,150,105,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
            <h2 className="font-serif text-3xl font-bold text-white mt-3 leading-tight">
              {cohort.name}
            </h2>
            {cohort.description && (
              <p className="text-white/50 text-sm mt-1">{cohort.description}</p>
            )}
            <p className="text-white/40 text-sm mt-2">
              {regCount === 0
                ? "No registrations yet — be the first."
                : `${regCount} kabataan registered`}
            </p>
          </div>

          {cohort.status === "upcoming" && (
            <button
              onClick={onRegister}
              className="shrink-0 self-start px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white text-sm font-medium tracking-wide rounded-full transition-colors"
            >
              Register Your Child · Libre
            </button>
          )}
          {cohort.status === "active" && (
            <span className="shrink-0 self-start px-6 py-3 bg-white/10 text-white/50 text-sm font-medium rounded-full cursor-not-allowed select-none">
              Registration Closed
            </span>
          )}
        </div>
      </div>

      {/* Details strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#e8e3d8] border-t border-[#e8e3d8]">
        {[
          {
            label: "Venue",
            value: cohort.venue || "TBD",
            muted: !cohort.venue,
          },
          {
            label: "Start Date",
            value: cohort.startDate || "TBD",
            muted: !cohort.startDate,
          },
          { label: "Ages", value: "10–18" },
          {
            label: "Sessions",
            value: cohort.sessionCount
              ? `${cohort.sessionCount} weekly`
              : "4–8 weeks",
          },
        ].map((d) => (
          <div key={d.label} className="px-6 py-4">
            <p className="text-xs tracking-[0.15em] uppercase text-[#8a8074] font-medium mb-1">
              {d.label}
            </p>
            <p
              className={`text-sm font-medium ${d.muted ? "text-[#8a8074] italic" : "text-[#1c1a16]"}`}
            >
              {d.value}
            </p>
          </div>
        ))}
      </div>

      {/* Phase list */}
      <div className="px-8 py-6 border-t border-[#e8e3d8]">
        <p className="text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium mb-4">
          What you&apos;ll learn
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PHASES.map((p) => (
            <div key={p.num} className="flex flex-col gap-1">
              <span className="font-serif text-2xl font-bold text-[#1c1a16]/10 leading-none">
                0{p.num}
              </span>
              <p className="text-sm font-medium text-[#1c1a16] leading-snug">
                {p.title}
              </p>
              <p className="text-xs text-[#8a8074]">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {cohort.status === "active" && (
        <div className="px-8 py-4 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700 leading-relaxed">
            This cohort is currently in session. Registration is closed to
            protect the foundations — every kid needs Phase 1 to build on. Check
            back when the next cohort opens.
          </p>
        </div>
      )}
    </div>
  );
}

function PastCohortCard({ cohort }: { cohort: Cohort }) {
  return (
    <div className="border border-[#e8e3d8] rounded-2xl overflow-hidden bg-white flex flex-col sm:flex-row sm:items-center justify-between px-7 py-6 gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium">
          Completed
        </span>
        <h3 className="font-serif text-xl font-bold text-[#1c1a16]">
          {cohort.name}
        </h3>
        <p className="text-sm text-[#8a8074]">
          {cohort.venue || "Iloilo City"}{" "}
          {cohort.endDate ? `· ${cohort.endDate}` : ""}
        </p>
      </div>
      <span
        className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${STATUS_CONFIG.completed.badge}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#8a8074]" />
        Completed
      </span>
    </div>
  );
}

export default function ClassesPage() {
  const [tab, setTab] = useState<"current" | "past">("current");
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [regCounts, setRegCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [regCohort, setRegCohort] = useState<Cohort | null>(null);

  useEffect(() => {
    Promise.all([
      getDocs(query(collection(db, "cohorts"), orderBy("createdAt", "desc"))),
      getDocs(collection(db, "registrations")),
    ]).then(([cohortSnap, regSnap]) => {
      setCohorts(
        cohortSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Cohort),
      );
      const counts: Record<string, number> = {};
      regSnap.docs.forEach((d) => {
        const cid = d.data().cohortId as string;
        counts[cid] = (counts[cid] ?? 0) + 1;
      });
      setRegCounts(counts);
      setLoading(false);
    });
  }, []);

  const currentCohorts = cohorts.filter((c) => c.status !== "completed");
  const pastCohorts = cohorts.filter((c) => c.status === "completed");

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
              One cohort at a time. Every seat libre.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-2xl leading-relaxed">
              Four phases over 4–8 weeks. Open to kabataan aged 10–18 across
              Iloilo City. We run one cohort at a time so every kid gets the
              full foundation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Tab toggle + content */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div className="inline-flex rounded-full border border-[#e8e3d8] bg-[#f5f3ee] p-1 mb-14">
              {(["current", "past"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-colors ${
                    tab === t
                      ? "bg-[#1c1a16] text-white"
                      : "text-[#8a8074] hover:text-[#1c1a16]"
                  }`}
                >
                  {t === "current" ? "Current" : "Past Sessions"}
                </button>
              ))}
            </div>
          </FadeUp>

          {tab === "current" && (
            <>
              {loading && (
                <div className="py-20 text-center">
                  <p className="text-[#8a8074] text-sm">Loading...</p>
                </div>
              )}
              {!loading && currentCohorts.length === 0 && (
                <FadeUp>
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    {/* Faded icon ring */}
                    <div className="relative mb-8">
                      <div className="w-28 h-28 rounded-full bg-[#f0fdf4] border-2 border-[#059669]/10 flex items-center justify-center">
                        <MapPin
                          size={48}
                          strokeWidth={1.25}
                          className="text-[#059669]/25"
                        />
                      </div>
                      {/* Outer pulse ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#059669]/8 scale-125" />
                    </div>
                    <p className="text-xs tracking-[0.3em] uppercase text-[#059669] font-medium mb-4">
                      Simula · The Beginning
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1a16] mb-4 leading-tight max-w-sm">
                      The first cohort is coming.
                    </h3>
                    <p className="text-[#8a8074] text-base max-w-xs leading-relaxed mb-8">
                      We&apos;re locking in a venue and finalizing dates. Every
                      seat will be libre. Follow us on Facebook to be first to
                      know.
                    </p>
                    <a
                      href="https://www.facebook.com/barangayuswag"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3 bg-[#1c1a16] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#3a3630] transition-colors"
                    >
                      Follow on Facebook
                    </a>
                  </div>
                </FadeUp>
              )}
              {!loading && currentCohorts.length > 0 && (
                <div className="flex flex-col gap-8">
                  {currentCohorts.map((cohort) => (
                    <FadeUp key={cohort.id}>
                      <CohortCard
                        cohort={cohort}
                        regCount={regCounts[cohort.id!] ?? 0}
                        onRegister={() => setRegCohort(cohort)}
                      />
                    </FadeUp>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === "past" && (
            <>
              {pastCohorts.length === 0 ? (
                <FadeUp>
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="relative mb-8">
                      <div className="w-28 h-28 rounded-full bg-[#f5f3ee] border-2 border-[#e8e3d8] flex items-center justify-center">
                        <Archive
                          size={48}
                          strokeWidth={1.25}
                          className="text-[#8a8074]/30"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-[#e8e3d8]/50 scale-125" />
                    </div>
                    <p className="text-xs tracking-[0.3em] uppercase text-[#8a8074] font-medium mb-4">
                      Padayon · The Road Ahead
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1a16] mb-4 leading-tight max-w-sm">
                      No past sessions yet.
                    </h3>
                    <p className="text-[#8a8074] text-base max-w-xs leading-relaxed">
                      Once the first cohort graduates, every session, every app
                      shipped, and every kid&apos;s story gets archived here.
                    </p>
                  </div>
                </FadeUp>
              ) : (
                <div className="flex flex-col gap-4">
                  {pastCohorts.map((cohort) => (
                    <FadeUp key={cohort.id}>
                      <PastCohortCard cohort={cohort} />
                    </FadeUp>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 border-t border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
              Mga Tanong · FAQ
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1a16] mb-14 max-w-xl leading-tight">
              Everything parents want to know.
            </h2>
          </FadeUp>
          <div className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
            {[
              {
                q: "Is this really free? No hidden costs?",
                a: "Yes. Every seat, every session, every device. Libre means libre. No registration fee, no materials fee, no optional costs. If it costs anything, it isn't Barangay Uswag.",
              },
              {
                q: "Does my child need a laptop or phone?",
                a: "Not required — we bring devices for every kid who needs one. But if your child has a laptop or phone, bring it. More devices means more hands-on time for everyone.",
              },
              {
                q: "What age is this for?",
                a: "Kabataan aged 10–18. No prior experience needed, no tech background required. We start from zero.",
              },
              {
                q: "Where are sessions held?",
                a: "In local barangay reading centers and public libraries across Iloilo City. The specific venue is listed on each cohort card above.",
              },
              {
                q: "How long is the program?",
                a: "4–8 weekly sessions, one cohort at a time. Each session runs approximately 3 hours. The full schedule is posted when registration opens.",
              },
              {
                q: "What if my child misses a session?",
                a: "Each phase builds on the last, so attendance matters. If your child misses one, message us on Facebook and we'll do our best to catch them up before the next session.",
              },
              {
                q: "Who is teaching?",
                a: "Kuya Patrick Ortell, founder of Barangay Uswag. 14 years building apps and mentoring founders at Techstars in the US — now teaching in Iloilo.",
              },
              {
                q: "Is this safe? Who supervises?",
                a: "Sessions run in public libraries and barangay reading centers with adult volunteers present throughout. Parents are welcome — and encouraged — to sit in at any session.",
              },
            ].map(({ q, a }) => (
              <FadeUp key={q}>
                <div>
                  <p className="font-serif text-lg font-bold text-[#1c1a16] mb-2 leading-snug">
                    {q}
                  </p>
                  <p className="text-sm text-[#8a8074] leading-relaxed">{a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
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
                  We&apos;re looking for libraries, barangay reading centers, or
                  community spaces with room for a group of kids and a few
                  laptops. Zero cost to you.
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

      {regCohort && (
        <RegistrationModal
          cohortId={regCohort.id!}
          cohortName={regCohort.name}
          onClose={() => setRegCohort(null)}
        />
      )}
    </main>
  );
}
