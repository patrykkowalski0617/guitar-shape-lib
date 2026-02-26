import Fretboard from "@/components/Fretboard/Fretboard";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AppWrapper, CollapsibleSection, MainContent, Setcion } from "@/parts";
import { useControlsStore, usePlayerStore, useSettingsStore } from "@/store";
import Piano from "@/components/Piano/Piano";
import { Toaster } from "@/components/ui/sonner";
import Player from "./components/Player/Player";
import Controls from "./components/Controls/Controls";

export default function App() {
  const { primaryColor } = useSettingsStore();
  const isPianoVisable = useControlsStore((state) => state.isPianoVisable);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    <AppWrapper style={{ "--primary": primaryColor }}>
      <Toaster position="top-center" />

      <Header />

      <MainContent>
        <Setcion>
          <Fretboard />
        </Setcion>
        <Setcion>
          <Player />
        </Setcion>
        {!isPlaying && (
          <>
            <Setcion>
              <Controls />
            </Setcion>

            <CollapsibleSection $isVisible={isPianoVisable}>
              <Piano />
            </CollapsibleSection>
          </>
        )}
      </MainContent>
      <Footer />
    </AppWrapper>
  );
}
