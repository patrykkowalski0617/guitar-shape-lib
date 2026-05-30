import { useOpen } from "./useOpen";
import { Button } from "@/components/ui";

interface OpenProps {
  onClose?: () => void;
}

export function Open({ onClose }: OpenProps) {
  const { fileInputRef, isPlaying, handleFileChange, handleClick } =
    useOpen(onClose);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: "none" }}
      />
      <Button $w={2.5} onClick={handleClick} disabled={isPlaying}>
        Upload Exercise
      </Button>
    </>
  );
}
