import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import * as S from "./parts";
import { Settings as Gear, RotateCcw } from "lucide-react";
import Tutorial from "./Tutorial/Tutorial";
import ColorsSetting from "./ColorsSetting/ColorsSetting";
import { useSettingsStore } from "@/store/useSettingsStore";
import { ExportProgressFile, ImportProgressFile, MarkAsLearned } from "./Progress/ProgressButtons";

export function Settings() {
  const resetToDefaults = useSettingsStore((state) => state.resetToDefaults);

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button size="icon" className="flex justify-center h-10 w-10" variant="ghost">
          <S.IconHoverSpin>
            <Gear className="h-8 w-8" />
          </S.IconHoverSpin>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <section className="space-y-3">
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
              <ColorsSetting />
            </div>
          </section>
        </div>
        <DrawerFooter>
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
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
