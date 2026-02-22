import styled, { css, keyframes } from "styled-components";
import { instrumentElBRadius } from "@/parts";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 80%, transparent); }
  70% { box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 0%, transparent); }
  100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--accent) 0%, transparent); }
`;

export const ControlsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 28px;
`;

export const PlayButton = styled.button<{ $isPlaying?: boolean; $bpm?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${instrumentElBRadius};
  height: 100%;
  width: 30px;
  color: var(--primary-foreground);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  background-color: color-mix(in oklab, var(--accent) 70%, var(--background));
  &:hover {
    background-color: color-mix(in oklab, var(--accent) 90%, var(--background));
  }

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
  height: 100%;
  width: 50px;
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
