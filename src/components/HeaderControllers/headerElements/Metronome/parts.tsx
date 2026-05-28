import { Button } from "@/components/ui";
import styled, { css, keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--contrast) 100%, transparent);
  }
  50% {
    box-shadow: 0 0 5px 5px color-mix(in oklab, var(--contrast) 0%, transparent);
  }
  100% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--contrast) 0%, transparent);
  }
  `;

export const PlayButton = styled(Button)<{
  $isPlaying?: boolean;
  $bpm?: number;
}>`
  position: relative;
  border-radius: 4px;
  background: color-mix(in oklab, var(--contrast) 20%, var(--background));
  ${({ $isPlaying, $bpm }) =>
    $isPlaying &&
    $bpm &&
    css`
      animation: ${pulse} ${60 / $bpm}s infinite linear;
    `}
`;
