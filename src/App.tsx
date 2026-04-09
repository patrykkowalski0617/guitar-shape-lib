import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/ShapeControls/ShapeControls";
import Sign from "./components/Sign/Sign";
import ShapeExplorerSlider from "./components/ShapeExplorerSlider/ShapeExplorerSlider/ShapeExplorerSlider";

export default function App() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  return (
    <AppWrapper>
      <Toaster position="top-center" />
      <FullscreenButton />

      <MainContent>
        <Section>{!isPlaying && <ShapeControls />}</Section>
        <Section>
          <Fretboard />
        </Section>
        <Section>
          <ShapeExplorerSlider />
        </Section>
      </MainContent>
      <Sign />
    </AppWrapper>
  );
}
