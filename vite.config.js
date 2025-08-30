import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/academie": {
        target: "https://academie.atilf.fr/9/consulter",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/academie/, ""),
        secure: false,
      },
      "/cnrtl": {
        target: "https://www.cnrtl.fr/definition",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cnrtl/, ""),
        secure: false,
      },
      "/larousse": {
        target: "https://www.larousse.fr/dictionnaires/francais",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/larousse/, ""),
        secure: false,
      },
      "/littre": {
        target: "https://www.littre.org/definition",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/littre/, ""),
        secure: false,
      },
      "/robert": {
        target: "https://dictionnaire.lerobert.com/definition",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/robert/, ""),
        secure: false,
      },
    },
  },
});
