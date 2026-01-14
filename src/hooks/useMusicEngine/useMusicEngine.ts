import { useEffect } from "react";
import { useControlsStore } from "@/store/useControlsStore";
import { useMusicStore } from "@/store/useMusicStore";
import { generateScaleSteps, getStepsCountForFunction } from "@/utils";

export const useMusicEngine = () => {
  const currentMusicFunctionId = useControlsStore((s) => s.currentMusicFunctionId);
  const setActiveScaleSteps = useMusicStore((s) => s.setActiveScaleSteps);

  useEffect(() => {
    const count = getStepsCountForFunction(currentMusicFunctionId);
    setActiveScaleSteps(generateScaleSteps(count));
  }, [currentMusicFunctionId, setActiveScaleSteps]);
};
