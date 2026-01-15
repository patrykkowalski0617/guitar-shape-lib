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
        <Button style={{ height: "40px" }} variant="outline">
          <Gear />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>

          <DescriptiveLabelsSelect />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
