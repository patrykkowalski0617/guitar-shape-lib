import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import { useTutorialHover } from "../TutorialBox/helpers/useTutorialHover";

export const ProgressActions = () => {
  const { learned, learning, importData } = useProgressStore();
  const tutorialHover_importData = useTutorialHover("import-data");
  const tutorialHover_exportData = useTutorialHover("export-data");

  return (
    <>
      <div {...tutorialHover_exportData}>
        <Button
          variant="outline"
          className="min-w-[211px]"
          onClick={() => exportProgress({ learned, learning })}
        >
          Export progress file
        </Button>
      </div>
      <div {...tutorialHover_importData}>
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
