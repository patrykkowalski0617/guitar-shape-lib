export const TUTORIAL_CONTENT = {
  KEYBOARD: {
    title: "Piano",
    description: `Visualizes a single instance of function and scale.

#Regular Color
Shows the current key notes or - when function is selected - all function intervals from 1 to 13.

#Primary Color
Indicates specific arpeggio/scale notes.

#Conflict Markers
Notes outside the functional scale are marked with "!".

#Scale Basis
Major Mode: 
Tonic - Ionian Scale, 
Subdominant - Lydian Scale, 
Dominant - Mixolydian Scale.

Minor Mode: 
Tonic - Aeolian Scale, 
Subdominant - Dorian Scale, 
Dominant - Phrygian Dominant Scale`,
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
