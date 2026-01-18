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
        size="sm"
        disabled={!currentVariantId}
        onClick={() => currentVariantId && toggleLearning(currentVariantId)}
      >
        {isLearning ? "In progress" : "Add to 'In progress'"}
      </Button>
      <Button
        variant={isLearned ? "default" : "outline"}
        size="sm"
        disabled={!currentVariantId}
        onClick={() => currentVariantId && toggleLearned(currentVariantId)}
      >
        {isLearned ? "Got it! (this shape is on 'Learned')" : "Add to 'learned list'"}
      </Button>
    </>
  );
};
