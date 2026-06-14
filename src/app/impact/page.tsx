"use client";

import { useEffect, useRef, useState } from "react";
import FadeUp from "@/components/FadeUp";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  type TooltipProps,
} from "recharts";

// ── Brand tokens ──────────────────────────────────────────────────────────────

const GREEN = "#059669";
const GREEN_LIGHT = "#4ade80";
const MUTED_BG = "#e8e3d8";
const INK = "#1c1a16";
const MUTED = "#8a8074";

// ── Data ──────────────────────────────────────────────────────────────────────

const metrics = [
  {
    value: 47,
    label: "Kabataan Served",
    note: "3 cohorts · 2 barangays",
    trend: [{ v: 10 }, { v: 26 }, { v: 47 }],
  },
  {
    value: 41,
    label: "Apps Shipped",
    note: "87% completion rate",
    trend: [{ v: 8 }, { v: 22 }, { v: 41 }],
  },
  {
    value: 218,
    label: "Volunteer Hours",
    note: "8 active mentors",
    trend: [{ v: 60 }, { v: 134 }, { v: 218 }],
  },
  {
    value: 2,
    label: "Barangays Reached",
    note: "Lapuz · Jaro",
    trend: [{ v: 1 }, { v: 1 }, { v: 2 }],
  },
];

const cohorts = [
  { label: "Cohort 1", Enrolled: 12, Graduated: 10 },
  { label: "Cohort 2", Enrolled: 18, Graduated: 16 },
  { label: "Cohort 3", Enrolled: 17, Graduated: 15 },
];

const ages = [
  { range: "10–11", pct: 17 },
  { range: "12–13", pct: 40 },
  { range: "14–15", pct: 30 },
  { range: "16", pct: 13 },
];

const genderData = [
  { name: "Female", value: 38 },
  { name: "Male", value: 62 },
];

const barangays = [
  { name: "Lapuz", pct: 60 },
  { name: "Jaro", pct: 40 },
];

const dimensions = [
  {
    num: "01",
    title: "Direct Educational Reach",
    desc: "Students who complete the full 4-phase curriculum and ship a working mobile app. Our primary headline metric.",
    formula: "Phase 4 graduates ÷ Phase 1 enrollments",
  },
  {
    num: "02",
    title: "Digital Skills Density",
    desc: "Quantifiable artifacts each graduate produces: working app, design screens, lines of code committed.",
    formula: "Apps shipped × complexity score (1–5 rubric)",
  },
  {
    num: "03",
    title: "Economic Opportunity Unlocked",
    desc: "Estimated wage premium for digital literacy in the Philippine job market, projected over a 10-year horizon.",
    formula: "Graduates × ₱ estimated annual wage lift",
  },
  {
    num: "04",
    title: "Community Multiplier",
    desc: "Graduates who go on to mentor peers, share skills with family members, or contribute to open-source projects.",
    formula: "Tracked annually via alumni survey",
  },
  {
    num: "05",
    title: "Network Capital",
    desc: "Industry connections made, mentors assigned, and internships or jobs secured through the Barangay Uswag network.",
    formula: "Mentors × active connections + tracked placements",
  },
];

const gallery = [
  "/gallery-6.png",
  "/gallery-2.png",
  "/gallery-3.png",
  "/gallery-4.png",
  "/gallery-5.png",
  "/gallery-1.png",
];

// ── Shared tooltip ────────────────────────────────────────────────────────────

function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: INK,
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
        color: "#faf9f6",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {label && (
        <p
          style={{
            color: MUTED,
            marginBottom: 4,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </p>
      )}
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color ?? "#fff", fontWeight: 600 }}>
          {p.name}:{" "}
          <span style={{ color: "#faf9f6", fontWeight: 400 }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ── Count-up hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, display };
}

// ── Sparkline ─────────────────────────────────────────────────────────────────

function Sparkline({ data, idx }: { data: { v: number }[]; idx: number }) {
  const gradId = `sg${idx}`;
  return (
    <ResponsiveContainer width="100%" height={52}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GREEN_LIGHT} stopOpacity={0.3} />
            <stop offset="100%" stopColor={GREEN_LIGHT} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={GREEN_LIGHT}
          strokeWidth={1.5}
          fill={`url(#${gradId})`}
          dot={false}
          animationDuration={1200}
          animationBegin={300}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Metric card ───────────────────────────────────────────────────────────────

function MetricCard({
  metric,
  idx,
  delay,
}: {
  metric: (typeof metrics)[0];
  idx: number;
  delay: number;
}) {
  const { ref, display } = useCountUp(metric.value);
  return (
    <FadeUp delay={delay}>
      <div ref={ref} className="px-7 py-10 flex flex-col gap-5">
        <span className="font-serif text-5xl sm:text-6xl font-bold text-white leading-none tabular-nums">
          {display}
        </span>
        <Sparkline data={metric.trend} idx={idx} />
        <div className="border-t border-white/10 pt-4">
          <p className="text-sm font-medium text-white/80">{metric.label}</p>
          <p className="text-xs text-white/40 mt-1">{metric.note}</p>
        </div>
      </div>
    </FadeUp>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ImpactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main>
      {/* Hero + metrics — one unified dark band */}
      <section className="relative overflow-hidden bg-[#1c1a16] border-b border-white/10">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1934&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#0d0c0a]/80" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 80% 40%, rgba(5,150,105,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-24 sm:pt-32">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium">
              The Data Room
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
              We measure what matters. And we show our work.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-2xl leading-relaxed">
              Every metric, every methodology, every session. Documented and
              publicly accessible. This is what accountability looks like before
              it&apos;s required.
            </p>
          </FadeUp>
        </div>

        {/* KPI strip — anchored at the bottom of the band */}
        <div className="relative z-10 mt-16 sm:mt-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
              {mounted &&
                metrics.map((m, i) => (
                  <MetricCard
                    key={m.label}
                    metric={m}
                    idx={i}
                    delay={i * 0.1}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simulated data banner — sticky under nav */}
      <div className="sticky top-16 z-40 bg-[#fef3c7] border-b border-[#fde68a] px-6 sm:px-10 py-3.5">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
          <span className="text-amber-600 font-semibold text-sm shrink-0">
            Simulated Data
          </span>
          <p className="text-amber-800 text-sm leading-relaxed">
            Everything you see here is simulated, built to show what this data
            room will look like once real sessions begin. When we run our first
            cohort, this becomes live.
          </p>
        </div>
      </div>

      {/* Charts row 1: cohort enrollment + age distribution */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Cohort enrollment — grouped bar chart */}
            <FadeUp>
              <p className="text-xs tracking-[0.3em] uppercase text-[#059669] font-medium mb-3">
                Enrollment by Cohort
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#1c1a16] mb-10">
                Enrolled vs. Graduated
              </h2>
              {mounted && (
                <>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={cohorts}
                      barGap={4}
                      barCategoryGap="35%"
                      margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke={MUTED_BG}
                        strokeDasharray="4 4"
                      />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: MUTED,
                          fontSize: 11,
                          fontFamily: "inherit",
                        }}
                      />
                      <YAxis hide domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} />
                      <Tooltip content={<ChartTooltip />} cursor={false} />
                      <Bar
                        dataKey="Enrolled"
                        fill={MUTED_BG}
                        radius={[4, 4, 0, 0]}
                        animationDuration={800}
                      />
                      <Bar
                        dataKey="Graduated"
                        fill={GREEN}
                        radius={[4, 4, 0, 0]}
                        animationDuration={800}
                        animationBegin={150}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-5 mt-5 pt-4 border-t border-[#e8e3d8]">
                    <span className="flex items-center gap-1.5 text-xs text-[#8a8074]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#e8e3d8] inline-block" />
                      Enrolled
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8a8074]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#059669] inline-block" />
                      Graduated
                    </span>
                  </div>
                </>
              )}
            </FadeUp>

            {/* Age distribution — horizontal bar chart */}
            <FadeUp delay={0.1}>
              <p className="text-xs tracking-[0.3em] uppercase text-[#059669] font-medium mb-3">
                Age Distribution
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#1c1a16] mb-10">
                Kabataan by Age Group
              </h2>
              {mounted && (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={ages}
                    layout="vertical"
                    barCategoryGap="30%"
                    margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      horizontal={false}
                      stroke={MUTED_BG}
                      strokeDasharray="4 4"
                    />
                    <XAxis
                      type="number"
                      hide
                      domain={[0, 50]}
                      ticks={[0, 10, 20, 30, 40, 50]}
                    />
                    <YAxis
                      dataKey="range"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: MUTED,
                        fontSize: 12,
                        fontFamily: "inherit",
                      }}
                      width={44}
                    />
                    <Tooltip content={<ChartTooltip />} cursor={false} />
                    <Bar
                      dataKey="pct"
                      name="Share"
                      fill={GREEN}
                      radius={[0, 4, 4, 0]}
                      animationDuration={800}
                      label={{
                        position: "right",
                        formatter: (v: number) => `${v}%`,
                        fill: MUTED,
                        fontSize: 11,
                        fontFamily: "inherit",
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Charts row 2: gender + barangay */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8] bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Gender split — donut chart */}
            <FadeUp>
              <p className="text-xs tracking-[0.3em] uppercase text-[#059669] font-medium mb-3">
                Gender Split
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#1c1a16] mb-10">
                Participation by Gender
              </h2>
              {mounted && (
                <>
                  <div className="relative">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart style={{ outline: "none" }}>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={72}
                          outerRadius={100}
                          paddingAngle={3}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={900}
                          strokeWidth={0}
                          activeShape={{ outerRadius: 100 }}
                        >
                          <Cell fill={GREEN_LIGHT} />
                          <Cell fill={GREEN} />
                        </Pie>
                        <Tooltip
                          content={<ChartTooltip />}
                          wrapperStyle={{ outline: "none" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="font-serif text-3xl font-bold text-[#1c1a16] leading-none">
                        62%
                      </span>
                      <span className="text-xs text-[#8a8074] mt-1 tracking-wide">
                        Male
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <span className="flex items-center gap-1.5 text-xs text-[#8a8074]">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ background: GREEN_LIGHT }}
                      />
                      Female · 38%
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#8a8074]">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ background: GREEN }}
                      />
                      Male · 62%
                    </span>
                  </div>
                  <p className="text-xs text-[#8a8074] mt-5 leading-relaxed max-w-sm mx-auto text-center">
                    Sessions are open to all kabataan. The program reflects the
                    communities it runs in.
                  </p>
                </>
              )}
            </FadeUp>

            {/* Barangay reach — horizontal bar chart */}
            <FadeUp delay={0.1}>
              <p className="text-xs tracking-[0.3em] uppercase text-[#059669] font-medium mb-3">
                Geographic Reach
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#1c1a16] mb-10">
                Students by Barangay
              </h2>
              {mounted && (
                <>
                  <ResponsiveContainer width="100%" height={130}>
                    <BarChart
                      data={barangays}
                      layout="vertical"
                      barCategoryGap="30%"
                      margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        horizontal={false}
                        stroke={MUTED_BG}
                        strokeDasharray="4 4"
                      />
                      <XAxis
                        type="number"
                        hide
                        domain={[0, 70]}
                        ticks={[0, 20, 40, 60]}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: MUTED,
                          fontSize: 12,
                          fontFamily: "inherit",
                        }}
                        width={48}
                      />
                      <Tooltip content={<ChartTooltip />} cursor={false} />
                      <Bar
                        dataKey="pct"
                        name="Share"
                        fill={GREEN}
                        radius={[0, 4, 4, 0]}
                        animationDuration={800}
                        label={{
                          position: "right",
                          formatter: (v: number) => `${v}%`,
                          fill: MUTED,
                          fontSize: 11,
                          fontFamily: "inherit",
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-[#8a8074] mt-6 leading-relaxed max-w-sm">
                    Target expansion: Lapuz · Jaro · Molo · Arevalo · City
                    Proper. One cohort per barangay per year.
                  </p>
                </>
              )}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Session gallery — bento grid */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8] bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
              Session Gallery
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1a16] leading-tight mb-14 max-w-2xl">
              What it looks like in the room.
            </h2>
          </FadeUp>

          <FadeUp>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
              style={{ gridAutoRows: "200px" }}
            >
              <div className="sm:col-span-2 sm:row-span-2 overflow-hidden rounded-2xl">
                <img
                  src={gallery[0]}
                  alt=""
                  aria-hidden
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {gallery.slice(1).map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl">
                  <img
                    src={src}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-[#8a8074] mt-4">
              Placeholder images. These will be replaced with real session
              photos when the first cohort runs.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Impact methodology */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
              Impact Methodology
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1a16] leading-tight mb-4 max-w-2xl">
              Five dimensions. All open.
            </h2>
            <p className="text-[#8a8074] text-base max-w-xl mb-16 leading-relaxed">
              We publish our measurement methodology so donors, community
              partners, and local government can hold us to it. Every formula is
              documented in the linked spreadsheets below.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 pr-6 text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium border-b border-[#e8e3d8] w-10">
                      #
                    </th>
                    <th className="text-left py-3 pr-8 text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium border-b border-[#e8e3d8]">
                      Dimension
                    </th>
                    <th className="text-left py-3 pr-8 text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium border-b border-[#e8e3d8] hidden sm:table-cell">
                      Formula
                    </th>
                    <th className="text-right py-3 text-xs tracking-[0.2em] uppercase text-[#8a8074] font-medium border-b border-[#e8e3d8]">
                      Doc
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dimensions.map((d) => (
                    <tr
                      key={d.num}
                      className="border-b border-[#e8e3d8] hover:bg-[#f5f3ee] transition-colors"
                    >
                      <td className="py-5 pr-6 font-serif font-bold text-[#1c1a16]/15 text-2xl leading-none align-top">
                        {d.num}
                      </td>
                      <td className="py-5 pr-8 align-top">
                        <p className="font-medium text-[#1c1a16] mb-1">
                          {d.title}
                        </p>
                        <p className="text-xs text-[#8a8074] leading-relaxed max-w-xs">
                          {d.desc}
                        </p>
                      </td>
                      <td className="py-5 pr-8 align-middle hidden sm:table-cell">
                        <code className="text-xs text-[#059669] font-mono bg-[#f0fdf4] px-2 py-1 rounded whitespace-nowrap">
                          {d.formula}
                        </code>
                      </td>
                      <td className="py-5 align-top text-right">
                        <span className="text-xs text-[#8a8074] whitespace-nowrap">
                          Link coming soon
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Building in public */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
                Building in Public
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1a16] mb-6">
                Honest from day one.
              </h2>
              <p className="text-[#8a8074] text-base leading-relaxed">
                The numbers above are simulated projections. They show what this
                dashboard will look like once sessions begin. We&apos;re
                publishing the methodology now so the community can see exactly
                how we plan to measure impact before we&apos;ve earned the right
                to report it. When the first cohort runs, the data updates. No
                spin, no lag.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
