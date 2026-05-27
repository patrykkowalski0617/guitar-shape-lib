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
  outline: transparent solid 1px;
  transition: outline-color ${duration.crawl} ease;

  &:hover:not(:disabled),
  &:focus-visible {
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
