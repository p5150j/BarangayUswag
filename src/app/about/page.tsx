import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import AnimatedPhaseList from "@/components/AnimatedPhaseList";
import AnimatedOutcomeList from "@/components/AnimatedOutcomeList";

export const metadata: Metadata = {
  title: "About — Barangay Uswag",
  description:
    "Our mission, curriculum, and the story behind Barangay Uswag — free coding education for kids aged 10–18 in Iloilo City, Philippines.",
};

const phases = [
  {
    number: "01",
    title: "Think + Design",
    sub: "Design Thinking & Community Problem",
    desc: "Before a single screen is sketched, the cohort identifies a real problem in their own barangay. Design thinking and empathy mapping are the tools. The output is a wireframe that solves something real for someone they actually know. Fast, hands-on, and grounded in the community.",
  },
  {
    number: "02",
    title: "Plan the Build",
    sub: "Data Model & App Blueprint",
    desc: "The wireframes become a contract. As a class, the cohort maps out exactly what the app needs to store and do. This is the data model. Patrick takes that blueprint outside of class to scaffold the app skeleton, config, and navigation. No one hits a wall they can't see past.",
  },
  {
    number: "03",
    title: "Build",
    sub: "Bring the Wireframes to Life",
    desc: "Laptops open. The skeleton is already there. Kabataan build the visible layer: screens, buttons, colors, forms. Every piece wires back to the wireframe they drew and the data model they agreed on. They can see every design decision become real code.",
  },
  {
    number: "04",
    title: "Ipakita",
    sub: "Capstone · Demo Day",
    desc: "The working app is presented live to the barangay captain, parents, and SK officers. The community keeps it. Every kabataan holds up a phone and says 'I built this.' That deserves a party. Advanced cohorts are the door that opens next.",
  },
];

const outcomes = [
  {
    title: "A real mobile app. On their phone.",
    desc: "Every graduate leaves with a working app they designed and built themselves. Not a tutorial clone. Something they can hand to their nanay and say 'try it.'",
  },
  {
    title: "A certificate with their name on it.",
    desc: "Earned, not given. A real credential for real work. Completed in front of an audience, signed, and theirs to keep.",
  },
  {
    title: "Access to the network.",
    desc: "Graduates connect directly with working engineers from the Philippines and abroad: Zoom calls, code reviews, career conversations. Real relationships, not a mailing list.",
  },
  {
    title: "The ladder keeps going.",
    desc: "Phase 2 cohorts go deeper: backend APIs, databases, and publishing to the app store. Kabataan who want to go further have somewhere to go. No dead ends.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#1c1a16] py-24 sm:py-32 border-b border-white/10">
        {/* Background photo */}
        <img
          src="https://images.unsplash.com/photo-1773332611514-238856b76198?q=80&w=1934&auto=format&fit=crop"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0d0c0a]/78" />
        {/* Ambient green glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 15% 60%, rgba(5,150,105,0.14) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 85% 20%, rgba(74,222,128,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: "overlay",
          }}
        />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0c0a]/60 to-transparent pointer-events-none" />
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium">
              Our Mission
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              Iloilo&apos;s kabataan are ready to build the future. We&apos;re
              here to make sure nothing gets in the way.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-2xl leading-relaxed">
              Coding is the literacy of the 21st century. The key to
              kinabukasan. Barangay Uswag exists to make sure geography and
              access never slow anyone down.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Curriculum */}
      <section className="relative bg-[#1c1a16] py-20 sm:py-28 border-b border-white/10 overflow-hidden">
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            mixBlendMode: "overlay",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-4 font-medium">
              Curriculum
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl">
              Zero experience. Four phases. One real app built for the
              community, by the community.
            </h2>
            <p className="text-white/45 text-base max-w-xl leading-relaxed mb-0">
              No prerequisites, no laptop required, no experience needed. The
              cohort builds one shared app together — something their barangay
              will actually use after Demo Day.
            </p>
          </FadeUp>
          <AnimatedPhaseList phases={phases} />
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#f5f3ee] py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div className="sm:text-right">
              <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
                What Kabataan Leave With
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1a16] leading-tight max-w-2xl sm:ml-auto">
                More than a certificate.
                <br />A new identity.
              </h2>
            </div>
          </FadeUp>

          <AnimatedOutcomeList outcomes={outcomes} />
        </div>
      </section>

      {/* What comes next — split */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-start">
            <FadeUp>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/about-next.png"
                  alt="Demo day — kabataan presenting their app"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <div className="lg:pt-6 space-y-5 text-base text-[#8a8074] leading-[1.85]">
                <p className="text-xs tracking-[0.35em] uppercase text-[#059669] font-medium">
                  What Comes Next
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1a16] leading-[1.05]">
                  The ladder doesn&apos;t stop at the workshop.
                </h2>
                <p className="text-[#1c1a16] text-lg font-medium leading-relaxed">
                  Barangay Uswag is building a progression, not a one-time
                  event. The workshop is just the simula.
                </p>
                <p>
                  Advanced cohorts for graduates go deeper: backend APIs,
                  databases, and publishing to the app store. Kids who complete
                  the program have a clear path forward. No dead ends.
                </p>
                <p>
                  Regional hackathons will let kabataan compete, collaborate,
                  and pitch ideas to local government officials and community
                  leaders. We&apos;re already in early conversations with the
                  Iloilo City Government about hosting the first one in 2027.
                </p>
                <p>
                  Our mentorship pipeline connects promising graduates with
                  working engineers: Filipino expats, Techstars alumni, and
                  engineers from companies that care about equitable access.
                  Zoom calls, code reviews, career guidance. Real relationships,
                  not just inspiration. Kapwa taking care of kapwa.
                </p>
                <div className="pt-4 border-t border-[#e8e3d8]">
                  <Link
                    href="/classes"
                    className="inline-block px-7 py-3 bg-[#1c1a16] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#3a3630] transition-colors"
                  >
                    See Upcoming Classes
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Origin story — split reversed */}
      <section className="py-20 sm:py-28 bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-start">
            <FadeUp delay={0.12}>
              <div className="lg:pt-6 space-y-5 text-base text-[#8a8074] leading-[1.85]">
                <p className="text-xs tracking-[0.35em] uppercase text-[#059669] font-medium">
                  The Origin
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1a16] leading-[1.05]">
                  He came to stay. The city taught him how.
                </h2>
                <p className="text-[#1c1a16] text-lg font-medium leading-relaxed">
                  When Patrick moved to Iloilo City, he wasn&apos;t passing
                  through. He wanted to build a life here. The city got under
                  his skin fast. The palengke rhythms, the barkada culture,
                  neighbors who called out to him before he learned their names.
                </p>
                <p>
                  He noticed the expat trap early: a comfortable life in the
                  bubble, surrounded by familiar faces, living in a city you
                  never quite belong to. He didn&apos;t want that. So he leaned
                  the other way.
                </p>
                <p>
                  Filipino values became his map. Not <em>kapwa</em> as a
                  concept, but as practice. What it actually means to treat your
                  neighbor as not separate from yourself. <em>Pakikisama</em>{" "}
                  not as compliance, but as genuine presence. He was learning
                  from people who had been living these values long before he
                  arrived, and it changed what he thought he was here to do.
                </p>
                <p>
                  The skills were already there. Fourteen years in the American
                  startup world, mentoring founders at Techstars, real expertise
                  in mobile apps and product development. The question was how
                  to share them as a neighbor, not a benefactor. Barangay Uswag
                  is the answer.
                </p>
                <div className="pt-4 border-t border-[#e8e3d8]">
                  <Link
                    href="/volunteer"
                    className="inline-block px-7 py-3 bg-[#059669] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#047857] transition-colors"
                  >
                    Join the Effort
                  </Link>
                </div>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1742&auto=format&fit=crop"
                  alt="Iloilo City"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
