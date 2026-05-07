import { Button as _Button } from "@/components/ui/button";
import styled, { css } from "styled-components";
import { playerButtonCommon, playerElementCommon } from "../../constants";

export const Button = styled(_Button)<{
  $isTemporarlyDisabled?: boolean;
  $isDisabled: boolean;
}>`
  ${playerElementCommon}
  ${playerButtonCommon}
  background-color: color-mix(in oklab, var(--foreground) 50%,  var(--warn));
  color: var(--background);
  border-width: 2px;
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          opacity: 0.6;
          border-color: var(--muted);
          background-color: var(--muted);
        `
      : css`
          &:hover {
            background-color: color-mix(
              in oklab,
              var(--foreground) 65%,
              var(--warn)
            );
          }
        `}
`;
