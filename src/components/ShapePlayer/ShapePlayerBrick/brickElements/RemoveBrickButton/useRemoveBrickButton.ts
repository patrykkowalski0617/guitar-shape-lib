import { useShapePlayerStore } from "@/store";

export const useRemoveBrickButton = (id: string) => {
  const removeShapePlayerBrick = useShapePlayerStore(
    (s) => s.removeShapePlayerBrick,
  );

  const handleRemoveClick = () => {
    removeShapePlayerBrick(id);
  };

  return { handleRemoveClick };
};
