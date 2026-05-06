import { useEffect, useRef } from "react";
import { useMusicStore, useControlsStore, usePlayerStore } from "@/store";
import { synth } from "./synth";

export function SoundEngine() {
  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bassNoteId = useMusicStore((state) => state.bassNoteId);
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const isActuallyPlayable = useControlsStore(
    (state) => state.isActuallyPlayable,
  );

  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
    const notesThatShouldPlay = new Set<string>();

    const isPlayerMode = isPlaying;
    const isExplorationMode = !isPlaying && isActuallyPlayable;
    if (isCountingIn) return;
    if (isPlayerMode) {
      if (bassNoteId) {
        notesThatShouldPlay.add(bassNoteId);
      }
    } else if (isExplorationMode) {
      activeLockedNotes.forEach((noteId) => notesThatShouldPlay.add(noteId));
      if (activeNoteId) {
        notesThatShouldPlay.add(activeNoteId);
      }
    }

    currentlyPlaying.current.forEach((noteId) => {
      if (!notesThatShouldPlay.has(noteId)) {
        synth.stop(noteId);
      }
    });

    notesThatShouldPlay.forEach((noteId) => {
      if (!currentlyPlaying.current.has(noteId)) {
        synth.play(noteId);
      }
    });

    currentlyPlaying.current = notesThatShouldPlay;
  }, [
    activeNoteId,
    activeLockedNotes,
    isActuallyPlayable,
    isPlaying,
    isCountingIn,
    bassNoteId,
  ]);

  return null;
}
