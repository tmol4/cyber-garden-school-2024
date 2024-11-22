import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin as vanillaExtract } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtract(),
  ],
})
