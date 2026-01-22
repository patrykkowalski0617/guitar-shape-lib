import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";
import { GroupWrapper } from "../ControlsContainer/parts";

export const ProgressActions = () => {
  const { learned, learning, importData } = useProgressStore();
  return (
    <>
      <GroupWrapper>
        <TutorialPopover {...TUTORIAL_CONTENT.EXPORT_DATA} />
        <Button variant="outline" onClick={() => exportProgress({ learned, learning })}>
          Export progress file
        </Button>
      </GroupWrapper>
      <GroupWrapper>
        <TutorialPopover {...TUTORIAL_CONTENT.IMPORT_DATA} />
        <Button variant="outline" onClick={() => importProgress(importData)}>
          Import progress file
        </Button>
      </GroupWrapper>
    </>
  );
};
