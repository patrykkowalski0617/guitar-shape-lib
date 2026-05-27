import styled, { css } from "styled-components";
import { duration } from "../tokens";
import { ledPulse } from "../animations";

export const Led = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid color-mix(in oklab, var(--led) 15%, transparent);
  background-color: var(--background);
  box-shadow: none;
  transition:
    background-color 0ms,
    border-color ${duration.crawl} ease,
    box-shadow ${duration.crawl} ease;

  ${({ $active }) =>
    $active &&
    css`
      transition:
        background-color 0ms,
        border-color 0ms,
        box-shadow 0ms;
      background-color: color-mix(in oklab, var(--led) 85%, white);
      border-color: var(--led);
      box-shadow:
        0 0 4px color-mix(in oklab, var(--led) 80%, transparent),
        0 0 10px color-mix(in oklab, var(--led) 40%, transparent),
        0 0 20px color-mix(in oklab, var(--led) 20%, transparent);
      animation: ${ledPulse} 2s ease-in-out infinite;
    `}
`;
