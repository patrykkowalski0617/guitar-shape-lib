import { usePlayerStore } from "@/store";
import { AddToList } from "./AddToList/AddToList";
import { LockShapeButton } from "./LockShapeButton/LockShapeButton";
import { ControlContainer } from "./parts";
import { RandomizeControls } from "./RandomizeControls/RandomizeControls";

export default function FretboardControls() {
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    !isPlaying && (
      <ControlContainer>
        <LockShapeButton />
        <AddToList />
        <RandomizeControls />
      </ControlContainer>
    )
  );
}
