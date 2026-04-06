import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { usePlayerStore } from "@/store";
import Piano from "@/components/Piano/Piano";
import { Toaster } from "@/components/ui/sonner";
import Player from "./components/Player/Player";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/ShapeControls/ShapeControls";
import Sign from "./components/Sign/Sign";
import ShapeExplorerSlider from "./components/Fretboard/ShapeExplorerSlider/ShapeExplorerSlider/ShapeExplorerSlider";

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <AppWrapper>
      <Toaster position="top-center" />
      <FullscreenButton />

      <MainContent>
        <Section>
          <Fretboard />
          <ShapeExplorerSlider />
        </Section>
        {!isPlaying && (
          <Section>
            <ShapeControls />
          </Section>
        )}
        <Section>
          <Player />
        </Section>
        {!isPlaying && (
          <>
            <Section>
              <Piano />
            </Section>
          </>
        )}
      </MainContent>
      <Sign />
    </AppWrapper>
  );
}
