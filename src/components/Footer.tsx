import Link from "next/link";
import FadeUp from "./FadeUp";

const links = [
  { label: "About", href: "/about" },
  { label: "Classes", href: "/classes" },
  { label: "Impact", href: "/impact" },
  { label: "Volunteer", href: "/volunteer" },
  // { label: "Donate", href: "/donate" }, // hidden — shipping logistics TBD
  { label: "Contact", href: "/contact" },
];

const social = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "hello@barangayuswag.org", href: "mailto:hello@barangayuswag.org" },
];

export default function Footer() {
  return (
    <footer id="donate" className="bg-[#1c1a16] text-white">
      {/* Donate CTA band — hidden until hardware shipping logistics sorted */}
      {/* <div className="border-b border-white/10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-5 font-medium">Support the Mission</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.02] max-w-xl">Help Us Reach Every Barangay in Iloilo.</h2>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/donate" className="px-7 py-3 bg-[#059669] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#047857] transition-colors">Donate Now</Link>
              <Link href="/volunteer" className="px-7 py-3 border border-white/20 text-white/70 text-sm tracking-wide rounded-full hover:border-white/50 hover:text-white transition-colors">Volunteer with Us</Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Volunteer CTA band — replaces donate band for now */}
      <div className="border-b border-white/10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-5 font-medium">
              Get Involved
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.02] max-w-xl">
                Help Us Reach Every Barangay in Iloilo.
              </h2>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/volunteer"
                  className="px-7 py-3 bg-[#059669] text-white text-sm font-medium tracking-wide rounded-full hover:bg-[#047857] transition-colors"
                >
                  Volunteer with Us
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3 border border-white/20 text-white/70 text-sm tracking-wide rounded-full hover:border-white/50 hover:text-white transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Footer grid */}
      <div className="py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row gap-10 sm:gap-0 sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="font-serif text-lg font-bold text-white tracking-wide mb-3">
              Barangay <em>Uswag</em>
            </p>
            <p className="text-sm text-white/45 leading-relaxed">
              Free coding education for kids aged 10–16 in libraries and
              community reading centers across Iloilo City, Philippines.
            </p>
            <p className="mt-4 text-sm text-[#4ade80] font-medium">
              🇵🇭 Iloilo City, Philippines
            </p>
          </div>

          {/* Links columns — always side by side */}
          <div className="flex gap-16 sm:gap-20">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-5">
                Connect
              </p>
              <ul className="flex flex-col gap-3">
                {social.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#4ade80] font-medium tracking-wide">
          100% Volunteer Driven. 100% Free for the Community.
        </p>
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Barangay Uswag.
        </p>
      </div>
    </footer>
  );
}
