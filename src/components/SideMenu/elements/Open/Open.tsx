// import { FolderOpen } from "lucide-react";
import { useOpen } from "./useOpen";
import { Button } from "@/components/ui";

export function Open() {
  const { fileInputRef, isPlaying, handleFileChange, handleClick } = useOpen();

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
        {/* <FolderOpen /> */}
        Upload Exercise
      </Button>
    </>
  );
}
