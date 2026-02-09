import { type JSX } from "react";

type TriColorCircleProps = {
  colors: [React.CSSProperties["color"], React.CSSProperties["color"], React.CSSProperties["color"]];
  size?: number;
};

export default function TriColorCircle({ colors, size = 20 }: TriColorCircleProps): JSX.Element {
  const center = size / 2;
  const strokeWidth = size / 2;
  const radius = size / 4;

  const circumference = 2 * Math.PI * radius;
  const segment = circumference / 3;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(90deg)", display: "block" }}
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke={colors[0]}
        strokeWidth={strokeWidth}
        strokeDasharray={`${segment} ${circumference}`}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke={colors[1]}
        strokeWidth={strokeWidth}
        strokeDasharray={`${segment} ${circumference}`}
        strokeDashoffset={-segment}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="transparent"
        stroke={colors[2]}
        strokeWidth={strokeWidth}
        strokeDasharray={`${segment} ${circumference}`}
        strokeDashoffset={-segment * 2}
      />
    </svg>
  );
}
