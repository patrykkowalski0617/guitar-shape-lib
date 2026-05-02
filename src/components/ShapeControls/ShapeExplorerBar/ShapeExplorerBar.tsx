import ShapeExplorerSlider from "@/components/ShapeControls/ShapeExplorer/ShapeExplorerSlider/ShapeExplorerSlider";
import { CleanButton } from "@/components/ShapeControls/ShapeExplorerBar/CleanButton/CleanButton";
import { AddBrickButton } from "@/components/ShapeControls/ShapeExplorerBar/AddBrickButton/AddBrickButton";

export const ShapeExplorerBar = () => {
  return (
    <div className="flex justify-center items-center gap-5">
      <ShapeExplorerSlider />
      <CleanButton />
      <AddBrickButton />
    </div>
  );
};
