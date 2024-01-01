import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vanillaExtractPlugin(), svgr(), tsconfigPaths(), react()],
  assetsInclude: ["**/*.gltf", "**/*.glb"],
});
