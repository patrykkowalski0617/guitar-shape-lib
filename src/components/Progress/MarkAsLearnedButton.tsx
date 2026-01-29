import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { GroupWrapper } from "../ControlsContainer/parts";
import { useCurrentShapeVariantProgressId } from "../../hooks/useCurrentShapeVariantProgressId";

export const MarkAsLearnedButton = () => {
  const { learned, toggleLearned } = useProgressStore();
  const currentVariantProgressId = useCurrentShapeVariantProgressId();

  const isLearned = currentVariantProgressId ? learned.includes(currentVariantProgressId) : false;
  const txtIsLearnedTrue = "This shape is learned";
  const txtIsLearnedFalse = "Mark current shape as 'Learned'";

  return (
    <GroupWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.ADD_LEARNED} />
      <Button
        variant={isLearned ? "active" : "outline"}
        disabled={!currentVariantProgressId}
        onClick={() => currentVariantProgressId && toggleLearned(currentVariantProgressId)}
        fixedWidthLabel={txtIsLearnedFalse}
      >
        {isLearned ? txtIsLearnedTrue : txtIsLearnedFalse}
      </Button>
    </GroupWrapper>
  );
};
