import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { usePlayerStore } from "@/store";
import Piano from "@/components/Piano/Piano";
import { Toaster } from "@/components/ui/sonner";
import Player from "./components/Player/Player";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/ShapeControls/ShapeControls";
import Sign from "./components/Sign/Sign";

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <AppWrapper>
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
        {/* <Section>
          <Player />
        </Section>
        {!isPlaying && (
          <>
            <Section>
              <Piano />
            </Section>
          </>
        )} */}
      </MainContent>
      <Sign />
    </AppWrapper>
  );
}
