export interface SettingsState {
  isFullscreen: boolean;
  setIsFullscreen: (val: boolean) => void;
  isRotated: boolean;
  setIsRotated: (val: boolean) => void;
  resetToDefaults: () => void;
}
