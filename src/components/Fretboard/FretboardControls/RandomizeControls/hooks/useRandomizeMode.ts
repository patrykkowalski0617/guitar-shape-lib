import { useControlsStore } from "@/store/useControlsStore";

export const useRandomizeMode = () => {
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  const setRandomMode = () => {
    const randomIsMajorMode = Math.random() > 0.5;
    setIsMajorMode(randomIsMajorMode);

    return randomIsMajorMode;
  };

  return setRandomMode;
};
