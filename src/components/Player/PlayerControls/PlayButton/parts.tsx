import styled, { css, keyframes } from "styled-components";
import { Button } from "@/components/ui/button";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 80%, transparent); }
  70% { box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 0%, transparent); }
`;

export const PlayButton = styled(Button)<{
  $isPlaying?: boolean;
  $bpm?: number;
}>`
  font-size: 16px;
  font-weight: 900;
  text-shadow:
    -1px -1px 0 var(--background),
    1px -1px 0 var(--background),
    -1px 1px 0 var(--background),
    1px 1px 0 var(--background);
  ${({ $isPlaying, $bpm }) =>
    $isPlaying &&
    $bpm &&
    css`
      animation: ${pulse} ${60 / $bpm}s infinite linear;
    `}
`;
