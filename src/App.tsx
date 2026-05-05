import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { useControlsStore, useMusicStore, usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/UpperBar/UpperBar";
import Sign from "./components/Sign/Sign";
import { Player } from "./components/Player/Player";
import Piano from "./components/Piano/Piano";
import { ShapeExplorerBar } from "./components/ShapeExplorerBar/ShapeExplorerBar";
import { SoundEsterEgg } from "./components/SoundEsterEgg/SoundEsterEgg";
import { usePersistentUnlock } from "@/hooks/usePersistentUnlock";

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const shapeId = useControlsStore((state) => state.shapeId);
  const activeLockedNotes = useMusicStore((state) => state.activeLockedNotes);
  const activeLockedNotesUnlockState = usePersistentUnlock(
    !activeLockedNotes.length,
  );
  const isShape = usePersistentUnlock(!shapeId);
  const isShapeExplorerBarDisabled = isShape && activeLockedNotesUnlockState;
  const isPlayerDisabled = usePersistentUnlock(!bricks.length);

  return (
    <AppWrapper>
      <SoundEsterEgg />
      <Toaster position="top-center" />
      <FullscreenButton />

      <MainContent>
        {!isPlaying && (
          <Section>
            <ShapeControls />
          </Section>
        )}

        <Section>
          <Fretboard />
        </Section>

        {!isPlaying && (
          <Section $isDisabled={isShapeExplorerBarDisabled}>
            <ShapeExplorerBar />
          </Section>
        )}

        <Section $isDisabled={isPlayerDisabled}>
          <Player>
            <Player.Bricks />
            <Player.Controls />
          </Player>
        </Section>

        {!isPlaying && (
          <Section>
            <Piano />
          </Section>
        )}

        <Section>
          <Sign />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
