import { useEffect, useRef } from "react";
import { useMusicStore, useMetronomeStore, useControllersStore } from "@/store";
import { synth } from "./synth";

export function SoundEngine() {
  const playback = useControllersStore((s) => s.playback);
  const isCountingIn = useMetronomeStore((s) => s.isCountingIn);
  const isPlaying = useMetronomeStore((s) => s.isPlaying);
  const backingtrackNoteIds = useMusicStore((s) => s.backingtrackNoteIds);
  const activeHoverNoteId = useMusicStore((s) => s.activeHoverNoteId);
  const activeLockedNoteIds = useMusicStore((s) => s.activeLockedNoteIds);
  const isPianoOn = useControllersStore((s) => s.isPianoOn);
  const currentlyPlaying = useRef<Set<string>>(new Set());

  useEffect(() => {
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
