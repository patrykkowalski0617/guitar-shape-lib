import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import { GroupWrapper } from "../ControlsContainer/parts";

export const ExportProgressFileButton = () => {
  const { learned } = useProgressStore();
  return (
    <GroupWrapper>
      <Button variant="outline" onClick={() => exportProgress({ learned })}>
        Export progress file
      </Button>
    </GroupWrapper>
  );
};

export const ImportProgressFileButton = () => {
  const { importData } = useProgressStore();
  return (
    <GroupWrapper>
      <Button variant="outline" onClick={() => importProgress(importData)}>
        Import progress file
      </Button>
    </GroupWrapper>
  );
};
