export const TUTORIAL_CONTENT = {
  KEYBOARD: {
    title: "Piano",
    description: `It is designed to visualize the relationship between the key, function, and the specific arpeggio/scale.

Unlike the fretboard, which displays every possible arpeggio/scale variant across the neck, this view provides a single, clear instance of key, function and arpeggio/scale.

# Highlighted keys represent the notes belonging to the selected key.
# Color-coded keys marked with numbers identify the specific intervals of the chosen function.
# Keys with labels indicate the notes belonging to the selected arpeggio/scale.
`,
    x: 10,
    y: 0,
  },
  FRETBOARD: {
    title: "Fretboard",
    description: `Once a function is selected, the app highlights all corresponding root notes. Interact with any root note to reveal available shape variants, then select a numbered dot to display it. 
    
    Clicking the active dot again will toggle it as "learned" to track your progress.`,
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
    title: "Arpeggio/Scale (Shapes) List",
    description: `Browse and select specific fretboard patterns. The first part of each shape's name represents its root note, second part describe pattern.`,
    x: -23,
    y: -6,
  },
  LOCK_SHAPE: {
    title: "Lock Shape",
    description: `Freezes the selected shape on fretboard. When active, changing the mode, key or function will keep the shape locked, allowing you to compare its geometry with other shapes.`,
    x: -23,
    y: -19,
  },
} as const;

export type TutorialKey = keyof typeof TUTORIAL_CONTENT;
