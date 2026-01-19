import { useTutorialStore } from "@/store/useTutorialStore";

export const useTutorialHover = (id: string) => {
  const setActiveById = useTutorialStore((state) => state.setActiveById);

  return {
    onMouseEnter: () => setActiveById(id),
  };
};
