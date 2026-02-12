import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import * as S from "./parts";
import { Settings as Gear, RotateCcw } from "lucide-react";
import Tutorial from "./Tutorial/Tutorial";
import { ExportProgressFile, ImportProgressFile, MarkAsLearned } from "./Progress/ProgressButtons";
import ColorsPresetsSetting from "./ColorsPresetsSetting/ColorsPresetsSetting";
import ColorsSetting from "./ColorsSetting/ColorsSetting";
import { useSettingsStore } from "@/store/useSettingsStore";

const side = "right";

export function Settings() {
  const resetToDefaults = useSettingsStore((state) => state.resetToDefaults);

  return (
    <div className="flex flex-wrap gap-2">
      <Sheet key={side}>
        <SheetTrigger asChild>
          <Button size="icon" className="flex justify-center h-10 w-10" variant="ghost">
            <S.IconHoverSpin>
              <Gear className="h-8 w-8" />
            </S.IconHoverSpin>
          </Button>
        </SheetTrigger>

        <SheetContent side={side} className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]">
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="no-scrollbar overflow-y-auto px-4">
            <div className="px-6 py-2">
              <Tutorial />
            </div>
            <div className="px-6 py-2">
              <MarkAsLearned />
            </div>
            <div className="px-6 py-2">
              <ExportProgressFile />
            </div>
            <div className="px-6 py-2">
              <ImportProgressFile />
            </div>
            <div className="px-6 py-2">
              <ColorsPresetsSetting />
            </div>
            <div className="px-6 py-2">
              <ColorsSetting />
            </div>
          </div>
          <SheetFooter>
            <Button
              variant="outlineActive"
              className="w-full text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => {
                if (window.confirm("Restore all settings to default?")) {
                  resetToDefaults();
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span>Restore Defaults</span>
              </span>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
