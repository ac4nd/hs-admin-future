<template>
  <div class="p-5 space-y-5">
    <!-- 问候区 -->
    <Card>
      <CardContent class="pt-2">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 class="text-xl font-bold">
              {{ greetingEmoji }}
              {{ t("dashboard.greeting.message", { greeting: greetingText, name: displayName }) }}
            </h1>
            <p class="text-sm text-muted-foreground mt-1">{{ currentDate }}</p>
          </div>
          <div class="flex items-center gap-3">
            <a
              v-for="link in shortcutLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <MenuIcon :icon="link.icon" class="size-3.5" />
              <span>{{ link.label }}</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="(stat, index) in stats" :key="index">
        <CardHeader class="pb-2">
          <p class="text-sm text-muted-foreground flex items-center gap-1.5">
            <MenuIcon :icon="stat.icon" class="size-4" />
            {{ stat.title }}
          </p>
        </CardHeader>
        <CardContent>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-2xl font-bold tabular-nums">{{ stat.displayValue }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ stat.desc }}</p>
            </div>
            <Badge
              v-if="stat.growth !== 0"
              :variant="stat.growth > 0 ? 'secondary' : 'outline'"
              :class="stat.growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'"
            >
              {{ stat.growth > 0 ? "+" : "" }}{{ stat.growth }}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 最近访问 -->
    <Card>
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm flex items-center gap-1.5">
            <MenuIcon icon="Clock" class="size-4" />
            {{ t("dashboard.recentVisit.title") }}
          </CardTitle>
          <Button
            v-if="recentMenus.length"
            variant="ghost"
            size="sm"
            class="h-7 text-xs"
            @click="clearRecentMenus"
          >
            {{ t("dashboard.recentVisit.clear") }}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div v-if="recentMenus.length" class="flex flex-wrap gap-2">
          <Button
            v-for="menu in recentMenus"
            :key="menu.path"
            variant="outline"
            size="sm"
            class="h-8 text-xs"
            @click="router.push(menu.path)"
          >
            <MenuIcon :icon="menu.icon" class="size-3.5 mr-1" /> {{ menu.title }}
          </Button>
        </div>
        <p v-else class="text-sm text-muted-foreground">{{ t("dashboard.recentVisit.empty") }}</p>
      </CardContent>
    </Card>

    <!-- 访问趋势（独占一行） -->
    <Card>
      <CardHeader class="pb-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <CardTitle class="text-sm flex items-center gap-1.5">
              <MenuIcon icon="TrendingUp" class="size-4" />
              {{ t("dashboard.trend.title") }}
            </CardTitle>
            <!-- 图例 -->
            <div class="flex items-center gap-4 text-xs text-muted-foreground">
              <span class="flex items-center gap-1">
                <span class="inline-block w-3 h-0.5 rounded bg-yellow-500" />
                {{ t("dashboard.trend.pv") }}
              </span>
              <span class="flex items-center gap-1">
                <span class="inline-block w-3 h-0.5 rounded bg-blue-500" />
                {{ t("dashboard.trend.uv") }}
              </span>
            </div>
          </div>
          <div class="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              class="h-7 text-xs"
              :class="{ 'bg-muted': trendRange === 7 }"
              @click="trendRange = 7"
            >
              {{ t("dashboard.trend.days7") }}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              class="h-7 text-xs"
              :class="{ 'bg-muted': trendRange === 30 }"
              @click="trendRange = 30"
            >
              {{ t("dashboard.trend.days30") }}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <!-- 加载状态 -->
        <div v-if="trendLoading" class="flex items-center justify-center" style="height: 220px">
          <p class="text-sm text-muted-foreground">{{ t("dashboard.trend.loading") }}</p>
        </div>
        <!-- 无数据 -->
        <div v-else-if="!trendData.dates.length" class="flex items-center justify-center" style="height: 220px">
          <p class="text-sm text-muted-foreground">{{ t("dashboard.trend.noData") }}</p>
        </div>
        <!-- SVG 曲线图 -->
        <div v-else class="w-full" style="height: 220px">
          <svg
            :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
            class="w-full h-full"
            preserveAspectRatio="none"
            style="overflow: visible"
          >
            <defs>
              <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#eab308" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#eab308" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
              </linearGradient>
            </defs>
            <!-- 网格线 -->
            <line
              v-for="i in 4"
              :key="'grid-' + i"
              :x1="paddingLeft"
              :y1="paddingTop + (chartHeight / 4) * (i - 1)"
              :x2="svgWidth - paddingRight"
              :y2="paddingTop + (chartHeight / 4) * (i - 1)"
              stroke="currentColor"
              stroke-opacity="0.08"
              stroke-dasharray="4 4"
            />
            <!-- PV 填充区域 -->
            <path v-if="pvAreaPath" :d="pvAreaPath" fill="url(#pvGrad)" />
            <!-- UV 填充区域 -->
            <path v-if="uvAreaPath" :d="uvAreaPath" fill="url(#uvGrad)" />
            <!-- PV 曲线 -->
            <path
              v-if="pvCurvePath"
              :d="pvCurvePath"
              fill="none"
              stroke="#eab308"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <!-- UV 曲线 -->
            <path
              v-if="uvCurvePath"
              :d="uvCurvePath"
              fill="none"
              stroke="#3b82f6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <!-- 日期标签 -->
        <div v-if="trendData.dates.length" class="flex justify-between mt-1 text-xs text-muted-foreground overflow-hidden">
          <span>{{ trendData.dates[0] }}</span>
          <span>{{ trendData.dates[trendData.dates.length - 1] }}</span>
        </div>
      </CardContent>
    </Card>

    <!-- 待办事项 + 系统动态（并排一行） -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- 待办事项 -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-sm flex items-center gap-1.5">
            <MenuIcon icon="CheckSquare" class="size-4" />
            {{ t("dashboard.todo.title") }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div
              v-for="(todo, index) in todos"
              :key="index"
              class="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Badge :variant="todo.priorityVariant" class="text-[10px] px-1.5 py-0">
                {{ todo.priority }}
              </Badge>
              <span class="text-sm">{{ todo.text }}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 系统动态 -->
      <Card>
        <CardHeader class="pb-3">
          <CardTitle class="text-sm flex items-center gap-1.5">
            <MenuIcon icon="Activity" class="size-4" />
            {{ t("dashboard.activity.title") }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div v-if="logLoading" class="text-sm text-muted-foreground text-center py-4">
            {{ t("dashboard.activity.loading") }}
          </div>
          <div v-else-if="activities.length === 0" class="text-sm text-muted-foreground text-center py-4">
            {{ t("dashboard.activity.noData") }}
          </div>
          <div v-else class="space-y-3">
            <div v-for="(activity, index) in activities" :key="index" class="flex gap-3 text-sm">
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 rounded-full mt-1.5" :class="activity.dotColor" />
                <div v-if="index < activities.length - 1" class="w-px flex-1 bg-border mt-1" />
              </div>
              <div class="flex-1 pb-3">
                <p class="text-foreground">{{ activity.text }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Dashboard", inheritAttrs: false });

import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTransition } from "@vueuse/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores";
import LogAPI from "@/api/system/log";
import type { LogItem, VisitTrendDetail, VisitOverviewDetail } from "@/api/system/log/types";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const userStore = useUserStore();

// ==================== 问候区 ====================

const displayName = computed(() => userStore.userInfo.nickname || userStore.userInfo.username || "Admin");

const greetingEmoji = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) return "🌙";
  if (hour < 8) return "🌅";
  if (hour < 11) return "☀️";
  if (hour < 13) return "🌞";
  if (hour < 17) return "🌤️";
  if (hour < 19) return "🌇";
  if (hour < 22) return "🌆";
  return "🌙";
});

const greetingText = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) return t("dashboard.greeting.midnight");
  if (hour < 8) return t("dashboard.greeting.dawn");
  if (hour < 11) return t("dashboard.greeting.morning");
  if (hour < 13) return t("dashboard.greeting.noon");
  if (hour < 17) return t("dashboard.greeting.afternoon");
  if (hour < 19) return t("dashboard.greeting.dusk");
  if (hour < 22) return t("dashboard.greeting.evening");
  return t("dashboard.greeting.midnight");
});

const currentDate = computed(() => {
  const now = new Date();
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const enDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  if (locale.value === "zh-cn") {
    return `${now.getFullYear()}年${String(now.getMonth() + 1).padStart(2, "0")}月${String(now.getDate()).padStart(2, "0")}日 星期${days[now.getDay()]}`;
  }
  return `${enDays[now.getDay()]}, ${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
});

const shortcutLinks = computed(() => [
  { icon: "GitBranch", label: t("dashboard.shortcut.repository"), url: "https://github.com" },
  { icon: "FileText", label: t("dashboard.shortcut.document"), url: "https://github.com" },
  { icon: "PlayCircle", label: t("dashboard.shortcut.video"), url: "https://github.com" },
]);

// ==================== 统计卡片（API 数据） ====================

const overview = ref<VisitOverviewDetail>({
  todayUvCount: 0,
  totalUvCount: 0,
  uvGrowthRate: 0,
  todayPvCount: 0,
  totalPvCount: 0,
  pvGrowthRate: 0,
});

const todayVisitors = ref(0);
const todayViews = ref(0);

const displayVisitors = useTransition(todayVisitors, { duration: 1200 });
const displayViews = useTransition(todayViews, { duration: 1200 });

async function fetchOverview() {
  try {
    const data = await LogAPI.getVisitOverview();
    if (data) {
      overview.value = data;
      todayVisitors.value = data.todayUvCount ?? 0;
      todayViews.value = data.todayPvCount ?? 0;
    }
  } catch (error) {
    console.error("[Dashboard] 获取访问概览失败:", error);
  }
}

function formatGrowthRate(rate: number): number {
  if (!rate && rate !== 0) return 0;
  return Math.round(rate * 10000) / 100;
}

const stats = computed(() => [
  {
    title: t("dashboard.stats.onlineUsers"),
    icon: "Users",
    displayValue: overview.value.totalUvCount?.toLocaleString() ?? "0",
    growth: 0,
    desc: t("dashboard.stats.live"),
  },
  {
    title: t("dashboard.stats.todayVisitors"),
    icon: "UserCheck",
    displayValue: Math.round(displayVisitors.value).toLocaleString(),
    growth: formatGrowthRate(overview.value.uvGrowthRate),
    desc: t("dashboard.stats.vsYesterday"),
  },
  {
    title: t("dashboard.stats.todayViews"),
    icon: "Eye",
    displayValue: Math.round(displayViews.value).toLocaleString(),
    growth: formatGrowthRate(overview.value.pvGrowthRate),
    desc: t("dashboard.stats.vsYesterday"),
  },
  {
    title: t("dashboard.stats.systemUsers"),
    icon: "ShieldCheck",
    displayValue: overview.value.totalPvCount?.toLocaleString() ?? "0",
    growth: 0,
    desc: t("dashboard.stats.vsLastMonth"),
  },
]);

// ==================== 最近访问 ====================

interface RecentMenu {
  path: string;
  title: string;
  icon: string;
}

const recentMenus = ref<RecentMenu[]>([]);

function loadRecentMenus() {
  try {
    const raw = localStorage.getItem("recentMenus");
    if (raw) recentMenus.value = JSON.parse(raw);
  } catch {
    recentMenus.value = [];
  }
}

function saveRecentMenus() {
  localStorage.setItem("recentMenus", JSON.stringify(recentMenus.value));
}

function clearRecentMenus() {
  recentMenus.value = [];
  localStorage.removeItem("recentMenus");
}

watch(
  () => route.path,
  (path) => {
    if (!path || path === "/" || path === "/dashboard") return;
    const title = (route.meta?.title as string) ?? "";
    const icon = (route.meta?.icon as string) ?? "";
    if (!title) return;
    const list = recentMenus.value.filter((m) => m.path !== path);
    list.unshift({ path, title, icon });
    recentMenus.value = list.slice(0, 8);
    saveRecentMenus();
  }
);

onMounted(loadRecentMenus);

// ==================== 访问趋势图（API 数据） ====================

const trendRange = ref(7);
const trendLoading = ref(false);
const trendData = ref<VisitTrendDetail>({ dates: [], pvList: [], uvList: [] });

async function fetchTrend() {
  trendLoading.value = true;
  try {
    const now = new Date();
    const end = now.toISOString().split("T")[0];
    const start = new Date(now);
    start.setDate(start.getDate() - trendRange.value + 1);
    const startStr = start.toISOString().split("T")[0];
    const data = await LogAPI.getVisitTrend({ startDate: startStr, endDate: end });
    if (data) trendData.value = data;
  } catch (error) {
    console.error("[Dashboard] 获取访问趋势失败:", error);
  } finally {
    trendLoading.value = false;
  }
}

watch(trendRange, () => fetchTrend());

// SVG 图表尺寸参数
const svgWidth = 500;
const svgHeight = 200;
const paddingLeft = 0;
const paddingRight = 0;
const paddingTop = 15;
const paddingBottom = 15;
const chartWidth = svgWidth - paddingLeft - paddingRight;
const chartHeight = svgHeight - paddingTop - paddingBottom;

function toPoints(data: number[]) {
  if (data.length < 2) return [];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = (max - min) || 1;
  // 上下留 10% 余量，避免贝塞尔控制点溢出
  const margin = range * 0.1;
  const adjustedRange = range + margin * 2;
  return data.map((v, i) => ({
    x: paddingLeft + (i / (data.length - 1)) * chartWidth,
    y: paddingTop + chartHeight - ((v - min + margin) / adjustedRange) * chartHeight,
  }));
}

// Catmull-Rom → 三次贝塞尔曲线，生成平滑 path
function toSmoothPath(data: number[]): string {
  const pts = toPoints(data);
  if (pts.length < 2) return "";
  if (pts.length === 2) {
    return `M${pts[0].x},${pts[0].y} L${pts[1].x},${pts[1].y}`;
  }

  const tension = 0.3;
  let d = `M${pts[0].x},${pts[0].y}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function toSmoothAreaPath(data: number[]): string {
  const curve = toSmoothPath(data);
  if (!curve) return "";
  const baseY = paddingTop + chartHeight;
  const lastPt = toPoints(data).at(-1)!;
  const firstPt = toPoints(data)[0];
  return `${curve} L${lastPt.x},${baseY} L${firstPt.x},${baseY} Z`;
}

const pvCurvePath = computed(() => toSmoothPath(trendData.value.pvList));
const uvCurvePath = computed(() => toSmoothPath(trendData.value.uvList));
const pvAreaPath = computed(() => toSmoothAreaPath(trendData.value.pvList));
const uvAreaPath = computed(() => toSmoothAreaPath(trendData.value.uvList));

// ==================== 待办事项（保留静态） ====================

const todos = computed(() => [
  { text: "审批 - 用户权限申请", priority: "紧急", priorityVariant: "destructive" as const },
  { text: "审核 - 角色变更请求", priority: "高", priorityVariant: "default" as const },
  { text: "通知 - 系统维护通知", priority: "中", priorityVariant: "secondary" as const },
  { text: "工单 - 数据库优化", priority: "低", priorityVariant: "outline" as const },
  { text: "配置 - 缓存策略更新", priority: "低", priorityVariant: "outline" as const },
]);

// ==================== 系统动态（API 数据） ====================

const logLoading = ref(false);
const activities = ref<{ text: string; time: string; dotColor: string }[]>([]);

function formatTime(timeStr?: string): string {
  if (!timeStr) return "";
  const date = new Date(timeStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} 天前`;
  return timeStr;
}

const dotColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-gray-500"];

async function fetchRecentLogs() {
  logLoading.value = true;
  try {
    const result = await LogAPI.getPage({
      pageNum: 1,
      pageSize: 5,
    });
    if (result?.list) {
      activities.value = result.list.map((log: LogItem, idx: number) => ({
        text: `${log.operatorName || "系统"} ${log.title || log.content || "操作"}`,
        time: formatTime(log.createTime),
        dotColor: dotColors[idx % dotColors.length],
      }));
    }
  } catch (error) {
    console.error("[Dashboard] 获取最近日志失败:", error);
  } finally {
    logLoading.value = false;
  }
}

// ==================== 初始化 ====================

onMounted(() => {
  fetchOverview();
  fetchTrend();
  fetchRecentLogs();
});
</script>
