import Fretboard from "@/components/Fretboard/Fretboard";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AppWrapper, CollapsibleSection, MainContent, Section } from "@/parts";
import { useControlsStore, usePlayerStore } from "@/store";
import Piano from "@/components/Piano/Piano";
import { Toaster } from "@/components/ui/sonner";
import Player from "./components/Player/Player";
import Controls from "./components/Controls/Controls";

export default function App() {
  const isPianoVisible = useControlsStore((state) => state.isPianoVisible);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    <AppWrapper>
      <Toaster position="top-center" />

      <Header />

      <MainContent>
        <Section>
          <Fretboard />
        </Section>
        <Section>
          <Player />
        </Section>
        {!isPlaying && (
          <>
            <Section>
              <Controls />
            </Section>

            <CollapsibleSection $isVisible={isPianoVisible}>
              <Piano />
            </CollapsibleSection>
          </>
        )}
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}
