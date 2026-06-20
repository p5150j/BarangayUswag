"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import VolunteerModal from "./VolunteerModal";

export default function VolunteerCTA({
  type,
  label,
  dark,
}: {
  type: "local" | "remote";
  label: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`self-start px-7 py-3.5 text-sm font-medium tracking-wide rounded-full transition-colors ${
          dark
            ? "bg-[#059669] text-white hover:bg-[#047857]"
            : "bg-[#1c1a16] text-white hover:bg-[#3a3630]"
        }`}
      >
        {label}
      </button>
      {open &&
        createPortal(
          <VolunteerModal defaultType={type} onClose={() => setOpen(false)} />,
          document.body,
        )}
    </>
  );
}
