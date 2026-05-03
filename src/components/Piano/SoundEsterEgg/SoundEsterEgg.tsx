import { useEffect, useRef } from "react";
import { useMusicStore, useControlsStore } from "@/store";
import { warmSynth } from "./synth";

export function SoundEsterEgg() {
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const isActuallyPlayable = useControlsStore(
    (state) => state.isActuallyPlayable,
  );

  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isActuallyPlayable) {
      currentlyPlaying.current.forEach((noteId) => {
        warmSynth.stop(noteId);
      });
      currentlyPlaying.current.clear();
      return;
    }

    const notesThatShouldPlay = new Set<string>(activeLockedNotes);
    if (activeNoteId) {
      notesThatShouldPlay.add(activeNoteId);
    }

    currentlyPlaying.current.forEach((noteId) => {
      if (!notesThatShouldPlay.has(noteId)) {
        warmSynth.stop(noteId);
      }
    });

    notesThatShouldPlay.forEach((noteId) => {
      if (!currentlyPlaying.current.has(noteId)) {
        warmSynth.play(noteId);
      }
    });

    currentlyPlaying.current = notesThatShouldPlay;
  }, [activeNoteId, activeLockedNotes, isActuallyPlayable]);

  return null;
}
