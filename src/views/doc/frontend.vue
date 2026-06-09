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
  { name: "Vue", version: "3.5" },
  { name: "TypeScript", version: "6.x" },
  { name: "Vite", version: "6.x" },
  { name: "Pinia", version: "3.x" },
  { name: "Vue Router", version: "4.x" },
  { name: "Tailwind CSS", version: "4.x" },
  { name: "shadcn-vue", version: "latest" },
  { name: "reka-ui", version: "2.x" },
];

const archLayers = [
  {
    label: t("doc.frontend.archView"),
    nodes: [
      { name: "Vue 3.5", variant: "primary" as const },
      { name: "Vue Router 4", variant: "primary" as const },
      { name: "Pinia 3", variant: "primary" as const },
    ],
  },
  {
    label: t("doc.frontend.archUI"),
    nodes: [
      { name: "shadcn-vue", variant: "secondary" as const },
      { name: "reka-ui", variant: "secondary" as const },
      { name: "Tailwind CSS 4", variant: "secondary" as const },
    ],
  },
  {
    label: t("doc.frontend.archBuild"),
    nodes: [
      { name: "Vite 6", variant: "muted" as const },
      { name: "TypeScript", variant: "muted" as const },
      { name: "pnpm", variant: "muted" as const },
    ],
  },
];

const fileTree = `<span style="color:#fff;font-weight:600">src/</span>
├── <span style="color:#fff;font-weight:600">api/</span>            <span style="color:rgba(52,211,153,0.7)"># API 接口定义</span>
├── <span style="color:#fff;font-weight:600">assets/</span>         <span style="color:rgba(52,211,153,0.7)"># 静态资源</span>
├── <span style="color:#fff;font-weight:600">components/</span>     <span style="color:rgba(52,211,153,0.7)"># 公共组件</span>
│   └── <span style="color:#fff;font-weight:600">ui/</span>         <span style="color:rgba(52,211,153,0.7)"># shadcn-vue 组件</span>
├── <span style="color:#fff;font-weight:600">composables/</span>    <span style="color:rgba(52,211,153,0.7)"># 组合式函数</span>
├── <span style="color:#fff;font-weight:600">constants/</span>      <span style="color:rgba(52,211,153,0.7)"># 常量定义</span>
├── <span style="color:#fff;font-weight:600">enums/</span>          <span style="color:rgba(52,211,153,0.7)"># 枚举类型</span>
├── <span style="color:#fff;font-weight:600">lang/</span>           <span style="color:rgba(52,211,153,0.7)"># 国际化资源</span>
├── <span style="color:#fff;font-weight:600">layouts/</span>        <span style="color:rgba(52,211,153,0.7)"># 布局组件</span>
├── <span style="color:#fff;font-weight:600">lib/</span>            <span style="color:rgba(52,211,153,0.7)"># 工具库</span>
├── <span style="color:#fff;font-weight:600">router/</span>         <span style="color:rgba(52,211,153,0.7)"># 路由配置</span>
├── <span style="color:#fff;font-weight:600">settings/</span>       <span style="color:rgba(52,211,153,0.7)"># 全局配置</span>
├── <span style="color:#fff;font-weight:600">stores/</span>         <span style="color:rgba(52,211,153,0.7)"># Pinia 状态管理</span>
├── <span style="color:#fff;font-weight:600">styles/</span>         <span style="color:rgba(52,211,153,0.7)"># 全局样式</span>
├── <span style="color:#fff;font-weight:600">utils/</span>          <span style="color:rgba(52,211,153,0.7)"># 工具函数</span>
└── <span style="color:#fff;font-weight:600">views/</span>          <span style="color:rgba(52,211,153,0.7)"># 页面视图</span>`;

const manualItems = [
  {
    id: "env",
    title: t("doc.frontend.manualEnv"),
    content: `<p>开始开发前，请确保本地已安装以下工具：</p>
<ul>
<li><strong>Node.js</strong> ≥ 18.x（推荐 20.x LTS）</li>
<li><strong>pnpm</strong> ≥ 8.x（项目指定包管理器，<code>npm i -g pnpm</code>）</li>
<li><strong>Git</strong> ≥ 2.30</li>
<li><strong>VS Code</strong> + 推荐插件：Vue - Official、Tailwind CSS IntelliSense、i18n Ally</li>
</ul>
<pre><code><span class="comment"># 验证环境</span>
<span class="cmd">node -v && pnpm -v && git --version</span></code></pre>`,
  },
  {
    id: "config",
    title: t("doc.frontend.manualConfig"),
    content: `<p>克隆项目后，需要配置开发环境连接后端 API：</p>
<ul>
<li>复制 <code>.env.development</code> 为本地配置</li>
<li>修改 <code>VITE_API_URL</code> 指向后端地址（默认 <code>http://localhost:8000</code>）</li>
<li>后端 API 通过 Vite proxy 代理转发，避免跨域问题</li>
</ul>
<pre><code><span class="comment"># .env.development</span>
<span class="cmd">VITE_API_URL=/dev-api</span>

<span class="comment"># vite.config.ts proxy</span>
<span class="cmd">proxy: {
  '/dev-api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: path => path.replace(/^\\/dev-api/, '')
  }
}</span></code></pre>`,
  },
  {
    id: "dev",
    title: t("doc.frontend.manualDev"),
    content: `<p>项目遵循以下开发规范和流程：</p>
<ul>
<li><strong>组件规范</strong>：使用 <code>&lt;script setup lang="ts"&gt;</code> + Composition API</li>
<li><strong>样式方案</strong>：Tailwind CSS 4 + CSS Variables 主题切换</li>
<li><strong>状态管理</strong>：Pinia Setup Store 风格（<code>defineStore('name', () =&gt; {})</code>）</li>
<li><strong>API 层</strong>：<code>src/api/</code> 按模块拆分，统一使用 <code>request.ts</code> 封装的 axios 实例</li>
<li><strong>路由</strong>：静态路由在 <code>router/index.ts</code>，动态路由由后端接口返回后通过 <code>router.addRoute()</code> 注册</li>
<li><strong>i18n</strong>：所有用户可见文案使用 <code>vue-i18n</code> 的 <code>t()</code> 函数，语言包在 <code>src/lang/package/</code></li>
</ul>`,
  },
  {
    id: "newPage",
    title: t("doc.frontend.manualNewPage"),
    content: `<p>开发新功能页面的完整步骤：</p>
<ul>
<li>在 <code>src/views/</code> 下创建页面组件（如 <code>views/system/notice/index.vue</code>）</li>
<li>在 <code>src/api/</code> 下创建对应 API 模块（如 <code>api/system/notice/index.ts</code>）</li>
<li>在 <code>src/router/dynamicRoutes.ts</code> 添加路由配置</li>
<li>在后台「菜单管理」中创建对应菜单项，分配权限给角色</li>
<li>在 <code>src/lang/package/zh-cn.json</code> 和 <code>en.json</code> 中添加 i18n 键值</li>
</ul>`,
  },
  {
    id: "faq",
    title: t("doc.frontend.manualFaq"),
    content: `<ul>
<li><strong>登录后菜单为空</strong>：检查角色是否分配了菜单权限，确认 <code>sys_tenant_menu</code> 中有对应记录</li>
<li><strong>i18n-ally 报 key-missing</strong>：检查 <code>.vscode/settings.json</code> 中 <code>i18n-ally.localesPaths</code> 是否为 <code>src/lang/package</code></li>
<li><strong>组件样式不生效</strong>：确认 Tailwind 类名是否被 <code>tailwind.config.js</code> 的 content 扫描到</li>
</ul>`,
  },
];

const quickStartSteps = [
  {
    title: t("doc.frontend.step1Title"),
    desc: t("doc.frontend.step1Desc"),
    code: "git clone <repo-url> hs-admin-future",
  },
  {
    title: t("doc.frontend.step2Title"),
    desc: t("doc.frontend.step2Desc"),
    code: "cd hs-admin-future && pnpm install",
  },
  { title: t("doc.frontend.step3Title"), desc: t("doc.frontend.step3Desc"), code: "pnpm dev" },
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
