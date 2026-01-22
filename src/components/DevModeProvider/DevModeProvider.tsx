import { useEffect } from "react";
import { useDevStore } from "@/store/useDevStore";

export const DevModeProvider = () => {
  const toggleDevMode = useDevStore((state) => state.toggleDevMode);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        toggleDevMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleDevMode]);

  return null;
};
