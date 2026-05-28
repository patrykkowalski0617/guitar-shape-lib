import { useUiStore } from "@/store";

export const useEdit = () => {
  const toggleIsEditShapeView = useUiStore((s) => s.toggleIsEditShapeView);
  const isEditShapeView = useUiStore((s) => s.isEditShapeView);

  const handleEdit = () => {
    toggleIsEditShapeView();
  };

  return { handleEdit, isEditShapeView };
};
