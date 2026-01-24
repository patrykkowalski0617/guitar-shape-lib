export const TUTORIAL_CONTENT = {
  KEYBOARD: {
    title: "Keyboard",
    description: `It is designed to visualize the relationship between the key, harmonic functions, and shape notes. 

    The app demonstrates that notes for each function are built by extending the key template and selecting every second note from the correct starting point: the Tonic is based on the 1st degree, the Subdominant on the 4th, and the Dominant on the 5th degree of any key.
  
    You will also notice that each shape exposes different functional notes and sometimes even notes that do not belong to the function directly – these are called alterations.`,
    x: 5,
    y: 0,
    animationOrder: 1,
  },
  SCALE_TEMPLATE: {
    title: "Scale Template",
    description: `Select a function to observe changes in the template located above the keyboard. It illustrates the two fundamental templates that represent Major and Minor scales in any key. Furthermore, every Major key has a relative Minor key which contains the exact same notes, but in a different order.

Numeric indicators highlight the specific intervals for each harmonic function shown on the keyboard below.

Intervals 1 and 5 have a 'transparent' character, while 3 and 7 are known as 'guide tones' and provide more harmonic color. The 9th, in most cases, is also very 'colorful'. Regarding the 11th and 13th – certain notes among them are sometimes referred to as 'avoid notes' due to their dissonant characteristics.`,

    x: 30,
    y: 0,
    animationOrder: 2,
  },
  FRETBOARD: {
    title: "Fretboard",
    description: `Once a function is selected, the system highlights the root notes of the chosen shape on the fretboard diagram. You can then tap any root note to cycle through the available shape variants across the neck. 
    
    Next to each root note, you will find dots representing the available variants of each shape. When you save a variant, its dot changes color to indicate your status: Subdominant color (Pink by default) for 'In Progress' and Tonic (Blue by default) for 'Learned'`,
    x: 5,
    y: 0,
    animationOrder: 3,
  },
  MODE_TOGGLE: {
    title: "Major/Minor Toggle",
    description: `Switches between relative Major and Minor keys. While Major provides a 'bright' harmonic feel, Minor shifts the tonality toward a 'darker' character.`,
    x: -23,
    y: -6,
    animationOrder: 4,
  },
  KEY_SELECTOR: {
    title: "Key Selector",
    description: `Select your tonal center. Keys are organized as relative pairs (e.g., C Major and A Minor), sharing the same scale degrees while shifting the harmonic focus between bright and dark tonalities.`,
    x: -23,
    y: -6,
    animationOrder: 5,
  },
  ROLE_SELECTOR: {
    title: "Function Selector",
    description: `Toggle between the primary harmonic roles of the selected key: Tonic (Release), Subdominant (Motion), and Dominant (Tension). Each selection filters the available shapes to display only those that belong to the chosen function.`,
    x: -23,
    y: -6,
    animationOrder: 6,
  },
  SHAPE_SELECTOR: {
    title: "Shape List",
    description: `Browse and select specific fretboard patterns. The first part of each shape's name represents the note name, and the second represents the actual shape. Each shape provides a unique geometric layout of the scale, helping you visualize and master the harmonic landscape across different neck positions and functions.
    
    You will notice that the list of shapes is not endless (about 9 aprs / 9 scales in current app version), as the same shape can be placed on different root notes. The Tonic and Subdominant share most shapes, acting as a 'release group' in contrast to the 'tension' of the Dominant. 

    Explore arpeggios first if you want a more melodic approach. 
    `,
    x: -23,
    y: -6,
    animationOrder: 7,
  },
  LOCK_SHAPE: {
    title: "Lock Shape",
    description: `Freezes the current fretboard pattern. When active, changing the key or mode will keep the same shape variant selected, allowing you to compare its geometry across different tonal centers.`,
    x: -23,
    y: -19,
    animationOrder: 8,
  },
  ADD_TO_PROGRESS: {
    title: "Add to Progress",
    description: `Adds the current shape and its selected variant to your practice list. Your progress is stored locally in the browser's memory. To prevent data loss, it is highly recommended to use the Export and Import buttons for regular backups.`,
    x: -23,
    y: -19,
    animationOrder: 9,
  },
  ADD_LEARNED: {
    title: "Add to Learned",
    description: `Adds the current shape and its selected variant to your 'Learned' list. Your data is stored locally in the browser's memory. Remember to use the Export and Import features regularly to back up your progress and prevent potential data loss.`,
    x: -23,
    y: -19,
    animationOrder: 10,
  },
  EXPORT_DATA: {
    title: "Export Progress",
    description: `Downloads your progress as a file. Since all data is stored locally in your browser, use this feature regularly to create a secure backup of your learned and active shapes.`,
    x: -23,
    y: -19,
    animationOrder: 11,
  },
  IMPORT_DATA: {
    title: "Import Progress",
    description: `Restores your progress from a previously saved file. This allows you to recover your learning history or seamlessly transfer your data across different browsers and devices.`,
    x: -23,
    y: -19,
    animationOrder: 12,
  },
} as const;

export type TutorialKey = keyof typeof TUTORIAL_CONTENT;
