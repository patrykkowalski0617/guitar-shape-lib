import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";

export const ProgressActions = () => {
  const { learned, learning, importData } = useProgressStore();

  return (
    <>
      <Button
        variant="outline"
        className="min-w-[211px]"
        onClick={() => exportProgress({ learned, learning })}
      >
        Export progress file
      </Button>
      <Button
        variant="outline"
        className="min-w-[211px]"
        onClick={() => importProgress(importData)}
      >
        Import progress file
      </Button>
    </>
  );
};
