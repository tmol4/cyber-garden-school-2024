import { assignVars, createGlobalTheme, globalStyle, style } from "@vanilla-extract/css";
import { theme, THEME } from "~/theme";
import { recipe } from "@vanilla-extract/recipes";

const LIGHT_THEME = theme("light");
const DARK_THEME = theme("dark");

const container = recipe({
  base: {
    display: "contents",
  },
  variants: {
    brightness: {
      auto: {
        colorScheme: "light dark",
        "@media": {
          "(prefers-color-scheme: light)": {
            vars: assignVars(THEME, LIGHT_THEME),
          },
          "(prefers-color-scheme: dark)": {
            vars: assignVars(THEME, DARK_THEME),
          },
        },
      },
      light: {
        colorScheme: "light",
        vars: assignVars(THEME, LIGHT_THEME),
      },
      dark: {
        colorScheme: "dark",
        vars: assignVars(THEME, DARK_THEME),
      },
    },
  },
});

export const styles = {
  container,
} as const;
