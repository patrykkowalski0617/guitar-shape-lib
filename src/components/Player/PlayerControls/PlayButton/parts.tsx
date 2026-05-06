import styled, { css, keyframes } from "styled-components";
import { Button } from "@/components/ui/button";
import { playerElementCommon } from "../../constants";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--primary) 100%, transparent); }
  50% { box-shadow: 0 0 5px 5px color-mix(in oklab, var(--primary) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--primary) 0%, transparent); }
`;

export const PlayButton = styled(Button)<{
  $isPlaying?: boolean;
  $bpm?: number;
}>`
  ${playerElementCommon}
  font-size: 16px;
  font-weight: 900;
  position: relative;
  color: var(--background);
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    ${({ $isPlaying, $bpm }) =>
      $isPlaying &&
      $bpm &&
      css`
        animation: ${pulse} ${60 / $bpm}s infinite linear;
      `}
  }
`;
