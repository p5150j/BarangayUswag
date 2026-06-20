import type { Metadata } from "next";
import FadeUp from "@/components/FadeUp";
import VolunteerCTA from "@/components/VolunteerCTA";

export const metadata: Metadata = {
  title: "Volunteer — Barangay Uswag",
  description:
    "Volunteer with Barangay Uswag in Iloilo City or remotely. Every role matters — from driving kids to sessions to building our curriculum.",
};

const localRoles = [
  {
    emoji: "🛺",
    title: "Manong Drivers & Kuya with Cars",
    body: "Know a trike driver? Got a multicab? Help coordinate rides for kids whose families can't make the trip. Damo gid salamat sa inyo.",
  },
  {
    emoji: "🍱",
    title: "Nanay Snack Brigade",
    body: "Three hours is a long time for hungry kids. Bring pandesal, puto, merienda, whatever your specialty is. The kids (and the volunteers) will love you for it.",
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Lolo, Lola, Tita, Tito — Chaperones",
    body: "Family is the backbone of every barangay. Sit in, keep the kids focused, and make the room feel like home. Your presence matters more than you think.",
  },
  {
    emoji: "🗣️",
    title: "Hiligaynon Translators",
    body: "When a concept clicks in Hiligaynon, it clicks differently. Help us bridge the gap, especially for the younger kids still building their English confidence.",
  },
  {
    emoji: "📋",
    title: "Flyer Crew & Sari-Sari Connectors",
    body: "Post flyers at the sari-sari store, the palengke, church bulletin boards, or the waiting shed. Talk to your kagawad. Tell your barkada. Word of mouth runs this city.",
  },
  {
    emoji: "🏛️",
    title: "Barangay & SK Connectors",
    body: "Know your Barangay Kagawad or SK officers? Help us get an introduction. Official support from local government opens doors, and reading centers.",
  },
  {
    emoji: "📱",
    title: "Facebook Group Admins",
    body: "Every Iloilo community runs on Facebook. Help us manage the group, answer nanay and tatay questions, and keep sessions announced and visible.",
  },
];

const localPerks = [
  "A front-row seat to kids discovering something they love",
  "Your name in our community thank-you posts",
  "Free coffee and snacks at every session you attend",
  "The rare feeling of being part of something new",
];

const remoteRoles = [
  {
    emoji: "🚀",
    title: "Accelerator Alumni & Founders",
    body: "Talk about remote tech jobs, what they actually pay, and how a kid in Iloilo can get one. Real talk, no fluff.",
  },
  {
    emoji: "📱",
    title: "App Builders & Indie Makers",
    body: "Show your app. Talk about how you built it. Let kids see that real products come from real people, not big companies.",
  },
  {
    emoji: "🏢",
    title: "Industry & Big Tech Speakers",
    body: "Google, Microsoft, Meta. Cover free learning paths, certifications, and tools available to students right now.",
  },
  {
    emoji: "🎨",
    title: "UX & Design Specialists",
    body: "Figma, design thinking, user research. Show kids that design is a career. It starts with how things feel.",
  },
  {
    emoji: "⚛️",
    title: "Specialist Engineers",
    body: "React Native, app store deployment, APIs, backend. Go deep on a topic the core curriculum doesn't cover.",
  },
  {
    emoji: "🌍",
    title: "Remote Work Advocates",
    body: "You work from a beach in Thailand for a company in New York. Tell them how. That's the path we want them to see.",
  },
  {
    emoji: "💻",
    title: "Send Your Old Laptop",
    body: "Got a laptop collecting dust that still runs? Ship it to Iloilo. Kids who don't have a device at home can use it in sessions. Any model from the last 5 years works.",
  },
  {
    emoji: "📱",
    title: "Send Your Old Android",
    body: "Used Android phones let kabataan test and demo the apps they build on a real device. Even an older model makes a difference. Wipe it and ship it.",
  },
];

const remotePerks = [
  "Direct mentorship impact across the Pacific",
  "Named recognition on our site and materials",
  "Connection to a growing network of mission-aligned engineers",
  "Reference letter available after 6 months of contribution",
];

export default function VolunteerPage() {
  return (
    <main>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-[#1c1a16] py-24 sm:py-32 border-b border-white/10">
        <img
          src="/gallery-6.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-[#0d0c0a]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-xs tracking-[0.35em] uppercase text-[#4ade80] mb-6 font-medium">
              Get Involved
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-3xl">
              Show up for Iloilo&apos;s kids.
            </h1>
            <p className="mt-7 text-white/60 text-base sm:text-xl max-w-2xl leading-relaxed">
              This is grassroots community work. There is no role too small —
              from driving a kid to their first session to building the
              curriculum they learn from. Every bit of help moves this forward.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Split volunteer tracks */}
      <section className="py-20 sm:py-28 border-b border-[#e8e3d8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Local — dark card */}
            <FadeUp delay={0}>
              <div className="bg-[#1c1a16] rounded-2xl p-10 h-full flex flex-col">
                <p className="text-xs tracking-[0.3em] uppercase text-[#4ade80] font-medium mb-4">
                  Local · Iloilo-Based
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                  You don&apos;t have to be a developer to make a difference.
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  These are the real, unglamorous, essential things that make
                  sessions actually happen.
                </p>

                <ul className="space-y-5 mb-10 flex-1">
                  {localRoles.map((role) => (
                    <li key={role.title} className="flex items-start gap-4">
                      <span className="text-xl shrink-0 mt-0.5">
                        {role.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">
                          {role.title}
                        </p>
                        <p className="text-xs text-white/50 leading-relaxed">
                          {role.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-8 mb-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-5">
                    What you get
                  </p>
                  <ul className="space-y-3">
                    {localPerks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3">
                        <span className="text-[#4ade80] mt-0.5 shrink-0 font-bold">
                          ✓
                        </span>
                        <span className="text-white/65 text-sm">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <VolunteerCTA type="local" label="I Want to Help" dark />
              </div>
            </FadeUp>

            {/* Remote — light card */}
            <FadeUp delay={0.1}>
              <div className="bg-[#f5f3ee] rounded-2xl p-10 h-full flex flex-col border border-[#e8e3d8]">
                <p className="text-xs tracking-[0.3em] uppercase text-[#059669] font-medium mb-4">
                  Remote · Anywhere in the World
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1a16] mb-3 leading-tight">
                  Be the speaker who changes a kid&apos;s trajectory.
                </h2>
                <p className="text-[#8a8074] text-sm leading-relaxed mb-8">
                  One Zoom call. Thirty kids. A real look at what a career in
                  tech actually looks like, from someone living it. That&apos;s
                  what we&apos;re asking for.
                </p>

                <ul className="space-y-5 mb-10 flex-1">
                  {remoteRoles.map((role) => (
                    <li key={role.title} className="flex items-start gap-4">
                      <span className="text-xl shrink-0 mt-0.5">
                        {role.emoji}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1c1a16] mb-0.5">
                          {role.title}
                        </p>
                        <p className="text-xs text-[#8a8074] leading-relaxed">
                          {role.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-[#e8e3d8] pt-8 mb-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-[#8a8074] mb-5">
                    What you get
                  </p>
                  <ul className="space-y-3">
                    {remotePerks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3">
                        <span className="text-[#059669] mt-0.5 shrink-0 font-bold">
                          ✓
                        </span>
                        <span className="text-[#8a8074] text-sm">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <VolunteerCTA type="remote" label="Pitch a Talk" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Bottom note */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-[#8a8074] text-sm leading-relaxed max-w-2xl">
              All volunteer roles are unpaid. We run on generosity and shared
              belief that a kid&apos;s future shouldn&apos;t depend on which
              barangay they were born in. If that resonates, we&apos;d love to
              hear from you.
            </p>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
