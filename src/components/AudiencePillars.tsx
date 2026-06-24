import Link from "next/link";
import FadeUp from "./FadeUp";

const DECK_URL =
  "https://docs.google.com/presentation/d/1tL1Ks1ynf0iqKAC4pAPQMdxGzpug6f5SfI9T-VxEMTA/view";

const cards = [
  {
    image: "/parents-card.png",
    tag: "For Parents · mga Ginikanan",
    heading: "Future-Proof Your Child's Kinabukasan",
    body: "Our curriculum builds logical thinking, creativity, and digital fluency. The skills that define tomorrow's careers. Every session is safe, guided, and completely free.",
    large: true,
    cta: { label: "See Upcoming Classes", href: "/classes" },
  },
  {
    image: "/leaders-card.png",
    tag: "For Barangay Leaders",
    heading: "Uswag for Your Community. Zero Cost.",
    body: "Partner with us at no cost. We bring volunteers, curriculum, and devices. You provide the space.",
    large: false,
    cta: { label: "View the Partnership Deck", href: DECK_URL, external: true },
  },
  {
    image: "/volunteers-card.png",
    tag: "For Volunteers · Local & Remote",
    heading: "Show Up. Any Way You Can.",
    body: "Drive a kid to class. Teach a Zoom session from New York. Post flyers at the palengke. There's a role for every kapwa.",
    large: false,
    cta: { label: "Get Involved", href: "/volunteer" },
  },
];

export default function AudiencePillars() {
  return (
    <section id="impact" className="py-24 sm:py-32 border-b border-[#e8e3d8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <FadeUp>
          <div className="border-b border-[#e8e3d8] pb-10 mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#059669] mb-4">
              Who We Serve
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1c1a16] leading-[1.05]">
                There&apos;s a Role for Everyone
                <br />
                in This Barangay.
              </h2>
              <p className="text-[#8a8074] text-sm leading-relaxed max-w-xs sm:text-right shrink-0">
                Parent, barangay captain, remote engineer. May papel ka dito.
                This is bayanihan in action.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Bento grid */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-[1.35fr_1fr] sm:grid-rows-2 gap-3 sm:h-[700px]">
            {cards.map((card) => (
              <div
                key={card.tag}
                className={`group relative overflow-hidden rounded-3xl ${
                  card.large ? "sm:row-span-2 min-h-[420px]" : "min-h-[320px]"
                }`}
              >
                {/* Background image */}
                <img
                  src={card.image}
                  alt={card.heading}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10">
                  <p className="text-xs tracking-[0.22em] uppercase text-[#4ade80] font-semibold mb-3">
                    {card.tag}
                  </p>
                  <h3
                    className={`font-serif font-bold text-white leading-[1.05] ${
                      card.large
                        ? "text-4xl sm:text-5xl mb-4"
                        : "text-3xl sm:text-[2.25rem]"
                    }`}
                  >
                    {card.heading}
                  </h3>
                  {card.large && (
                    <p className="text-white/80 text-base leading-relaxed mt-1">
                      {card.body}
                    </p>
                  )}
                  {card.cta &&
                    (card.cta.external ? (
                      <a
                        href={card.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-5 py-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-medium tracking-wide rounded-full transition-colors backdrop-blur-sm"
                      >
                        {card.cta.label} →
                      </a>
                    ) : (
                      <Link
                        href={card.cta.href}
                        className="inline-block mt-4 px-5 py-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-medium tracking-wide rounded-full transition-colors backdrop-blur-sm"
                      >
                        {card.cta.label} →
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
