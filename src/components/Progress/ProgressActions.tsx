import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";

export const ProgressActions = () => {
  const { learned, learning, importData } = useProgressStore();

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => exportProgress({ learned, learning })}>
        Export progress file
      </Button>
      <Button variant="outline" size="sm" onClick={() => importProgress(importData)}>
        Import progress file
      </Button>
    </>
  );
};
