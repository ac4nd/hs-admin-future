<template>
  <div class="p-5 space-y-5">
    <!-- 问候区 -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 class="text-xl font-bold">
              {{ greetingEmoji }}
              {{ t("dashboard.greeting.message", { greeting: greetingText, name: "Admin" }) }}
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
              <span>{{ link.icon }}</span>
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
          <p class="text-sm text-muted-foreground">{{ stat.icon }} {{ stat.title }}</p>
        </CardHeader>
        <CardContent>
          <div class="flex items-end justify-between">
            <div>
              <p class="text-2xl font-bold tabular-nums">{{ stat.displayValue }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ stat.desc }}</p>
            </div>
            <Badge
              v-if="stat.growth > 0"
              variant="secondary"
              class="text-green-600 dark:text-green-400"
            >
              +{{ stat.growth }}%
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 最近访问 -->
    <Card>
      <CardHeader class="pb-3">
        <div class="flex items-center justify-between">
          <CardTitle class="text-sm">🕐 {{ t("dashboard.recentVisit.title") }}</CardTitle>
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
            {{ menu.icon }} {{ menu.title }}
          </Button>
        </div>
        <p v-else class="text-sm text-muted-foreground">{{ t("dashboard.recentVisit.empty") }}</p>
      </CardContent>
    </Card>

    <!-- 趋势图 + 待办/动态 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- 访问趋势 -->
      <Card>
        <CardHeader class="pb-2">
          <div class="flex items-center justify-between">
            <CardTitle class="text-sm">📈 {{ t("dashboard.trend.title") }}</CardTitle>
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
          <!-- 图例 -->
          <div class="flex items-center gap-4 mb-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              <span class="inline-block w-3 h-0.5 rounded bg-blue-500" />
              {{ t("dashboard.trend.pv") }}
            </span>
            <span class="flex items-center gap-1">
              <span class="inline-block w-3 h-0.5 rounded bg-green-500" />
              {{ t("dashboard.trend.uv") }}
            </span>
          </div>
          <!-- SVG 折线图 -->
          <div class="w-full" style="height: 200px">
            <svg
              :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
              class="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#22c55e" stop-opacity="0" />
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
              <polygon v-if="pvAreaPoints" :points="pvAreaPoints" fill="url(#pvGrad)" />
              <!-- UV 填充区域 -->
              <polygon v-if="uvAreaPoints" :points="uvAreaPoints" fill="url(#uvGrad)" />
              <!-- PV 折线 -->
              <polyline
                v-if="pvLinePoints"
                :points="pvLinePoints"
                fill="none"
                stroke="#3b82f6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <!-- UV 折线 -->
              <polyline
                v-if="uvLinePoints"
                :points="uvLinePoints"
                fill="none"
                stroke="#22c55e"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <!-- 日期标签 -->
          <div class="flex justify-between mt-1 text-xs text-muted-foreground overflow-hidden">
            <span>{{ trendDates[0] }}</span>
            <span>{{ trendDates[trendDates.length - 1] }}</span>
          </div>
        </CardContent>
      </Card>

      <!-- 右侧：待办 + 系统动态 -->
      <div class="space-y-5">
        <!-- 待办事项 -->
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-sm">✅ {{ t("dashboard.todo.title") }}</CardTitle>
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
            <CardTitle class="text-sm">📋 {{ t("dashboard.activity.title") }}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useTransition } from "@vueuse/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

// ==================== 问候区 ====================

const greetingEmoji = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "☀️";
  if (hour < 18) return "🌤️";
  return "🌙";
});

const greetingText = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return t("dashboard.greeting.morning");
  if (hour < 18) return t("dashboard.greeting.afternoon");
  return t("dashboard.greeting.evening");
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

// TODO: 未来替换为配置项
const shortcutLinks = computed(() => [
  { icon: "📦", label: t("dashboard.shortcut.repository"), url: "https://github.com" },
  { icon: "📚", label: t("dashboard.shortcut.document"), url: "https://github.com" },
  { icon: "🎬", label: t("dashboard.shortcut.video"), url: "https://github.com" },
]);

// ==================== 统计卡片 ====================

// TODO: 未来替换为 API 数据
const onlineUsers = ref(0);
const todayVisitors = ref(0);
const todayViews = ref(0);
const systemUsers = ref(0);

// 数字过渡动画
const displayOnline = useTransition(onlineUsers, { duration: 1200 });
const displayVisitors = useTransition(todayVisitors, { duration: 1200 });
const displayViews = useTransition(todayViews, { duration: 1200 });
const displaySysUsers = useTransition(systemUsers, { duration: 1200 });

onMounted(() => {
  onlineUsers.value = 128;
  todayVisitors.value = 1024;
  todayViews.value = 3256;
  systemUsers.value = 1286;
});

const stats = computed(() => [
  {
    title: t("dashboard.stats.onlineUsers"),
    icon: "👥",
    displayValue: Math.round(displayOnline.value).toLocaleString(),
    growth: 0,
    desc: t("dashboard.stats.live"),
  },
  {
    title: t("dashboard.stats.todayVisitors"),
    icon: "📊",
    displayValue: Math.round(displayVisitors.value).toLocaleString(),
    growth: 12.5,
    desc: t("dashboard.stats.vsYesterday"),
  },
  {
    title: t("dashboard.stats.todayViews"),
    icon: "👁️",
    displayValue: Math.round(displayViews.value).toLocaleString(),
    growth: 8.3,
    desc: t("dashboard.stats.vsYesterday"),
  },
  {
    title: t("dashboard.stats.systemUsers"),
    icon: "👤",
    displayValue: Math.round(displaySysUsers.value).toLocaleString(),
    growth: 5.2,
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

// 路由变化时记录
watch(
  () => route.path,
  (path) => {
    if (!path || path === "/" || path === "/dashboard") return;
    const title = (route.meta?.title as string) ?? "";
    const icon = (route.meta?.icon as string) ?? "📄";
    if (!title) return;
    // 去重并放到最前
    const list = recentMenus.value.filter((m) => m.path !== path);
    list.unshift({ path, title, icon });
    recentMenus.value = list.slice(0, 8);
    saveRecentMenus();
  }
);

onMounted(loadRecentMenus);

// ==================== 访问趋势图 ====================

const trendRange = ref(7);

// Mock 趋势数据
function generateTrendData(days: number) {
  const dates: string[] = [];
  const pv: number[] = [];
  const uv: number[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`);
    pv.push(Math.floor(2000 + Math.random() * 2000));
    uv.push(Math.floor(800 + Math.random() * 600));
  }
  return { dates, pv, uv };
}

const trendData = computed(() => generateTrendData(trendRange.value));
const trendDates = computed(() => trendData.value.dates);

// SVG 图表尺寸参数
const svgWidth = 500;
const svgHeight = 200;
const paddingLeft = 0;
const paddingRight = 0;
const paddingTop = 5;
const paddingBottom = 5;
const chartWidth = svgWidth - paddingLeft - paddingRight;
const chartHeight = svgHeight - paddingTop - paddingBottom;

function toPoints(data: number[]) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((v - min) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

function toAreaPoints(data: number[]) {
  const line = toPoints(data);
  if (!line) return "";
  const lastX = paddingLeft + chartWidth;
  const baseY = paddingTop + chartHeight;
  const firstX = paddingLeft;
  // 底部闭合
  return `${line} ${lastX},${baseY} ${firstX},${baseY}`;
}

const pvLinePoints = computed(() => toPoints(trendData.value.pv));
const uvLinePoints = computed(() => toPoints(trendData.value.uv));
const pvAreaPoints = computed(() => toAreaPoints(trendData.value.pv));
const uvAreaPoints = computed(() => toAreaPoints(trendData.value.uv));

// ==================== 待办事项 ====================

// TODO: 未来替换为 API 数据
const todos = computed(() => [
  { text: "审批 - 用户权限申请", priority: "紧急", priorityVariant: "destructive" as const },
  { text: "审核 - 角色变更请求", priority: "高", priorityVariant: "default" as const },
  { text: "通知 - 系统维护通知", priority: "中", priorityVariant: "secondary" as const },
  { text: "工单 - 数据库优化", priority: "低", priorityVariant: "outline" as const },
  { text: "配置 - 缓存策略更新", priority: "低", priorityVariant: "outline" as const },
]);

// ==================== 系统动态 ====================

// TODO: 未来替换为 API 数据
const activities = [
  { text: "Admin 修改了用户权限配置", time: "10 分钟前", dotColor: "bg-blue-500" },
  { text: "系统 自动备份数据库完成", time: "30 分钟前", dotColor: "bg-green-500" },
  { text: "Admin 新增了角色配置", time: "1 小时前", dotColor: "bg-purple-500" },
  { text: "用户 test02 提交了权限申请", time: "2 小时前", dotColor: "bg-orange-500" },
  { text: "系统 完成了安全扫描", time: "3 小时前", dotColor: "bg-green-500" },
];
</script>
