import { useProgressStore } from "@/store/useProgressStore";
import { exportProgress, importProgress } from "./helpers/progressHelpers";
import { Button } from "@/components/ui/button";
import * as S from "@/components/Settings/Progress/parts";

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
