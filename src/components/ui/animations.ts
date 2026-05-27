import { keyframes, css } from "styled-components";
import { color, duration } from "./tokens";

const glowPulse = keyframes`
  0% {
    box-shadow:
      0 0 4px  color-mix(in oklab, ${color.borderHover} 40%, transparent),
      0 0 10px color-mix(in oklab, ${color.borderHover} 15%, transparent);
  }
  100% {
    box-shadow:
      0 0 7px  color-mix(in oklab, ${color.borderHover} 65%, transparent),
      0 0 18px color-mix(in oklab, ${color.borderHover} 28%, transparent);
  }
`;

export const hoverGlow = css`
  outline: 1px solid transparent;
  box-shadow: none;
  transition:
    outline-color ${duration.crawl} ease,
    box-shadow ${duration.crawl} ease;

  &:hover:not(:disabled) {
    transition: none;
    outline-color: ${color.borderHover};
    animation: ${glowPulse} 2.5s ease-in-out forwards;
  }

  &:focus-visible {
    outline: 1px solid ${color.borderHover};
    transition: none;
  }

  &:focus:not(:focus-visible):not(:hover) {
    outline: 1px solid transparent;
  }

  &:hover:not(:disabled):focus-visible {
    transition: none;
    outline-color: ${color.borderHover};
    animation: ${glowPulse} 2.5s ease-in-out forwards;
  }

  &:active:not(:disabled) {
    transition: none;
    outline-color: ${color.borderHover};
    animation: none;
    box-shadow:
      0 0 7px color-mix(in oklab, ${color.borderHover} 65%, transparent),
      0 0 18px color-mix(in oklab, ${color.borderHover} 28%, transparent);
  }
`;

export const ledPulse = keyframes`
  0%, 100% {
    box-shadow:
      0 0 3px  color-mix(in oklab, var(--led) 80%, transparent),
      0 0 8px  color-mix(in oklab, var(--led) 40%, transparent),
      0 0 16px color-mix(in oklab, var(--led) 20%, transparent);
  }
  50% {
    box-shadow:
      0 0 5px  color-mix(in oklab, var(--led) 90%, transparent),
      0 0 12px color-mix(in oklab, var(--led) 50%, transparent),
      0 0 22px color-mix(in oklab, var(--led) 25%, transparent);
  }
`;
