import { useEffect, useRef } from "react";
import { useMusicStore, useControlsStore, usePlayerStore } from "@/store";
import { synth } from "./synth";
import { useBackingTrackSync } from "./hooks/useBackingTrackSync";

export function SoundEngine() {
  useBackingTrackSync();

  const isCountingIn = usePlayerStore((state) => state.isCountingIn);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const backgingtrackNoteIds = useMusicStore(
    (state) => state.backgingtrackNoteIds,
  );
  const activeNoteId = useMusicStore((state) => state.activeNoteId);
  const activeLockedNoteIds = useMusicStore(
    (state) => state.activeLockedNoteIds,
  );
  const isPianoOn = useControlsStore((state) => state.isPianoOn);
  // Pobieramy stan przełącznika ikonki z nutką
  const playBackingtrack = useControlsStore((state) => state.playBackingtrack);

  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
    const notesThatShouldPlay = new Set<string>();

    const isPlayerMode = isPlaying;
    const isExplorationMode = !isPlaying && isPianoOn;

    if (isCountingIn) return;

    if (isPlayerMode) {
      // Dodajemy warunek playBackingtrack jako "zezwalacz"
      const hasNotesToPlay =
        backgingtrackNoteIds && backgingtrackNoteIds.length > 0;

      if (hasNotesToPlay && playBackingtrack) {
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

    // Logika zatrzymywania dźwięków, które już nie powinny grać
    currentlyPlaying.current.forEach((noteId) => {
      if (!notesThatShouldPlay.has(noteId)) {
        synth.stop(noteId);
      }
    });

    // Logika uruchamiania nowych dźwięków
    notesThatShouldPlay.forEach((noteId) => {
      if (!currentlyPlaying.current.has(noteId)) {
        synth.play(noteId);
      }
    });

    currentlyPlaying.current = notesThatShouldPlay;
  }, [
    activeNoteId,
    activeLockedNoteIds,
    isPianoOn,
    isPlaying,
    isCountingIn,
    backgingtrackNoteIds,
    playBackingtrack, // Ważne: dodajemy do tablicy zależności
  ]);

  return null;
}
