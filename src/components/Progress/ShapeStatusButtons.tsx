import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { useFretboardShapes } from "../Fretboard/helpers/useFretboardShapes";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { GroupWrapper } from "../ControlsContainer/parts";

export const ShapeStatusButtons = () => {
  const { currentVariantId } = useFretboardShapes();
  const { learned, learning, toggleLearned, toggleLearning } = useProgressStore();

  const isLearned = currentVariantId ? learned.includes(currentVariantId) : false;
  const isLearning = currentVariantId ? learning.includes(currentVariantId) : false;

  return (
    <>
      <GroupWrapper>
        <TutorialPopover {...TUTORIAL_CONTENT.ADD_TO_PROGRESS} />
        <Button
          variant={isLearning ? "default" : "outline"}
          disabled={!currentVariantId}
          onClick={() => currentVariantId && toggleLearning(currentVariantId)}
        >
          {isLearning ? "In progress" : "Add to 'In progress'"}
        </Button>
      </GroupWrapper>

      <GroupWrapper>
        <TutorialPopover {...TUTORIAL_CONTENT.ADD_LEARNED} />
        <Button
          variant={isLearned ? "secondary" : "outline"}
          disabled={!currentVariantId}
          onClick={() => currentVariantId && toggleLearned(currentVariantId)}
        >
          {isLearned ? "Got it! This shape is learned" : "Add to 'Learned'"}
        </Button>
      </GroupWrapper>
    </>
  );
};
