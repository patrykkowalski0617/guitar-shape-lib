import { css, type RuleSet } from "styled-components";

export const breakPoint = {
  mobileOnly: (styles: RuleSet<object>) => css`
    @media (max-width: 767px) {
      ${styles}
    }
  `,
  tablet: (styles: RuleSet<object>) => css`
    @media (min-width: 768px) {
      ${styles}
    }
  `,
  desktop: (styles: RuleSet<object>) => css`
    @media (min-width: 1024px) {
      ${styles}
    }
  `,
  desktopLarge: (styles: RuleSet<object>) => css`
    @media (min-width: 1450px) {
      ${styles}
    }
  `,
};

export const color = {
  void: "var(--void)",
  bg: "var(--background)",
  surface: "color-mix(in oklab, var(--foreground) 14%, var(--background))",
  surfaceHigh: "color-mix(in oklab, var(--foreground) 24%, var(--background))",

  fg: "var(--foreground)",
  fgMuted: "var(--muted-foreground)",

  border: "color-mix(in oklab, var(--foreground) 22%, transparent)",
  borderHover: "var(--hover-glow)",

  primary: "var(--primary)",
  secondary: "var(--secondary)",
  warn: "var(--warn)",
  instrument: "var(--instrument)",
  contrast: "var(--conntrast)",

  led: "var(--led)",
} as const;

export const space = {
  _1: "4px",
  _2: "8px",
  _3: "12px",
  _4: "16px",
  _6: "24px",
  _8: "32px",
} as const;

export const font = {
  family: "var(--font)",
  xs: "0.7rem",
  sm: "0.8rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "2rem",
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
  gap: ${space._2};
  height: ${element.heightLg};
  padding: 0 ${space._3};
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
  color: var(--foreground);

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

export const grabStyle = css`
  &:active {
    cursor: grabbing;
  }
  cursor: grab;
  &::before,
  &::after {
    content: "";
    position: absolute;
    overflow: hidden;
    background-size: 4px 4px;
    pointer-events: none;
    transition: opacity ${duration.crawl} ease;
    width: 25px;
    height: 25px;
  }

  &::before {
    background-image: radial-gradient(
      rgba(255, 255, 255, 1) 0.7px,
      transparent 0.7px
    );
    opacity: 0.3;
  }

  &::after {
    background-image: radial-gradient(rgb(255, 88, 16) 1px, transparent 1px);
    opacity: 0;
  }

  &:hover:not(.is-dragging):not(.range-dragging *),
  &:active,
  &.is-dragging {
    &::before {
      opacity: 0;
      transition: opacity 0s;
    }
    &::after {
      opacity: 0.75;
      transition: opacity 0s;
    }
  }
`;
