import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";
import { useUiStore } from "@/store";
import { color } from "@/components/ui";
import { KeyAndChordPicker } from "../KeyAndChordPicker/KeyAndChordPicker";
import ShapePicker from "../ShapePicker/ShapePicker";

const overlayShow = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const contentShow = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 500;
  animation: ${overlayShow} 150ms ease-out;
`;

const Content = styled(Dialog.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
  background-color: ${color.bg};
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;

export function PickerDialog() {
  const isKeyAndChordPickerExpanded = useUiStore(
    (s) => s.isKeyAndChordPickerExpanded,
  );
  const setKeyAndChordPickerExpanded = useUiStore(
    (s) => s.setKeyAndChordPickerExpanded,
  );
  const isShapePickerExpanded = useUiStore((s) => s.isShapePickerExpanded);
  const setShapePickerExpanded = useUiStore((s) => s.setShapePickerExpanded);

  const isOpen = isKeyAndChordPickerExpanded || isShapePickerExpanded;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setKeyAndChordPickerExpanded(false);
      setShapePickerExpanded(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title style={{ display: "none" }}>Picker</Dialog.Title>
          <Dialog.Description style={{ display: "none" }} />
          {isKeyAndChordPickerExpanded && <KeyAndChordPicker />}
          {isShapePickerExpanded && <ShapePicker />}
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
