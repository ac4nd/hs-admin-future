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

      <!-- API 文档入口 -->
      <GlassCard class="flex items-center gap-3 px-5 py-4">
        <FileJsonIcon class="size-5 text-emerald-400 shrink-0" />
        <div class="flex-1">
          <p class="text-sm font-medium">{{ t("doc.backend.apiDocs") }}</p>
          <p class="text-xs text-muted-foreground">{{ t("doc.backend.apiDocsHint") }}</p>
        </div>
        <code class="text-xs bg-black/25 px-2.5 py-1 rounded-md border border-white/6">
          /doc.html
        </code>
      </GlassCard>

      <DocFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FileJsonIcon } from "@lucide/vue";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "@/stores/settings";
import { ThemeMode } from "@/enums/settings";
import videoSrc from "@/assets/images/doc-bg.mp4";
import GlassCard from "@/components/glass/GlassCard.vue";
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
  { name: "Java", version: "17" },
  { name: "Spring Boot", version: "4.0.5" },
  { name: "Spring Security", version: "6.x" },
  { name: "MyBatis-Plus", version: "3.5.15" },
  { name: "PostgreSQL", version: "16.4" },
  { name: "Redis", version: "7.2" },
  { name: "MapStruct", version: "1.6.3" },
  { name: "Knife4j", version: "4.5.0" },
];

const archLayers = [
  {
    label: t("doc.backend.archController"),
    nodes: [
      { name: "REST API", variant: "primary" as const },
      { name: "Knife4j 文档", variant: "primary" as const },
      { name: "AOP 切面", variant: "primary" as const },
    ],
  },
  {
    label: t("doc.backend.archService"),
    nodes: [
      { name: "业务逻辑", variant: "secondary" as const },
      { name: "MapStruct 转换", variant: "secondary" as const },
      { name: "缓存策略", variant: "secondary" as const },
    ],
  },
  {
    label: t("doc.backend.archData"),
    nodes: [
      { name: "MyBatis-Plus", variant: "muted" as const },
      { name: "PostgreSQL", variant: "muted" as const },
      { name: "Redis", variant: "muted" as const },
    ],
  },
];

const fileTree = `<span style="color:#fff;font-weight:600">src/main/java/com/hypersense/boot/</span>
├── <span style="color:#fff;font-weight:600">auth/</span>            <span style="color:rgba(52,211,153,0.7)"># 认证模块（JWT、短信、微信登录）</span>
├── <span style="color:#fff;font-weight:600">system/</span>          <span style="color:rgba(52,211,153,0.7)"># 核心业务（用户、角色、菜单、字典、租户）</span>
├── <span style="color:#fff;font-weight:600">framework/</span>       <span style="color:rgba(52,211,153,0.7)"># 基础设施（Security、多租户、数据权限、缓存）</span>
├── <span style="color:#fff;font-weight:600">common/</span>          <span style="color:rgba(52,211,153,0.7)"># 公共组件（基类、统一响应、异常处理、AOP）</span>
├── <span style="color:#fff;font-weight:600">codegen/</span>         <span style="color:rgba(52,211,153,0.7)"># 代码生成器</span>
├── <span style="color:#fff;font-weight:600">file/</span>            <span style="color:rgba(52,211,153,0.7)"># 文件管理（MinIO / OSS / 本地存储）</span>
└── <span style="color:#fff;font-weight:600">message/</span>         <span style="color:rgba(52,211,153,0.7)"># 实时消息（SSE 推送）</span>

<span style="color:#fff;font-weight:600">src/main/resources/</span>
├── <span style="color:#fff;font-weight:600">mapper/</span>          <span style="color:rgba(52,211,153,0.7)"># MyBatis XML</span>
├── <span style="color:#fff;font-weight:600">templates/</span>       <span style="color:rgba(52,211,153,0.7)"># 代码生成模板（Velocity）</span>
└── application.yml     <span style="color:rgba(52,211,153,0.7)"># 配置文件</span>`;

const manualItems = [
  {
    id: "env",
    title: t("doc.backend.manualEnv"),
    content: `<ul>
<li><strong>JDK</strong> 17（必须，项目使用 Spring Boot 4.0）</li>
<li><strong>Maven</strong> ≥ 3.8</li>
<li><strong>Docker</strong> + Docker Compose（运行 PostgreSQL、Redis、MinIO 等基础设施）</li>
<li><strong>IDE</strong>：IntelliJ IDEA（推荐）+ Lombok 插件</li>
</ul>`,
  },
  {
    id: "infra",
    title: t("doc.backend.manualInfra"),
    content: `<p>项目依赖 Docker 运行数据库和中间件：</p>
<pre><code><span class="comment"># 启动全部基础设施</span>
<span class="cmd">docker-compose -f docker/docker-compose.yml -p godlikeagents up -d</span>

<span class="comment"># 查看服务状态</span>
<span class="cmd">docker-compose -f docker/docker-compose.yml ps</span>

<span class="comment"># PostgreSQL: 5432 | Redis: 6379 | MinIO: 9000/9001</span></code></pre>`,
  },
  {
    id: "codegen",
    title: t("doc.backend.manualCodeGen"),
    content: `<p>项目内置代码生成器，可快速生成前后端 CRUD 代码：</p>
<ul>
<li>访问「系统工具 → 代码生成」页面</li>
<li>选择数据库表，配置生成选项（包名、模块名、作者）</li>
<li>一键生成：Entity、Mapper、Service、Controller、前端页面、API 接口</li>
<li>基于 Velocity 模板引擎，模板在 <code>src/main/resources/templates/</code></li>
</ul>`,
  },
  {
    id: "tenant",
    title: t("doc.backend.manualTenant"),
    content: `<ul>
<li>数据库行级隔离：通过 <code>tenant_id</code> 字段 + MyBatis-Plus 拦截器自动拼接租户条件</li>
<li>租户上下文：<code>TenantContextHolder</code> 基于 <code>TransmittableThreadLocal</code> 传播到异步线程</li>
<li>跳过租户过滤：方法上标注 <code>@IgnoreTenant</code> 注解</li>
<li>数据权限：使用 <code>@DataPermission</code> 注解声明式控制（ALL / DEPT / SELF / CUSTOM）</li>
</ul>`,
  },
];

const quickStartSteps = [
  {
    title: t("doc.backend.step1Title"),
    desc: t("doc.backend.step1Desc"),
    code: "docker-compose -f docker/docker-compose.yml up -d",
  },
  {
    title: t("doc.backend.step2Title"),
    desc: t("doc.backend.step2Desc"),
    code: "mvn clean package",
  },
  {
    title: t("doc.backend.step3Title"),
    desc: t("doc.backend.step3Desc"),
    code: "java -jar target/godlikeagents.jar",
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
