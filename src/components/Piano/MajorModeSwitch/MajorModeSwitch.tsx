import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useControlsStore } from "@/store/useControlsStore";
import * as S from "./parts";

export function MajorModeSwitch() {
  const isMajorMode = useControlsStore((state) => state.isMajorMode);
  const setIsMajorMode = useControlsStore((state) => state.setIsMajorMode);

  return (
    <S.ControlContainer>
      <div className="flex items-center space-x-2">
        <Switch id="major-mode-switch" checked={isMajorMode} onCheckedChange={(checked) => setIsMajorMode(checked)} />
        <Label htmlFor="major-mode-switch" className="text-muted-foreground font-light">
          {isMajorMode ? "Major Mode" : "Minor Mode"}
        </Label>
      </div>
    </S.ControlContainer>
  );
}
