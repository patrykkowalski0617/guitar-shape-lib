import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "../ui/button";
import { useFretboardShapes } from "../Fretboard/helpers/useFretboardShapes";

export const ShapeStatusButtons = () => {
  const { currentVariantId } = useFretboardShapes();
  const { learned, learning, toggleLearned, toggleLearning } = useProgressStore();

  const isLearned = currentVariantId ? learned.includes(currentVariantId) : false;
  const isLearning = currentVariantId ? learning.includes(currentVariantId) : false;

  return (
    <>
      <Button
        variant={isLearning ? "secondary" : "outline"}
        className="min-w-[211px]"
        disabled={!currentVariantId}
        onClick={() => currentVariantId && toggleLearning(currentVariantId)}
      >
        {isLearning ? "In progress" : "Add to 'In progress'"}
      </Button>
      <Button
        variant={isLearned ? "default" : "outline"}
        className="min-w-[211px]"
        disabled={!currentVariantId}
        onClick={() => currentVariantId && toggleLearned(currentVariantId)}
      >
        {isLearned ? "Got it! This shape is learned" : "Add to 'Learned'"}
      </Button>
    </>
  );
};
