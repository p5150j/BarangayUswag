import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Donate — Barangay Uswag",
  description:
    "Donate hardware or funds to Barangay Uswag. Every laptop or tablet donated directly enables a child's seat in our free coding workshops.",
};

const wishlist = [
  {
    priority: "Most Needed",
    priorityColor: "#059669",
    icon: "💻",
    item: "Laptops",
    spec: "Windows or Mac · 4 GB+ RAM · Working keyboard & screen",
  },
  {
    priority: "Needed",
    priorityColor: "#1c1a16",
    icon: "📱",
    item: "Tablets",
    spec: "iPad or Android · Any generation · Working condition",
  },
  {
    priority: "Always Useful",
    priorityColor: "#8a8074",
    icon: "🖱️",
    item: "Mice, Keyboards & Cables",
    spec: "USB or wireless · Charging cables of any type",
  },
  {
    priority: "Nice to Have",
    priorityColor: "#8a8074",
    icon: "🎧",
    item: "Working Headphones",
    spec: "Wired or wireless · Any condition that functions",
  },
];

export default function DonatePage() {
  return (
    <main>
      {/* Page hero */}
      <section className="bg-[#1c1a16] py-24 sm:py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium">
              Support the Mission
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
              We Run on Donated Hardware.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-2xl leading-relaxed">
              We don&apos;t charge kids. We don&apos;t charge families. We
              don&apos;t have venture funding. What we have is a community of
              people who believe that access to technology education
              shouldn&apos;t be a privilege — and who put old laptops to work
              proving it.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Honest explanation */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl">
            <FadeUp>
              <p className="text-[#1c1a16] text-lg sm:text-xl leading-relaxed mb-6">
                Every device donated directly enables a child&apos;s seat in our
                workshops. A working laptop that&apos;s been sitting in your
                drawer for two years becomes the tool a kid in Lapuz or Jaro
                uses to build their first webpage — something they created,
                something they own.
              </p>
              <p className="text-[#8a8074] text-base leading-relaxed">
                We refurbish devices as needed, wipe them clean, install the
                necessary software, and deploy them to sessions. When a cohort
                ends, devices are stored securely and reused for the next one.
                Nothing is wasted.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Hardware wishlist */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8] bg-[#f5f3ee]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
              Hardware Wishlist
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1a16] leading-tight mb-14 max-w-xl">
              What we need most.
            </h2>
          </FadeUp>

          <div className="grid gap-5 sm:grid-cols-2">
            {wishlist.map((item, i) => (
              <FadeUp key={item.item} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-8 flex gap-6 border border-[#e8e3d8] h-full">
                  <span className="text-4xl shrink-0">{item.icon}</span>
                  <div>
                    <span
                      className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-2 px-2.5 py-1 rounded-full"
                      style={{
                        color: item.priorityColor,
                        backgroundColor:
                          item.priorityColor === "#059669"
                            ? "#dcfce7"
                            : "#f5f3ee",
                      }}
                    >
                      {item.priority}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1c1a16] mb-1">
                      {item.item}
                    </h3>
                    <p className="text-[#8a8074] text-sm leading-relaxed">
                      {item.spec}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping address */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeUp>
              <p className="text-xs tracking-[0.35em] uppercase text-[#059669] mb-4 font-medium">
                Ship It
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1c1a16] leading-tight mb-6">
                Send hardware directly to us.
              </h2>
              <p className="text-[#8a8074] text-base leading-relaxed mb-8">
                Box it up, slap a label on it, drop it at your nearest courier.
                We accept shipments via LBC, JRS, J&amp;T, DHL, FedEx, and USPS.
                Email us first if you&apos;re shipping internationally and
                we&apos;ll help coordinate.
              </p>
              <Link
                href="#"
                className="inline-block px-7 py-3.5 bg-[#1c1a16] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#3a3630] transition-colors"
              >
                Print Shipping Label
              </Link>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-[#f5f3ee] rounded-2xl p-8 sm:p-10 border border-[#e8e3d8] font-mono">
                <p className="text-xs tracking-[0.25em] uppercase text-[#8a8074] mb-6">
                  Shipping Address
                </p>
                <address className="not-italic space-y-1 text-[#1c1a16] text-sm sm:text-base leading-relaxed">
                  <p className="font-semibold text-base sm:text-lg not-italic">
                    Barangay Uswag
                  </p>
                  <p>Attn: Patrick Ortell</p>
                  <p className="text-[#8a8074]">
                    [SHIPPING ADDRESS — PLACEHOLDER]
                  </p>
                  <p>Iloilo City, 5000</p>
                  <p>Philippines</p>
                </address>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Monetary donations */}
      <section className="py-20 sm:py-28 bg-[#1c1a16]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-4 font-medium">
                Can&apos;t Ship Hardware?
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
                A monetary donation goes just as far.
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10">
                Cash donations cover device refurbishment costs, workshop
                supplies, printing, and volunteer coordination. Every peso goes
                directly into the program — we have zero paid staff and zero
                overhead expenses beyond what it takes to run sessions.
              </p>
              <Link
                href="#"
                className="inline-block px-7 py-3.5 bg-[#059669] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#047857] transition-colors"
              >
                Donate Monetarily
              </Link>
              <p className="mt-8 text-white/35 text-xs leading-relaxed max-w-lg">
                All donations are used directly for the program. We are a 100%
                volunteer-run organization. Financial records are available upon
                request.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
