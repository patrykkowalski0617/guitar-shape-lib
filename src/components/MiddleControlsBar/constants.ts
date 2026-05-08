import { appBgColor } from "@/constants";
import { css } from "styled-components";

export const middleBarButtons = css<{ $isDisabled: boolean }>`
  box-shadow:
    3px 3px 15px 4px color-mix(in oklab, var(--background) 95%, transparent),
    -3px -3px 15px 3px color-mix(in oklab, var(--foreground) 30%, transparent),
    3px 3px 7px 0px color-mix(in oklab, var(--background) 25%, transparent)
      inset;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: 0.2s ease-in-out;
  svg {
    color: var(--background);
    transition: 0.1s ease-in-out;
  }
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          background: ${appBgColor};
        `
      : css`
          &:hover {
            filter: brightness(1.5);
            transform: scale(0.95);
          }
        `}
`;
