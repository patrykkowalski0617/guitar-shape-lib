import styled, { css } from "styled-components";
import { color, createLedPulse, duration } from "@/components/ui";

export const Led = styled.div<{
  $active: boolean;
  $color?: string;
  $borderColor?: string;
}>`
  ${({ $active, $color, $borderColor }) => {
    const customColor = $color ? $color : color.led;
    const customBorderColor = $borderColor ? $borderColor : color.borderHover;
    return css`
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
      border: 1px solid color-mix(in oklab, ${customColor} 15%, transparent);
      background-color: color-mix(in oklab, ${customColor} 20%, var(--void));
      box-shadow: none;
      transition:
        background-color 0ms,
        border-color ${duration.crawl} ease,
        box-shadow ${duration.crawl} ease;

      ${$active &&
      css`
        transition:
          background-color 0ms,
          border-color 0ms,
          box-shadow 0ms;
        background-color: ${customColor};
        border-color: ${customBorderColor};
        box-shadow:
          0 0 4px color-mix(in oklab, ${customColor} 80%, transparent),
          0 0 10px color-mix(in oklab, ${customColor} 40%, transparent),
          0 0 20px color-mix(in oklab, ${customColor} 20%, transparent);
        animation: ${createLedPulse(customColor)} 2s ease-in-out infinite;
      `}
    `;
  }}
`;
