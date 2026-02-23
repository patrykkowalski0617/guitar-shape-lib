import { AddToList } from "./AddToList/AddToList";
import { LockShapeButton } from "./LockShapeButton/LockShapeButton";
import { ControlContainer } from "./parts";
import { RandomizeControls } from "./RandomizeControls/RandomizeControls";

export default function FretboardControls() {
  return (
    <ControlContainer>
      <LockShapeButton />
      <AddToList />
      <RandomizeControls />
    </ControlContainer>
  );
}
