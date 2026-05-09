import { appBgColor } from "@/constants";
import { css } from "styled-components";

export const middleBarButtons = css<{ $isDisabled: boolean }>`
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  transition: 0.2s ease-in-out;
  svg {
    color: var(--background);
    transition: 0.2s ease-in-out;
  }
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          background: linear-gradient(
            342deg,
            color-mix(in oklab, ${appBgColor} 100%, transparent) 0%,
            color-mix(in oklab, ${appBgColor} 40%, var(--muted)) 100%
          );
          border: 2px solid #272727;
          box-shadow:
            3px 3px 15px 6px
              color-mix(in oklab, var(--background) 100%, transparent),
            -3px -3px 15px 3px
              color-mix(in oklab, var(--foreground) 30%, transparent);
        `
      : css`
          border: 2px solid transparent;
          box-shadow:
            3px 3px 15px 6px
              color-mix(in oklab, var(--background) 100%, transparent),
            -3px -3px 15px 3px
              color-mix(in oklab, var(--foreground) 40%, transparent),
            0px 0px 15px 0px
              color-mix(in oklab, var(--background) 80%, transparent) inset;
          &:hover {
            filter: brightness(1.5);
            transform: scale(0.95);
          }
        `}
`;
