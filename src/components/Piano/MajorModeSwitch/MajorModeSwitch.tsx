import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useControlsStore } from "@/store/useControlsStore";
import * as S from "./parts";
import { useMusicStore } from "@/store/useMusicStore";

export function MajorModeSwitch() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);
  const setCurrentShapeVariantLocationData = useMusicStore((state) => state.setCurrentShapeVariantLocationData);

  const handleValueChange = (checked: boolean) => {
    setCurrentShapeVariantLocationData(null);
    setIsMajorMode(checked);
  };

  return (
    <S.ControlContainer>
      <div className="flex items-center space-x-2">
        <Switch id="major-mode-switch" checked={isMajorMode} onCheckedChange={handleValueChange} />
        <Label htmlFor="major-mode-switch" className="text-muted-foreground font-light">
          {isMajorMode ? "Relative Major" : "Relative Minor"}
        </Label>
      </div>
    </S.ControlContainer>
  );
}
