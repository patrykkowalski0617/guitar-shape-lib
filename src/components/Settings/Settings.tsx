import { Settings as Gear, RotateCcw } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Button } from "@/components/ui/button";
import * as S from "./parts";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DescriptiveLabelsSelect from "./DescriptiveLabelsSelect/DescriptiveLabelsSelect";
import Animations from "./Animations/Animations";
import Tutorial from "./Tutorial/Tutorial";

export function Settings() {
  const resetToDefaults = useSettingsStore((state) => state.resetToDefaults);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" className="flex justify-center h-10 w-10">
          <S.IconHoverSpin>
            <Gear className="h-8 w-8" />
          </S.IconHoverSpin>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="border-b mb-4">
            <DrawerTitle className="text-2xl font-bold">Settings</DrawerTitle>
          </DrawerHeader>

          <div
            className="px-4 py-2 space-y-6"
            style={{
              userSelect: "none",
            }}
          >
            <section className="space-y-3">
              <div className="px-6 py-2">
                <DescriptiveLabelsSelect />
              </div>
              <div className="px-6 py-2">
                <Animations />
              </div>
              <div className="px-6 py-2">
                <Tutorial />
              </div>
            </section>
          </div>

          <DrawerFooter className="mt-4 border-t pt-4 flex flex-col gap-2">
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => {
                if (window.confirm("Restore all settings to default?")) {
                  resetToDefaults();
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <RotateCcw className="h-4 w-4" />
                <span> Restore Defaults</span>
              </span>
            </Button>

            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
