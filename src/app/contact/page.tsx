import type { Metadata } from "next";
import FadeUp from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Contact — Barangay Uswag",
  description:
    "Get in touch with Barangay Uswag. Email us or find us in Iloilo City, Philippines.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Page hero */}
      <section className="bg-[#1c1a16] py-24 sm:py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium">
              Contact
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
              We&apos;d love to hear from you.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-xl leading-relaxed">
              Whether you&apos;re a parent, a potential volunteer, a local
              official, or someone who just wants to know more — reach out. We
              read and respond to every message.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact details + map */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            {/* Left: contact info */}
            <FadeUp>
              <div className="flex flex-col gap-10">
                {/* Facebook */}
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[#8a8074] font-medium mb-3">
                    Message Us
                  </p>
                  <p className="text-[#8a8074] text-sm leading-relaxed max-w-sm mb-4">
                    The fastest way to reach us is on Facebook. Send a message
                    for general inquiries, volunteer applications, hardware
                    donations, or partnership conversations.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#1565d8] text-white text-sm font-medium tracking-wide rounded-full transition-colors"
                  >
                    Message on Facebook
                  </a>
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-[#8a8074] font-medium mb-3">
                    Location
                  </p>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1a16]">
                    Iloilo City, Philippines
                  </p>
                  <p className="mt-2 text-[#8a8074] text-sm leading-relaxed max-w-sm">
                    Sessions run in local barangay reading centers and public
                    libraries across the city. Exact venues are listed on the{" "}
                    <a
                      href="/classes"
                      className="text-[#059669] hover:underline"
                    >
                      Classes page
                    </a>
                    .
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Right: map */}
            <FadeUp delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-[#e8e3d8]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126236.33835068053!2d122.47743!3d10.72023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee5802a9a5f07%3A0x4fd10e94cb3c7f5e!2sIloilo%20City!5e0!3m2!1sen!2sph!4v1"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Iloilo City map"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
