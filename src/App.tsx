import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { useControlsStore, usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/ShapeControls/ShapeControls";
import Sign from "./components/Sign/Sign";
import Player from "./components/Player/Player";
import Piano from "./components/Piano/Piano";
import { ShapeExplorerBar } from "./components/ShapeControls/ShapeExplorerBar/ShapeExplorerBar";
import { SoundEsterEgg } from "./components/Piano/SoundEsterEgg/SoundEsterEgg";
import { usePersistentUnlock } from "@/hooks/usePersistentUnlock";

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const bricks = usePlayerStore((state) => state.bricks);
  const shapeId = useControlsStore((state) => state.shapeId);
  const isShapeExplorerDisabled = usePersistentUnlock(!shapeId);
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
          <Section $isDisabled={isShapeExplorerDisabled}>
            <ShapeExplorerBar />
          </Section>
        )}

        <Section $isDisabled={isPlayerDisabled}>
          <Player />
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
