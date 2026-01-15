import { Button } from "@/components/ui/button";
import { Settings as Gear } from "lucide-react";

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

export function Settings() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 !bg-card hover:!bg-accent"
        >
          <Gear className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="border-b mb-4">
            <DrawerTitle className="text-2xl font-bold tracking-tight">Settings</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 py-2 space-y-6">
            <section className="space-y-3">
              <div className="px-6 py-8">
                <DescriptiveLabelsSelect />
              </div>
            </section>
          </div>

          <DrawerFooter className="mt-4 border-t pt-4">
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
