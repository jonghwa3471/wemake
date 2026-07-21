import { pixelBasedPreset, type TailwindConfig } from "react-email";

export default {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      fontFamily: {
        github: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
    },
  },
} satisfies TailwindConfig;
