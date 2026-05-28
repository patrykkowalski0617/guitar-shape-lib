import { keyframes, css } from "styled-components";
import { color, duration } from "./tokens";

const createGlowPulse = (glowColor: string) => keyframes`
  0% {
    box-shadow:
      0 0 4px  color-mix(in oklab, ${glowColor} 40%, transparent),
      0 0 10px color-mix(in oklab, ${glowColor} 15%, transparent);
  }
  100% {
    box-shadow:
      0 0 7px  color-mix(in oklab, ${glowColor} 65%, transparent),
      0 0 18px color-mix(in oklab, ${glowColor} 28%, transparent);
  }
`;

export const hoverGlow = ({
  color: customColor = color.borderHover,
}: {
  color?: string;
} = {}) => {
  return css`
    outline: 1px solid transparent;
    box-shadow: none;
    transition:
      outline-color ${duration.crawl} ease,
      box-shadow ${duration.crawl} ease;

    &:hover:not(:disabled) {
      transition: none;
      outline-color: ${customColor};
      animation: ${createGlowPulse(customColor)} 2.5s ease-in-out forwards;
    }

    &:focus-visible {
      outline: 1px solid ${customColor};
      transition: none;
    }

    &:focus:not(:focus-visible):not(:hover) {
      outline: 1px solid transparent;
    }

    &:hover:not(:disabled):focus-visible {
      transition: none;
      outline-color: ${customColor};
      animation: ${createGlowPulse(customColor)} 2.5s ease-in-out forwards;
    }

    &:active:not(:disabled) {
      transition: none;
      outline-color: ${customColor};
      animation: none;
      box-shadow:
        0 0 7px color-mix(in oklab, ${customColor} 65%, transparent),
        0 0 18px color-mix(in oklab, ${customColor} 28%, transparent);
    }
  `;
};

export const hoverGlowBorder = ({
  color: customColor = color.borderHover,
}: {
  color?: string;
} = {}) => {
  return css`
    border: 1px solid transparent;
    box-shadow: none;
    transition:
      border-color ${duration.crawl} ease,
      box-shadow ${duration.crawl} ease;

    &:hover:not(:disabled) {
      transition: none;
      border-color: ${customColor};
    }

    &:focus-visible {
      border: 1px solid ${customColor};
      transition: none;
    }

    &:focus:not(:focus-visible):not(:hover) {
      border: 1px solid transparent;
    }

    &:hover:not(:disabled):focus-visible {
      transition: none;
      border-color: ${customColor};
      animation: ${createGlowPulse(customColor)} 2.5s ease-in-out forwards;
    }

    &:active:not(:disabled) {
      transition: none;
      border-color: ${customColor};
      animation: none;
      box-shadow:
        0 0 7px color-mix(in oklab, ${customColor} 65%, transparent),
        0 0 18px color-mix(in oklab, ${customColor} 28%, transparent);
    }
  `;
};

export const createLedPulse = (ledColor: string) => keyframes`
  0%, 100% {
    box-shadow:
      0 0 3px  color-mix(in oklab, ${ledColor} 80%, transparent),
      0 0 8px  color-mix(in oklab, ${ledColor} 40%, transparent),
      0 0 16px color-mix(in oklab, ${ledColor} 20%, transparent);
  }
  50% {
    box-shadow:
      0 0 5px  color-mix(in oklab, ${ledColor} 90%, transparent),
      0 0 12px color-mix(in oklab, ${ledColor} 50%, transparent),
      0 0 22px color-mix(in oklab, ${ledColor} 25%, transparent);
  }
`;
