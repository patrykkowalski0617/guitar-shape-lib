import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import TutorialPopover from "../TutorialPopover/TutorialPopover";
import { TUTORIAL_CONTENT } from "../TutorialPopover/tutorial.config";

export const ProgressActions = () => {
  const { learned, learning, importData } = useProgressStore();
  return (
    <>
      <div className="flex flex-col relative">
        <TutorialPopover {...TUTORIAL_CONTENT.EXPORT_DATA} />
        <Button
          variant="outline"
          className="min-w-[211px]"
          onClick={() => exportProgress({ learned, learning })}
        >
          Export progress file
        </Button>
      </div>
      <div className="flex flex-col relative">
        <TutorialPopover {...TUTORIAL_CONTENT.IMPORT_DATA} />
        <Button
          variant="outline"
          className="min-w-[211px]"
          onClick={() => importProgress(importData)}
        >
          Import progress file
        </Button>
      </div>
    </>
  );
};
