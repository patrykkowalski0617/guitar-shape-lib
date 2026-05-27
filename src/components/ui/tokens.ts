import { css } from "styled-components";

export const color = {
  void: "var(--void)",
  bg: "var(--background)",
  surface: "color-mix(in oklab, var(--foreground) 8%, var(--background))",
  surfaceHigh: "color-mix(in oklab, var(--foreground) 14%, var(--background))",

  fg: "var(--foreground)",
  fgMuted: "var(--muted-foreground)",

  border: "color-mix(in oklab, var(--foreground) 22%, transparent)",
  borderHover: "var(--hover-glow)",

  primary: "var(--primary)",
  secondary: "var(--secondary)",
  warn: "var(--warn)",
  instrument: "var(--instrument)",

  led: "var(--led)",
} as const;

export const space = {
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "6": "24px",
  "8": "32px",
} as const;

export const font = {
  family: "var(--font)",
  xs: "0.7rem",
  sm: "0.8rem",
  md: "0.875rem",
  lg: "1rem",
  light: "300",
  normal: "400",
  bold: "600",
} as const;

export const radius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
} as const;

export const duration = {
  instant: "0ms",
  fast: "150ms",
  base: "250ms",
  slow: "400ms",
  crawl: "3000ms",
} as const;

export const ease = {
  out: "cubic-bezier(0.0, 0.0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0.0, 0.2, 1)",
} as const;

export const element = {
  heightSm: "28px",
  height: "32px",
  heightLg: "38px",
  buttonUnit: "50px",
} as const;

export const elementBase = css<{ $w?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${space["2"]};
  height: ${element.heightLg};
  padding: 0 ${space["3"]};
  min-width: ${({ $w }) =>
    $w !== undefined ? `calc(${element.buttonUnit} * ${$w})` : "50px"};
  white-space: nowrap;
  font-family: ${font.family};
  font-size: ${font.sm};
  font-weight: ${font.normal};
  line-height: 1;
  border-radius: ${radius.sm};
  border: 1px solid ${color.border};
  cursor: pointer;
  user-select: none;
  outline: none;

  & > svg {
    width: auto;
    height: 60%;
    stroke-width: 1px;
    flex-shrink: 0;
  }
`;

export const disabledState = css`
  &:disabled {
    opacity: 0.38;
    pointer-events: none;
  }
`;
