export const TUTORIAL_CONTENT = {
  KEYBOARD: {
    title: "Keyboard",
    description: `It is designed to visualize the relationship between the key, harmonic functions, and the specific chord or scale.

Unlike the fretboard, which displays every possible arpeggio or scale position across the neck, this view provides a single, clear instance of each note set.

Highlighted keys represent the notes belonging to the selected Key.

Color-coded keys marked with numbers identify the specific intervals of the chosen Function.

Keys with offset labels (shifted downwards) indicate the notes belonging to the selected arpeggio or scale.
`,
    x: 10,
    y: 0,
  },
  FRETBOARD: {
    title: "Fretboard",
    description: `Once a function is selected, the app highlights the root notes of the chosen arpeggio or scale. You can then tap any root note to cycle through the available shape variants across the neck.`,
    x: 10,
    y: 0,
  },
  MODE_TOGGLE: {
    title: "Major/Minor Toggle",
    description: `Switches between relative Major (bright feeling) and Minor (dark mood) keys.`,
    x: -23,
    y: -6,
  },
  KEY_SELECTOR: {
    title: "Key Selector",
    description: `Select your tonal center. Keys are organized as relative pairs (e.g., C Major and A Minor), which means they share the same notes.`,
    x: -23,
    y: -6,
  },
  ROLE_SELECTOR: {
    title: "Function Selector",
    description: `Toggle between the primary harmonic roles of the selected key: Tonic (Release), Subdominant (Motion), and Dominant (Tension). Each selection filters the available shapes to display only those that belong to the chosen function.`,
    x: -23,
    y: -6,
  },
  SHAPE_SELECTOR: {
    title: "Arpegio/Scale (Shapes) List",
    description: `Browse and select specific fretboard patterns. The first part of each shape's name represents its root note, second part describe pattern.`,
    x: -23,
    y: -6,
  },
  LOCK_SHAPE: {
    title: "Lock Shape",
    description: `Freezes the current fretboard pattern. When active, changing the mode, key or function will keep the shape locked, allowing you to compare its geometry with other shapes.`,
    x: -23,
    y: -19,
  },
  ADD_LEARNED: {
    title: "Add to Learned",
    description: `Adds the current shape and its selected variant to your 'Learned' list. Your data is stored locally in the browser's memory. Remember to use the Export and Import features regularly to back up your progress and prevent potential data loss.`,
    x: -23,
    y: -19,
  },
} as const;

export type TutorialKey = keyof typeof TUTORIAL_CONTENT;
