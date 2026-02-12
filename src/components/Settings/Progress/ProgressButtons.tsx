import { useProgressStore } from "@/store/useProgressStore";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import { useCurrentShapeVariantProgressId } from "@/hooks/useCurrentShapeVariantProgressId";
import { TUTORIAL_CONTENT } from "@/components/TutorialPopover/tutorial.config";
import TutorialPopover from "@/components/TutorialPopover/TutorialPopover";
import { Button } from "@/components/ui/button";
import * as S from "@/components/Settings/parts";

export const MarkAsLearned = () => {
  const { learned, toggleLearned } = useProgressStore();
  const currentVariantProgressId = useCurrentShapeVariantProgressId();

  const isLearned = currentVariantProgressId ? learned.includes(currentVariantProgressId) : false;
  const txtIsLearnedTrue = "This shape is learned";
  const txtIsLearnedFalse = "Mark current shape as 'Learned'";

  return (
    <S.ControlWrapper>
      <TutorialPopover {...TUTORIAL_CONTENT.ADD_LEARNED} />
      <Button
        variant={isLearned ? "active" : "outline"}
        disabled={!currentVariantProgressId}
        onClick={() => currentVariantProgressId && toggleLearned(currentVariantProgressId)}
        fixedWidthLabel={txtIsLearnedFalse}
      >
        {isLearned ? txtIsLearnedTrue : txtIsLearnedFalse}
      </Button>
    </S.ControlWrapper>
  );
};

export const ExportProgressFile = () => {
  const { learned } = useProgressStore();
  return (
    <S.ControlWrapper>
      <Button variant="outline" onClick={() => exportProgress({ learned })}>
        Export progress file
      </Button>
    </S.ControlWrapper>
  );
};

export const ImportProgressFile = () => {
  const { importData } = useProgressStore();
  return (
    <S.ControlWrapper>
      <Button variant="outline" onClick={() => importProgress(importData)}>
        Import progress file
      </Button>
    </S.ControlWrapper>
  );
};
