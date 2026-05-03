import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/ShapeControls/ShapeControls";
import Sign from "./components/Sign/Sign";
import Player from "./components/Player/Player";
import Piano from "./components/Piano/Piano";
import { ShapeExplorerBar } from "./components/ShapeControls/ShapeExplorerBar/ShapeExplorerBar";
import { SoundEsterEgg } from "./components/Piano/SoundEsterEgg/SoundEsterEgg";

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <AppWrapper>
      <SoundEsterEgg />
      <Toaster position="top-center" />
      <FullscreenButton />

      <MainContent>
        <Section>{!isPlaying && <ShapeControls />}</Section>
        <Section>
          <Fretboard />
        </Section>
        <Section>
          <ShapeExplorerBar />
        </Section>

        <Section>
          <Player />
        </Section>

        <Section>
          <Piano />
        </Section>

        <Section>
          <Sign />
        </Section>
      </MainContent>
    </AppWrapper>
  );
}
