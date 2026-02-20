import { useMusicStore } from "@/store/useMusicStore";
import { useProgressStore } from "@/store/useProgressStore";
import { ControlWrapper } from "@/parts";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export function AddToList() {
  const { learned, toggleLearned } = useProgressStore();
  const currentLocation = useMusicStore((state) => state.currentShapeVariantLocationData);

  const currentId = currentLocation
    ? `${currentLocation.shapeId}-${currentLocation.stringId}-${currentLocation.variantId}`
    : null;

  const isFavorite = !!(currentId && learned.includes(currentId));

  const handleToggle = () => {
    if (currentId) {
      toggleLearned(currentId);
      toast(!isFavorite ? "Added to favorites/learned." : "Removed from favorites/learned.");
    }
  };

  return (
    <ControlWrapper>
      <Button variant={isFavorite ? "active" : "outline"} onClick={handleToggle} disabled={!currentId}>
        <span className="flex items-center justify-center">
          <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-current" : "opacity-50"}`} />
        </span>
      </Button>
    </ControlWrapper>
  );
}
