import FadeUp from "./FadeUp";

const pillars = [
  {
    num: "01",
    heading: "Libre. Always.",
    body: "Every session, every device, every seat. No fees, no conditions, no exceptions. That's the promise.",
  },
  {
    num: "02",
    heading: "Bayanihan, not charity.",
    body: "We work inside the libraries and reading centers these kids already trust — no new infrastructure, just community showing up for itself.",
  },
  {
    num: "03",
    heading: "Padayon — built to scale.",
    body: "Our curriculum and volunteer model is designed to replicate from Lapuz to Jaro to Molo and every barangay in between.",
  },
];

export default function TheStory() {
  return (
    <section id="about" className="border-b border-[#e8e3d8]">
      {/* Pull-quote band — photo background with dark filter */}
      <div className="relative overflow-hidden py-36 sm:py-52">
        <img
          src="/mission-bg.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-[#0d0c0a]/72" />
        {/* Vignette — darkens edges, keeps centre clean */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(13,12,10,0.55) 100%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-8 font-medium">
              Our Mission
            </p>
            <blockquote className="font-sans font-bold italic text-white">
              <span
                style={{
                  fontSize: "clamp(1.5rem, 3.2vw, 3.5rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                When our kabataan learn to build with technology, the whole
                bayan thrives. Uswag isn&apos;t given. It&apos;s built. This is
                bayanihan for the digital age.
              </span>
            </blockquote>
          </FadeUp>
        </div>
      </div>

      {/* Editorial story block */}
      <div className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Opening hook */}
          <FadeUp>
            <p className="text-xs tracking-[0.3em] uppercase text-[#059669] mb-6">
              Our Story
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1c1a16] leading-[1.02] max-w-3xl mb-16 sm:mb-20">
              Still learning. Showing up anyway.
            </h2>
          </FadeUp>

          {/* Photo + story grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-start">
            {/* Left: photo */}
            <FadeUp>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img
                    src="/story-photo.png"
                    alt="Children learning together"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-xs text-[#8a8074] tracking-wide">
                  Iloilo City, Philippines
                </p>
              </div>
            </FadeUp>

            {/* Right: copy */}
            <FadeUp delay={0.12}>
              <div
                id="volunteer"
                className="lg:pt-6 space-y-5 text-base text-[#8a8074] leading-[1.85]"
              >
                <p className="text-[#1c1a16] text-lg sm:text-xl font-medium leading-relaxed">
                  Patrick Ortell, known as Kuya Patrick to the kabataan in the
                  program, has lived in Iloilo long enough to know one thing:
                  the skills that gave him a good life are exactly the skills
                  these kids deserve access to.
                </p>
                <p>
                  Fourteen years in the American startup world: apps, companies,
                  communities, and time as a{" "}
                  <a
                    href="https://www.techstars.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#059669] hover:underline"
                  >
                    Techstars
                  </a>{" "}
                  mentor helping founders build from zero. Technology opened
                  doors for him. He wants the same doors open for the kabataan
                  who live on his street.
                </p>
                <p>
                  But how you show up matters as much as what you bring.
                  Filipino culture taught him that. <em>Kapwa</em>: you and I
                  are not separate. <em>Pakikisama</em>: belonging through
                  presence, not distance. <em>Pagmamalasakit</em>: care that
                  does something real. Barangay Uswag is his attempt to live
                  those values and share the skills that changed his life while
                  doing it.
                </p>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-[#059669] pl-6 py-1 my-8">
                  <p className="font-serif text-xl text-[#1c1a16] font-bold leading-snug italic">
                    &ldquo;These skills built my life. My neighbors&apos; kids
                    deserve the same shot. That&apos;s the whole story.&rdquo;
                  </p>
                </blockquote>

                <p>
                  Every seat is libre. No fees, no conditions, no exceptions. If
                  you&apos;re a parent, a volunteer, or a fellow expat who wants
                  to do something real, you already belong here.
                </p>

                <div className="pt-5 flex flex-wrap gap-3 border-t border-[#e8e3d8]">
                  <a
                    href="/volunteer"
                    className="px-7 py-3 bg-[#059669] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#047857] transition-colors"
                  >
                    Volunteer with Us
                  </a>
                  <a
                    href="/classes"
                    className="px-7 py-3 bg-[#1c1a16] text-[#faf9f6] text-sm font-medium tracking-wide rounded-full hover:bg-[#3a3630] transition-colors"
                  >
                    Find a Workshop
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* Why it matters strip */}
      <div className="bg-[#1c1a16] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col divide-y divide-white/10">
            {pillars.map(({ num, heading, body }, i) => (
              <FadeUp key={num} delay={i * 0.08}>
                <div className="flex items-start gap-8 sm:gap-16 py-10 sm:py-12">
                  <span
                    className="font-serif font-bold text-white/10 leading-none shrink-0 select-none"
                    style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
                    aria-hidden
                  >
                    {num}
                  </span>
                  <div className="pt-2 sm:pt-4">
                    <h3
                      className="font-serif font-bold text-white mb-3"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                    >
                      {heading}
                    </h3>
                    <p className="text-white/45 text-sm sm:text-base leading-relaxed max-w-xl">
                      {body}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
