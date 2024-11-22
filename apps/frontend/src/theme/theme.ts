import { createTheme } from "@star4/vanilla-extract";


type FontFamily = (string | FontFamily)[];

const fontFamily = (...args: FontFamily): string => {
  return args
    .map(
      value => typeof value === "string"
        ? value.includes(" ")
          ? `"${value}"`
          : value
        : fontFamily(...value),
    )
    .join(", ");
}

const fontSource = (family: string) => [`${family}`, `${family} Variable`];

export const { contract, theme } = createTheme({
  color: {
    variant: "content",
    sourceColor: "#3aaa35",
  },
  typeface: {
    brand: fontFamily(fontSource("Recursive"), fontSource("Roboto Flex"), "Helvetica", "sans-serif"),
    plain: fontFamily(fontSource("Open Sans"), fontSource("Roboto Flex"), "Roboto",  "system-ui", "Arial", "sans-serif"),
  },
  component: {
    materialSymbol: {
      font: fontFamily("Material Symbols Outlined Variable"),
    },
  }
});
