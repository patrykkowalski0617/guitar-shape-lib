import { create } from "zustand";

export interface TutorialItem {
  id: string;
  title: string;
  description: string;
}

export const tutorialData: TutorialItem[] = [
  {
    id: "app-overview",
    title: "Guitar Solo Shapes Library",
    description:
      "An interactive library mapping harmonic functions (Tonic, Subdominant, and Dominant) onto fretboard shapes. Master the geometry of soloing by visualizing how theory drives musical resolution.",
  },
  {
    id: "keyboard",
    title: "Keyboard",
    description:
      "Displays a single instance of the selected key and its functions. It also highlights which specific chord tones of each function are utilized within the currently active shape.",
  },
  {
    id: "scale-template",
    title: "Scale Template",
    description:
      "Displays the precise interval templates for Major and Minor keys. It also features numeric indicators showing the specific intervals for each harmonic function.",
  },
  {
    id: "fretboard",
    title: "Fretboard",
    description:
      "Highlights the root notes of the selected shape. Tap any root note to cycle through the available shape variants across the neck.",
  },
  {
    id: "mode-toggle",
    title: "Major/Minor Toggle",
    description:
      "Switches between relative Major and Minor keys. Major provides a 'bright' harmonic feel, while Minor shifts the tonality to a 'dark' characteristic.",
  },
  {
    id: "key-selector",
    title: "Key Selector",
    description:
      "Select your tonal center. Keys are organized as relative pairs (e.g., C Major and A Minor), sharing the same scale degrees while shifting the harmonic focus between bright and dark tonalities.",
  },
  {
    id: "function-selector",
    title: "Function Selector",
    description:
      "Toggle between primary harmonic roles: Tonic (Release), Subdominant (Motion), and Dominant (Tension). Each selection filters the notes to show how different degrees drive musical resolution.",
  },
  {
    id: "shape-list",
    title: "Shape List",
    description:
      "Browse and select specific fretboard patterns. Each shape provides a unique geometric layout of the scale, helping you visualize and master the harmonic landscape across different neck positions.",
  },
  {
    id: "lock-shape",
    title: "Lock Shape",
    description:
      "Freezes the current fretboard pattern. When active, changing the key or mode will keep the same shape selected, allowing you to compare it with other shapes.",
  },
  {
    id: "add-to-progress",
    title: "Add to Progress",
    description:
      "Adds the shape to your active practice list. Progress is stored in your browser's local memory; it is highly recommended to use Export/Import buttons for regular backups.",
  },
  {
    id: "mark-as-learned",
    title: "Mark as Learned",
    description:
      "Moves the shape to your mastered archive. Data is stored in your browser's local memory; remember to use Export/Import regularly to back up your progress and prevent data loss.",
  },
  {
    id: "export-data",
    title: "Export Progress",
    description:
      "Downloads your progress as a file. Since data is stored locally in your browser, use this regularly to create a secure backup of your learned and active shapes.",
  },
  {
    id: "import-data",
    title: "Import Progress",
    description:
      "Restores your progress from a previously saved file. This allows you to recover your learning history or transfer your data across different browsers and devices.",
  },
];

interface TutorialState {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setActiveById: (id: string) => void;
}

export const useTutorialStore = create<TutorialState>((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
  setActiveById: (id) => {
    const index = tutorialData.findIndex((item) => item.id === id);
    if (index !== -1) set({ activeIndex: index });
  },
}));
