"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLink = (href: string, label: string) => (
    <Link
      key={label}
      href={href}
      className="text-sm tracking-wide text-[#8a8074] hover:text-[#1c1a16] transition-colors"
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e3d8] bg-[#faf9f6]/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="group flex flex-col leading-none gap-0.5">
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#8a8074] group-hover:text-[#059669] transition-colors">
            Barangay
          </span>
          <span className="font-serif text-xl font-bold italic text-[#1c1a16] group-hover:text-[#059669] transition-colors leading-none">
            Uswag
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-8">
          {navLink("/classes", "Classes")}
          {navLink("/impact", "Impact")}
          {navLink("/volunteer", "Volunteer")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
        </div>

        <button
          className="sm:hidden p-2 text-[#8a8074] hover:text-[#1c1a16]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="sm:hidden border-t border-[#e8e3d8] bg-[#faf9f6] px-5 py-4 flex flex-col gap-4">
          {navLink("/classes", "Classes")}
          {navLink("/impact", "Impact")}
          {navLink("/volunteer", "Volunteer")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
        </div>
      )}
    </header>
  );
}
