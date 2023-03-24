import { defineConfig } from "vite";
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "^/academie/.*": {
        target: "https://academie.atilf.fr/9/consulter",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/academie/, ""),
      },
      "^/cnrtl/.*": {
        target: "https://www.cnrtl.fr/definition",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cnrtl/, ""),
      },
      "^/larousse/.*": {
        target: "https://www.larousse.fr/dictionnaires/francais",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/larousse/, ""),
      },
      "^/littre/.*": {
        target: "https://www.littre.org/definition",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/littre/, ""),
      },
      "^/robert/.*": {
        target: "https://dictionnaire.lerobert.com/definition",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/robert/, ""),
      },
    },
  },
  plugins: [splitVendorChunkPlugin()],
});
