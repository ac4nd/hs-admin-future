<template>
  <div class="doc-page relative">
    <!-- 视频背景（仅亮色模式） -->
    <div v-if="!isDark" class="doc-video-bg">
      <video autoplay muted loop playsinline :src="videoSrc" />
      <div class="doc-video-overlay" />
    </div>

    <!-- 内容 -->
    <div class="relative z-10 p-5 space-y-6">
      <DocHero />

      <!-- 架构 + 技术栈 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DocArchitecture :title="t('doc.sections.architecture')" :layers="archLayers" />
        <DocTechStack :title="t('doc.sections.techStack')" :items="techStack" />
      </div>

      <!-- 文件结构 -->
      <DocFileTree :title="t('doc.sections.projectStructure')" :tree="fileTree" />

      <!-- 使用手册 -->
      <DocManual :title="t('doc.sections.manual')" :items="manualItems" />

      <!-- 快速开始 -->
      <DocQuickStart :title="t('doc.sections.quickStart')" :steps="quickStartSteps" />

      <DocFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "@/stores/settings";
import { ThemeMode } from "@/enums/settings";
import videoSrc from "@/assets/images/doc-bg.mp4";
import DocHero from "./components/DocHero.vue";
import DocFooter from "./components/DocFooter.vue";
import DocArchitecture from "./components/DocArchitecture.vue";
import DocTechStack from "./components/DocTechStack.vue";
import DocFileTree from "./components/DocFileTree.vue";
import DocManual from "./components/DocManual.vue";
import DocQuickStart from "./components/DocQuickStart.vue";

const { t } = useI18n();
const settingsStore = useSettingsStore();
const isDark = computed(() => settingsStore.resolvedTheme === ThemeMode.DARK);

const techStack = [
  { name: "uni-app", version: "3.x" },
  { name: "Vue", version: "3.x" },
  { name: "TypeScript", version: "5.x" },
  { name: "Vite", version: "5.x" },
  { name: "uni-ui", version: "latest" },
  { name: "Pinia", version: "2.x" },
];

const archLayers = [
  {
    label: t("doc.mobile.archFramework"),
    nodes: [
      { name: "uni-app 3.x", variant: "primary" as const },
      { name: "Vue 3", variant: "primary" as const },
    ],
  },
  {
    label: t("doc.mobile.archState"),
    nodes: [
      { name: "Pinia", variant: "secondary" as const },
      { name: "pages.json", variant: "secondary" as const },
      { name: "uni-ui", variant: "secondary" as const },
    ],
  },
  {
    label: t("doc.mobile.archCompile"),
    nodes: [
      { name: "微信小程序", variant: "muted" as const },
      { name: "H5", variant: "muted" as const },
      { name: "App", variant: "muted" as const },
    ],
  },
];

const fileTree = `<span style="color:#fff;font-weight:600">src/</span>
├── <span style="color:#fff;font-weight:600">api/</span>            <span style="color:rgba(52,211,153,0.7)"># API 接口定义</span>
├── <span style="color:#fff;font-weight:600">components/</span>     <span style="color:rgba(52,211,153,0.7)"># 公共组件</span>
├── <span style="color:#fff;font-weight:600">composables/</span>    <span style="color:rgba(52,211,153,0.7)"># 组合式函数</span>
├── <span style="color:#fff;font-weight:600">constants/</span>      <span style="color:rgba(52,211,153,0.7)"># 常量定义</span>
├── <span style="color:#fff;font-weight:600">lang/</span>           <span style="color:rgba(52,211,153,0.7)"># 国际化资源</span>
├── <span style="color:#fff;font-weight:600">pages/</span>          <span style="color:rgba(52,211,153,0.7)"># 页面视图</span>
├── <span style="color:#fff;font-weight:600">static/</span>         <span style="color:rgba(52,211,153,0.7)"># 静态资源</span>
├── <span style="color:#fff;font-weight:600">stores/</span>         <span style="color:rgba(52,211,153,0.7)"># Pinia 状态管理</span>
├── <span style="color:#fff;font-weight:600">utils/</span>          <span style="color:rgba(52,211,153,0.7)"># 工具函数</span>
├── App.vue              <span style="color:rgba(52,211,153,0.7)"># 应用入口</span>
├── main.ts              <span style="color:rgba(52,211,153,0.7)"># 主入口文件</span>
├── manifest.json        <span style="color:rgba(52,211,153,0.7)"># uni-app 配置</span>
├── pages.json           <span style="color:rgba(52,211,153,0.7)"># 页面路由配置</span>
└── uni.scss             <span style="color:rgba(52,211,153,0.7)"># 全局样式变量</span>`;

const manualItems = [
  {
    id: "env",
    title: t("doc.mobile.manualEnv"),
    content: `<ul>
<li><strong>Node.js</strong> ≥ 18.x</li>
<li><strong>pnpm</strong> ≥ 8.x</li>
<li><strong>HBuilderX</strong>（推荐）或 VS Code + uni-app 插件</li>
<li><strong>微信开发者工具</strong>（小程序调试必需）</li>
</ul>`,
  },
  {
    id: "multi",
    title: t("doc.mobile.manualMultiPlatform"),
    content: `<p>uni-app 支持一次开发多端编译：</p>
<pre><code><span class="comment"># 微信小程序</span>
<span class="cmd">pnpm dev:mp-weixin</span>

<span class="comment"># H5</span>
<span class="cmd">pnpm dev:h5</span>

<span class="comment"># App（需 HBuilderX）</span>
<span class="cmd">pnpm dev:app</span></code></pre>`,
  },
];

const quickStartSteps = [
  {
    title: t("doc.mobile.step1Title"),
    desc: t("doc.mobile.step1Desc"),
    code: "git clone <repo-url>",
  },
  { title: t("doc.mobile.step2Title"), desc: t("doc.mobile.step2Desc"), code: "pnpm install" },
  {
    title: t("doc.mobile.step3Title"),
    desc: t("doc.mobile.step3Desc"),
    code: "pnpm dev:mp-weixin",
  },
];
</script>

<style scoped>
.doc-page {
  position: relative;
  min-height: 100%;
}
.doc-video-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.doc-video-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.doc-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.4) 40%,
    rgba(255, 255, 255, 0.6) 100%
  );
  backdrop-filter: blur(2px);
}
</style>
