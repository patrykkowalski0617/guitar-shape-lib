import Fretboard from "@/components/Fretboard/Fretboard";
import { AppWrapper, MainContent, Section } from "@/parts";
import { usePlayerStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { FullscreenButton } from "./components/FullscreenButton/FullscreenButton";
import ShapeControls from "./components/ShapeControls/ShapeControls";
import Sign from "./components/Sign/Sign";
import ShapeExplorerSlider from "./components/ShapeControls/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import Player from "./components/Player/Player";
import { CleanButton } from "./components/ShapeControls/ShapeExplorer/CleanButton/CleanButton";
import { AddBrickButton } from "./components/ShapeControls/ShapeExplorer/AddBrickButton/AddBrickButton";
import Piano from "./components/Piano/Piano";

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
          <div className="flex justify-center items-center gap-5">
            <ShapeExplorerSlider />
            <CleanButton />
            <AddBrickButton />
          </div>
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
