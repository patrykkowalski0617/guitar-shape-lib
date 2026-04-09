import { usePlayerStore, useMusicStore } from "@/store";
export function useAddBrick() {
  const shapeVariantLocationData = useMusicStore(
    (state) => state.shapeVariantLocationData,
  );
  const setShapeVariantLocationData_locked = useMusicStore(
    (state) => state.setShapeVariantLocationData_locked,
  );

  const addBrick = () => {
    const playerStore = usePlayerStore.getState();
    playerStore.addBrick();

    setShapeVariantLocationData_locked(shapeVariantLocationData);
  };

  return { addBrick };
}
