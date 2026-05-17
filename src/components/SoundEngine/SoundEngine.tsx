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
  const activeHoverNoteId = useMusicStore((state) => state.activeHoverNoteId);
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );
  const isPianoOn = useControlsStore((state) => state.isPianoOn);
  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
    const notesThatShouldPlay = new Set<string>();

    const isPlayerMode = isPlaying;
    const isExplorationMode = !isPlaying && isPianoOn;

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
      if (activeHoverNoteId) {
        notesThatShouldPlay.add(activeHoverNoteId);
      }
    }

    currentlyPlaying.current.forEach((noteId) => synth.stop(noteId));

    notesThatShouldPlay.forEach((noteId) => synth.play(noteId));

    currentlyPlaying.current = notesThatShouldPlay;
  }, [
    activeHoverNoteId,
    activeLockedNoteIds,
    isPlaying,
    isCountingIn,
    backgingtrackNoteIds,
    playback,
  ]);
  return null;
}
