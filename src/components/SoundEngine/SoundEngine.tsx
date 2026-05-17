import { useEffect, useRef } from "react";
import { useMusicStore, useMetronomeStore, useControlsStore } from "@/store";
import { synth } from "./synth";
import { useBackingTrackSync } from "./hooks/useBackingTrackSync";

export function SoundEngine() {
  useBackingTrackSync();

  const playback = useControlsStore((state) => state.playback);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const backgingtrackNoteIds = useMusicStore(
    (state) => state.backgingtrackNoteIds,
  );
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );

  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
    const notesThatShouldPlay = new Set<string>();

    const isPlayerMode = isPlaying;
    const isExplorationMode = !isPlaying;

    if (isCountingIn) return;

    if (isPlayerMode) {
      const hasNotesToPlay =
        backgingtrackNoteIds && backgingtrackNoteIds.length > 0;

      if (hasNotesToPlay && playback) {
        backgingtrackNoteIds.forEach((noteId) => {
          notesThatShouldPlay.add(noteId);
        });
      }
    } else if (isExplorationMode) {
      activeLockedNoteIds.forEach((noteId) => notesThatShouldPlay.add(noteId));
      if (activeNoteId) {
        notesThatShouldPlay.add(activeNoteId);
      }
    }

    currentlyPlaying.current.forEach((noteId) => synth.stop(noteId));

    notesThatShouldPlay.forEach((noteId) => synth.play(noteId));

    currentlyPlaying.current = notesThatShouldPlay;
  }, [
    activeNoteId,
    activeLockedNoteIds,
    isPlaying,
    isCountingIn,
    backgingtrackNoteIds,
    playback,
  ]);
  return null;
}
