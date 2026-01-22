export const TUTORIAL_CONTENT = {
  KEYBOARD: {
    title: "Keyboard",
    description: `Displays a single instance of the selected key and its functions. 
    It also highlights which specific chord tones of each function are utilized within 
    the currently active shape.`,
    x: 5,
    y: 10,
    animationOrder: 1,
  },
  SCALE_TEMPLATE: {
    title: "Scale Template",
    description:
      "Located above the keyboard. Displays the precise interval templates for Major and Minor keys. It also features numeric indicators showing the specific intervals for each harmonic function.",
    x: 30,
    y: 10,
    animationOrder: 2,
  },
  FRETBOARD: {
    title: "Fretboard",
    description:
      "Highlights the root notes of the selected shape. Tap any root note to cycle through the available shape variants across the neck.",
    x: 5,
    y: 10,
    animationOrder: 3,
  },
  PROGRESS: {
    title: "Progress Bar",
    description:
      "Dots show available variants on each string. Pink means Learned, Blue - In progress.",
    x: 30,
    y: 10,
    animationOrder: 4,
  },
  MODE_TOGGLE: {
    title: "Major/Minor Toggle",
    description:
      "Switches between relative Major and Minor keys. Major provides a 'bright' harmonic feel, while Minor shifts the tonality to a 'dark' characteristic.",
    x: -23,
    y: -6,
    animationOrder: 5,
  },
  KEY_SELECTOR: {
    title: "Key Selector",
    description:
      "Select your tonal center. Keys are organized as relative pairs (e.g., C Major and A Minor), sharing the same scale degrees while shifting the harmonic focus between bright and dark tonalities.",
    x: -23,
    y: -6,
    animationOrder: 6,
  },
  ROLE_SELECTOR: {
    title: "Function Selector",
    description:
      "Toggle between primary harmonic roles: Tonic (Release), Subdominant (Motion) and Dominant (Tension). Each selection filters the notes to show how different degrees drive musical resolution.",
    x: -23,
    y: -6,
    animationOrder: 7,
  },
  SHAPE_SELECTOR: {
    title: "Shape List",
    description:
      "Browse and select specific fretboard patterns. Each shape provides a unique geometric layout of the scale, helping you visualize and master the harmonic landscape across different neck positions.",
    x: -23,
    y: -6,
    animationOrder: 8,
  },
  LOCK_SHAPE: {
    title: "Lock Shape",
    description:
      "Freezes the current fretboard pattern. When active, changing the key or mode will keep the same shape selected, allowing you to compare it with other shapes.",
    x: -23,
    y: -19,
    animationOrder: 9,
  },
  ADD_TO_PROGRESS: {
    title: "Add to Progress",
    description:
      "Adds the shape to your active practice list. Progress is stored in your browser's local memory; it is highly recommended to use Export/Import buttons for regular backups.",
    x: -23,
    y: -19,
    animationOrder: 10,
  },
  ADD_LEARNED: {
    title: "Mark as Learned",
    description:
      "Moves the shape to your mastered archive. Data is stored in your browser's local memory; remember to use Export/Import regularly to back up your progress and prevent data loss.",
    x: -23,
    y: -19,
    animationOrder: 11,
  },
  EXPORT_DATA: {
    title: "Export Progress",
    description:
      "Downloads your progress as a file. Since data is stored locally in your browser, use this regularly to create a secure backup of your learned and active shapes.",
    x: -23,
    y: -19,
    animationOrder: 12,
  },
  IMPORT_DATA: {
    title: "Import Progress",
    description:
      "Restores your progress from a previously saved file. This allows you to recover your learning history or transfer your data across different browsers and devices.",
    x: -23,
    y: -19,
    animationOrder: 13,
  },
} as const;

export type TutorialKey = keyof typeof TUTORIAL_CONTENT;
