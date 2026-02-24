import Fretboard from "@/components/Fretboard/Fretboard";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AppWrapper, CollapsibleSection, MainContent, Setcion } from "@/parts";
import { useSettingsStore } from "./store/useSettingsStore";
import { useControlsStore } from "./store/useControlsStore";
import Piano from "@/components/Piano/Piano";
import FullscreenButton from "@/components/Settings/FullscreenButton/FullscreenButton";
import { Toaster } from "@/components/ui/sonner";
import { getHSLColorFromHue } from "./utils";
import Player from "./components/Player/Player";
import Controls from "./components/Controls/Controls";

export default function App() {
  const { primaryColor } = useSettingsStore();
  const isPianoVisable = useControlsStore((state) => state.isPianoVisable);

  return (
    <AppWrapper style={{ "--primary": getHSLColorFromHue(primaryColor) }}>
      <Toaster position="top-center" />

      <Header />

      <MainContent>
        <Setcion>
          <Fretboard />
        </Setcion>

        <Setcion>
          <Player />
        </Setcion>

        <Setcion>
          <Controls />
        </Setcion>

        <CollapsibleSection $isVisible={isPianoVisable}>
          <Piano />
        </CollapsibleSection>
      </MainContent>

      <FullscreenButton />

      <Footer />
    </AppWrapper>
  );
}
