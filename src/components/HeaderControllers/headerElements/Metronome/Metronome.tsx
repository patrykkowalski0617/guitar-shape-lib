import { useEffect } from "react";
// import { Metronome as MetronomeIcon } from "lucide-react";
import { useMetronomeStore } from "@/store";
import { useWakeLock } from "@/hooks";
import { PlayButton } from "./parts";

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
      {/* {isCountingIn ? countIn : <MetronomeIcon />} */}
      {isCountingIn ? countIn : isPlaying ? "Stop" : `Play`}
    </PlayButton>
  );
};
