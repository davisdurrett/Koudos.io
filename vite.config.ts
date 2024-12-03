import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const conditionalPlugins = [];

if (process.env.TEMPO) {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

export default defineConfig({
  plugins: [
    react({
      plugins: [...conditionalPlugins],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
