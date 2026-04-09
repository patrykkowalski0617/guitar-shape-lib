import { usePlayerStore } from "@/store";

export const useCleanBricks = () => {
  const setBricks = usePlayerStore((state) => state.setBricks);

  return () => {
    setBricks([]);
  };
};
