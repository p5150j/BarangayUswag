interface TribalSunProps {
  size?: number;
  color?: string;
  className?: string;
}

const POINTS =
  "50,2 60.7,24.1 83.9,16.1 75.9,39.3 98,50 75.9,60.7 83.9,83.9 60.7,75.9 50,98 39.3,75.9 16.1,83.9 24.1,60.7 2,50 24.1,39.3 16.1,16.1 39.3,24.1";

export default function TribalSun({
  size = 120,
  color = "#1c1a16",
  className = "",
}: TribalSunProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <polygon points={POINTS} fill={color} />
    </svg>
  );
}
