import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/common/components"),
      "@constants": path.resolve(__dirname, "./src/common/constants"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@providers": path.resolve(__dirname, "./src/common/providers"),
      "@httpClient": path.resolve(
        __dirname,
        "./src/common/httpClient/index.ts"
      ),
      "@utils": path.resolve(__dirname, "./src/common/utils"),
      "@models": path.resolve(__dirname, "./src/common/models"),
      "@repositories": path.resolve(__dirname, "./src/common/repositories"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
