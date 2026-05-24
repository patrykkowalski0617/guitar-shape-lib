import { useEffect, useRef } from "react";
import { useMusicStore, useMetronomeStore, useControllersStore } from "@/store";
import { synth } from "./synth";
import { useBackingTrackSync } from "./hooks/useBackingTrackSync";

export function SoundEngine() {
  useBackingTrackSync();

  const playback = useControllersStore((state) => state.playback);
  const isCountingIn = useMetronomeStore((state) => state.isCountingIn);
  const isPlaying = useMetronomeStore((state) => state.isPlaying);
  const backingtrackNoteIds = useMusicStore(
    (state) => state.backingtrackNoteIds,
  );
  const activeHoverNoteId = useMusicStore((state) => state.activeHoverNoteId);
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );
  const isPianoOn = useControllersStore((state) => state.isPianoOn);
  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
    const t2 = performance.now();
    console.log(JSON.stringify({ point: "T2_SoundEngine", t: t2 }));

    const notesThatShouldPlay = new Set<string>();

    const isPlayerMode = isPlaying;
    const isExplorationMode = !isPlaying && isPianoOn;

    if (isCountingIn) return;

    if (isPlayerMode) {
      const hasNotesToPlay =
        backingtrackNoteIds && backingtrackNoteIds.length > 0;

      if (hasNotesToPlay && playback) {
        backingtrackNoteIds.forEach((noteId) => {
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
    backingtrackNoteIds,
    playback,
    isPianoOn,
  ]);
  return null;
}
