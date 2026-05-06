import { Button as _Button } from "@/components/ui/button";
import styled, { css } from "styled-components";
import { playerElementCommon } from "../../constants";

export const Button = styled(_Button)<{
  $isTemporarlyDisabled?: boolean;
  $isDisabled: boolean;
}>`
  ${playerElementCommon}
  background-color: color-mix(in oklab, var(--foreground) 50%,  var(--warn));
  &:hover {
    background-color: color-mix(in oklab, var(--foreground) 65%, var(--warn));
  }
  color: var(--background);
  border-width: 2px;
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          opacity: 0.2;
        `
      : ""}
`;
