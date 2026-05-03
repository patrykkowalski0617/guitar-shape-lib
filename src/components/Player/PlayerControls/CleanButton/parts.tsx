import { Button as _Button } from "@/components/ui/button";
import styled, { css } from "styled-components";
import { playerElementCommon } from "../../constants";

export const Button = styled(_Button)<{ $isTemporarlyDisabled?: boolean }>`
  ${playerElementCommon}
  ${({ $isTemporarlyDisabled }) =>
    $isTemporarlyDisabled
      ? css`
          display: none;
        `
      : ""}
`;
