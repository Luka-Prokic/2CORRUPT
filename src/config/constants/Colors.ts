export type Themes =
  | "light"
  | "oldschool"
  | "peachy"
  | "dark"
  | "preworkout"
  | "Corrupted";

export const Colors = {
  light: {
    // Text
    text: "#1C1C1E",
    secondaryText: "#FFFFFF",
    grayText: "#8E8E93",
    handle: "#D1D1D6",

    // Backgrounds
    background: "#F2F2F7",
    navBackground: "#FFFFFF",
    primaryBackground: "#FFFFFF",
    secondaryBackground: "#FAFAFA",
    thirdBackground: "#A1C6FF",
    fourthBackground: "#FF6F6F",
    fifthBackground: "#FF6F61",

    // Accents
    accent: "#4C4F51",
    tint: "#007AFF",
    secondaryAccent: "#FF4C3B", // bright coral/red |
    thirdAccent: "#EFD9C3", // lighter beige / sand
    fourthAccent: "#FFB37A", //  peach orange
    fifthAccent: "#FFC75F", // golden accent |

    // Misc
    shadow: "#1C1C1E",
    glow: "#F2F2F7",
    caka: "#FFD60A",
    error: "#FF3B30",
    border: "#F2F2F7",
    input: "#FFFFFF",
    info: "#8E8E93",
  },

  peachy: {
    // Text
    text: "#2C2C2E",
    secondaryText: "#FFFFFF",
    grayText: "#8E8E93",
    handle: "#D1D1D6",

    // Backgrounds
    background: "#F5F5F5",
    navBackground: "#FFFFFF",
    primaryBackground: "#F7D1A6",
    secondaryBackground: "#FBE9E4",
    thirdBackground: "#F9C1B6",
    fourthBackground: "#B7D8F7",
    fifthBackground: "#C2A7D6",

    // Accents
    accent: "#E82F8A",
    tint: "#00B5E2",
    secondaryAccent: "#FFA0C0", // medium pink |
    thirdAccent: "#FFC1DD", // pastel pink
    fourthAccent: "#FDC5E6", //  very light pink
    fifthAccent: "#FFB6E3", // soft blush |

    // Misc
    shadow: "#1C1C1E",
    glow: "#F2F2F7",
    caka: "#FFD60A",
    error: "#FF3B30",
    border: "#F2F2F7",
    input: "#FFFFFF",
    info: "#8E8E93",
  },

  oldschool: {
    // Text
    text: "#1C1C1E",
    secondaryText: "#FFFFFF",
    grayText: "#8E8E93",
    handle: "#D1D1D6",

    // Backgrounds
    background: "#FFFEF6",
    navBackground: "#FFFEF6",
    primaryBackground: "#F5F5F7",
    secondaryBackground: "#F9F9E1",
    thirdBackground: "#E8B475",
    fourthBackground: "#FF8C8C",
    fifthBackground: "#483E3D",

    // Accents
    accent: "#4B6A88",
    tint: "#E60046",
    secondaryAccent: "#7B3E57", // muted burgundy
    thirdAccent: "#C2C0B6", // light warm gray (magazine paper)
    fourthAccent: "#6B4C3B", // deep brown |
    fifthAccent: "#A69F7C", // vintage gold/beige |

    // Misc
    shadow: "#1C1C1E",
    glow: "#F2F2F7",
    caka: "#FFD60A",
    error: "#FF3B30",
    border: "#F2F2F7",
    input: "#FFFFFF",
    info: "#8E8E93",
  },

  dark: {
    // Text
    text: "#FFFFFF",
    secondaryText: "#000000",
    grayText: "#A9A9A9",
    handle: "#3A3A3C",

    // Backgrounds
    background: "#000000",
    navBackground: "#333333",
    primaryBackground: "#3A3A3C",
    secondaryBackground: "#222222",
    thirdBackground: "#4A6A7F",
    fourthBackground: "#8A8580",
    fifthBackground: "#E5E5EA", // iOS light surface inside dark UI

    // Accents
    accent: "#FFFF33",
    tint: "#A78BFA",
    secondaryAccent: "#33FFAA", //  greenish |
    thirdAccent: "#5C5C60", // graphite gray
    fourthAccent: "#FF6EFF", // magenta
    fifthAccent: "#7B3E57", //  burgundy |

    // Misc
    shadow: "#FFFFFF",
    glow: "#F2F2F7",
    caka: "#FFD60A",
    error: "#FF3B30",
    border: "#2F2F31",
    input: "#1C1C1E",
    info: "#D1D1D6",
  },

  preworkout: {
    // Text
    text: "#FFFFFF",
    secondaryText: "#000000",
    grayText: "#8E8E93",
    handle: "#3A3A3C",

    // Backgrounds
    background: "#000000",
    navBackground: "#1C1C1E",
    primaryBackground: "#222222",
    secondaryBackground: "#2A262B",
    thirdBackground: "#FF5E57",
    fourthBackground: "#333333",
    fifthBackground: "#FFD700",

    // Accents
    accent: "#00FF88",
    tint: "#F9C1B6",
    secondaryAccent: "#F1FFF0", // almost-white with green bias
    thirdAccent: "#EFD9C3", //   toxic green |
    fourthAccent: "#66FF00", // nightvision green
    fifthAccent: "#FF4C4C", // coral red |

    // Misc
    shadow: "#FFFFFF",
    glow: "#F2F2F7",
    caka: "#FFFF33",
    error: "#FF3B30",
    border: "#2F2F31",
    input: "#1C1C1E",
    info: "#D1D1D6",
  },

  Corrupted: {
    // Text
    text: "#FFFFFF",
    secondaryText: "#1C1C1C",
    grayText: "#A9A9A9",
    handle: "#3A3A3C",

    // Backgrounds
    background: "#000000",
    navBackground: "#090909",
    primaryBackground: "#1A1A1A",
    secondaryBackground: "#282828",
    thirdBackground: "#9E2A2A",
    fourthBackground: "#B4F8D8",
    fifthBackground: "#D0D0D0",

    // Accents
    accent: "#A6F7E5",
    tint: "#FF3B30",
    secondaryAccent: "#FFC0C0", // very light red |
    thirdAccent: "#6F6F6F", // anti-dracula gunmetal
    fourthAccent: "#FF8C8C", // pastel red
    fifthAccent: "#FF6F6F", //  red |

    // Misc
    shadow: "#FFFFFF",
    glow: "#F2F2F7",
    caka: "#FFD60A",
    error: "#FF3B30",
    border: "#2F2F31",
    input: "#1C1C1E",
    info: "#D1D1D6",
  },
};
