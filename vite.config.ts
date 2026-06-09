import vue from "@vitejs/plugin-vue";
import { type ConfigEnv, type UserConfig, loadEnv, defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

const pathSrc = resolve(import.meta.dirname, "src");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: true,
      proxy: env.VITE_APP_BASE_API
        ? {
            [env.VITE_APP_BASE_API]: {
              changeOrigin: true,
              target: env.VITE_APP_API_URL || "http://localhost:8080",
              rewrite: (path: string) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ""),
            },
          }
        : undefined,
    },
    plugins: [
      vue(),
      tailwindcss(),
      // API 自动导入
      AutoImport({
        imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        vueTemplate: true,
        dts: "src/types/auto-imports.d.ts",
      }),
      // 组件自动导入
      Components({
        dirs: ["src/components", "src/**/components"],
        dts: "src/types/components.d.ts",
      }),
    ],
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "@vueuse/core",
        "lodash-es",
        "echarts/core",
        "echarts/renderers",
        "echarts/charts",
        "echarts/components",
        "vue-i18n",
        "nprogress",
        "sortablejs",
        "qs",
        "path-browserify",
        "path-to-regexp",
        "vue-sonner",
      ],
    },
    build: {
      chunkSizeWarningLimit: 1200,
      reportCompressedSize: false,
      rolldownOptions: {
        output: {
          entryFileNames: "js/[name].[hash].js",
          chunkFileNames: "js/[name].[hash].js",
          assetFileNames: (assetInfo: any) => {
            if (!assetInfo.name) {
              return "assets/[name].[hash][extname]";
            }
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },
  };
});
