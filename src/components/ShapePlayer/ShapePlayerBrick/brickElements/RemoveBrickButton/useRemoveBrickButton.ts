import { useShapePlayerStore } from "@/store";

export const useRemoveBrickButton = (id: string) => {
  const removeShapePlayerBrick = useShapePlayerStore(
    (state) => state.removeShapePlayerBrick,
  );

  const handleRemoveClick = () => {
    removeShapePlayerBrick(id);
  };

  return { handleRemoveClick };
};
