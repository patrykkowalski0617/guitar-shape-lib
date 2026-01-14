import { useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { generateScaleSteps, getStepsCountForFunction } from "@/utils";

export const useMusicEngine = () => {
  const currentRoleId = useControlsStore((s) => s.currentRoleId);
  const setActiveScaleSteps = useMusicStore((s) => s.setActiveScaleSteps);

  useEffect(() => {
    const count = getStepsCountForFunction(currentRoleId);
    setActiveScaleSteps(generateScaleSteps(count));
  }, [currentRoleId, setActiveScaleSteps]);
};
