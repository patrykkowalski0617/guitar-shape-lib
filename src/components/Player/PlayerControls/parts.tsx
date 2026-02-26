import styled, { css, keyframes } from "styled-components";
import { instrumentElBRadius } from "@/parts";
import { SolidButton } from "../ui/parts";
import { PlayerElementHeight } from "../parts";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 80%, transparent); }
  70% { box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 0%, transparent); }
`;

export const PlayButton = styled(SolidButton)<{ $isPlaying?: boolean; $bpm?: number }>`
  ${({ $isPlaying, $bpm }) =>
    $isPlaying &&
    $bpm &&
    css`
      animation: ${pulse} ${60 / $bpm}s infinite linear;
    `}
`;

export const BpmInput = styled.input`
  background-color: color-mix(in oklab, var(--background) 70%, var(--accent));
  &:hover {
    background-color: color-mix(in oklab, var(--background) 90%, var(--accent));
  }
  border: 1px solid var(--border);
  border-radius: ${instrumentElBRadius};
  color: var(--foreground);
  height: ${PlayerElementHeight};
  width: 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;

  &:focus {
    border-color: var(--accent);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
