import { defineConfig } from "vite";
import { resolve } from "path";

// Renaming all imported plugins to follow our naming convention
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";
import { TanStackRouterVite as tanStackRouter } from "@tanstack/router-plugin/vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    vanillaExtract(),
    tanStackRouter({
      quoteStyle: "double",
      semicolons: true,
    }),
    {
      enforce: "pre",
      ...mdx({}),
    },
    // react({include: /\.(jsx|js|mdx|md|tsx|ts)$/}),
    react(),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
})
