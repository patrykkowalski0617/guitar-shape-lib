import { useMetronomeStore } from "@/store/useMetronomeStore";

export const useMetronomeButton = () => {
  const togglePlay = useMetronomeStore((state) => state.togglePlay);

  return { handleMetronomeToggle: togglePlay };
};
