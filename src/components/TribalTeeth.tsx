"use client";
import { useId } from "react";

interface TribalTeethProps {
  color?: string;
  height?: number;
  className?: string;
  flipped?: boolean;
}

export default function TribalTeeth({
  color = "#1c1a16",
  height = 18,
  className = "",
  flipped = false,
}: TribalTeethProps) {
  const rawId = useId();
  const patternId = `teeth-${rawId.replace(/:/g, "")}`;

  return (
    <svg
      width="100%"
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={flipped ? { transform: "scaleY(-1)" } : undefined}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="20"
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <polygon points={`0,0 20,0 10,${height}`} fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#${patternId})`} />
    </svg>
  );
}
