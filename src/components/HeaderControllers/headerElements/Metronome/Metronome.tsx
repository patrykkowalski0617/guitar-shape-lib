import styled, { css, keyframes } from "styled-components";
import { useEffect } from "react";
import { Metronome as MetronomeIcon } from "lucide-react";
import { useMetronomeStore } from "@/store";
import { useWakeLock } from "@/hooks";
import { color, Button } from "@/components/ui";

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0   color-mix(in oklab, ${color.primary} 100%, transparent); }
  50%  { box-shadow: 0 0 5px 5px color-mix(in oklab, ${color.primary} 0%,   transparent); }
  100% { box-shadow: 0 0 0 0   color-mix(in oklab, ${color.primary} 0%,   transparent); }
`;

const PlayButton = styled(Button)<{ $isPlaying?: boolean; $bpm?: number }>`
  position: relative;

  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      background: color-mix(in oklab, ${color.primary} 25%, ${color.surface});
      border-color: color-mix(in oklab, ${color.primary} 50%, transparent);
    `}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    ${({ $isPlaying, $bpm }) =>
      $isPlaying &&
      $bpm &&
      css`
        animation: ${pulse} ${60 / $bpm}s infinite linear;
      `}
  }
`;

export const Metronome = () => {
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const isCountingIn = useMetronomeStore((s) => s.isCountingIn);
  const countIn = useMetronomeStore((s) => s.countIn);
  const togglePlay = useMetronomeStore((s) => s.togglePlay);
  const bpm = useMetronomeStore((s) => s.bpm);

  const { toggleWakeLock, isActive } = useWakeLock();

  useEffect(() => {
    if (isPlaying !== isActive) toggleWakeLock();
  }, [isPlaying, isActive, toggleWakeLock]);

  return (
    <PlayButton $isPlaying={isPlaying} $bpm={bpm} onClick={togglePlay}>
      {isCountingIn ? countIn : <MetronomeIcon />}
    </PlayButton>
  );
};
