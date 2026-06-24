import Hero from "@/components/Hero";
import AudiencePillars from "@/components/AudiencePillars";
import TheStory from "@/components/TheStory";
import FadeUp from "@/components/FadeUp";

const DECK_URL =
  "https://docs.google.com/presentation/d/1tL1Ks1ynf0iqKAC4pAPQMdxGzpug6f5SfI9T-VxEMTA/view";

const mandates = [
  {
    acronym: "DICT",
    label: "RA 11927",
    desc: "National ICT Competency Standard",
  },
  {
    acronym: "DepEd",
    label: "MATATAG Curriculum",
    desc: "Digital Literacy Integration",
  },
  {
    acronym: "SK",
    label: "RA 10742",
    desc: "Sangguniang Kabataan Reform Act",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />
      <AudiencePillars />

      {/* Mandate alignment + first partner CTA */}
      <section className="bg-[#f5f3ee] border-b border-[#e8e3d8] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — mandate alignment */}
            <FadeUp>
              <p className="text-xs tracking-[0.35em] uppercase text-[#8a8074] font-medium mb-6">
                Mandate Alignment
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1a16] leading-tight mb-4">
                Built to support what the government already requires.
              </h2>
              <p className="text-[#8a8074] text-sm leading-relaxed mb-10 max-w-md">
                Barangay Uswag directly supports three active national mandates.
                Hosting a session isn&apos;t just community work — it&apos;s
                mandate compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {mandates.map((m) => (
                  <div
                    key={m.acronym}
                    className="flex-1 border border-[#e8e3d8] rounded-xl p-5 bg-white relative overflow-hidden"
                  >
                    {/* Stamp ring */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border-2 border-[#e8e3d8] opacity-40" />
                    <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#8a8074] mb-2">
                      Aligned
                    </p>
                    <p className="font-mono text-2xl font-bold text-[#1c1a16] tracking-tight mb-1">
                      {m.acronym}
                    </p>
                    <p className="font-mono text-[10px] tracking-widest text-[#059669] uppercase mb-3">
                      {m.label}
                    </p>
                    <div className="w-6 border-t border-[#e8e3d8] mb-3" />
                    <p className="font-mono text-[10px] text-[#8a8074] leading-relaxed uppercase tracking-wide">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right — first partner CTA */}
            <FadeUp delay={0.12}>
              <div className="bg-[#1c1a16] rounded-2xl p-10">
                <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] font-medium mb-4">
                  Venue Partners
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                  Be the first library or reading center in Iloilo to host a
                  session.
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-8">
                  We bring the volunteers, curriculum, and devices. You provide
                  the space. Zero cost. Lasting impact. The first partner gets
                  named in every session, every post, and every report we
                  publish.
                </p>
                <a
                  href={DECK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3 bg-[#059669] hover:bg-[#047857] text-white text-sm font-medium tracking-wide rounded-full transition-colors"
                >
                  View the Partnership Deck →
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <TheStory />
    </main>
  );
}
