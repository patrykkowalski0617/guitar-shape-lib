import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import { GroupWrapper } from "../ControlsContainer/parts";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { useCurrentShapeVariantProgressId } from "../../hooks/useCurrentShapeVariantProgressId";

export const MarkAsLearned = () => {
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

export const ExportProgressFile = () => {
  const { learned } = useProgressStore();
  return (
    <GroupWrapper>
      <Button variant="outline" onClick={() => exportProgress({ learned })}>
        Export progress file
      </Button>
    </GroupWrapper>
  );
};

export const ImportProgressFile = () => {
  const { importData } = useProgressStore();
  return (
    <GroupWrapper>
      <Button variant="outline" onClick={() => importProgress(importData)}>
        Import progress file
      </Button>
    </GroupWrapper>
  );
};
