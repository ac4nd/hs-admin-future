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
    if (hour < 12)
        return "☀️";
    if (hour < 18)
        return "🌤️";
    return "🌙";
});
const greetingText = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12)
        return t("dashboard.greeting.morning");
    if (hour < 18)
        return t("dashboard.greeting.afternoon");
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
const recentMenus = ref([]);
function loadRecentMenus() {
    try {
        const raw = localStorage.getItem("recentMenus");
        if (raw)
            recentMenus.value = JSON.parse(raw);
    }
    catch {
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
watch(() => route.path, (path) => {
    if (!path || path === "/" || path === "/dashboard")
        return;
    const title = route.meta?.title ?? "";
    const icon = route.meta?.icon ?? "📄";
    if (!title)
        return;
    // 去重并放到最前
    const list = recentMenus.value.filter((m) => m.path !== path);
    list.unshift({ path, title, icon });
    recentMenus.value = list.slice(0, 8);
    saveRecentMenus();
});
onMounted(loadRecentMenus);
// ==================== 访问趋势图 ====================
const trendRange = ref(7);
// Mock 趋势数据
function generateTrendData(days) {
    const dates = [];
    const pv = [];
    const uv = [];
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
function toPoints(data) {
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
function toAreaPoints(data) {
    const line = toPoints(data);
    if (!line)
        return "";
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
    { text: "审批 - 用户权限申请", priority: "紧急", priorityVariant: "destructive" },
    { text: "审核 - 角色变更请求", priority: "高", priorityVariant: "default" },
    { text: "通知 - 系统维护通知", priority: "中", priorityVariant: "secondary" },
    { text: "工单 - 数据库优化", priority: "低", priorityVariant: "outline" },
    { text: "配置 - 缓存策略更新", priority: "低", priorityVariant: "outline" },
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
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    ...{ class: "pt-6" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "pt-6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
const { default: __VLS_11 } = __VLS_9.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between flex-wrap gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-xl font-bold" },
});
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
(__VLS_ctx.greetingEmoji);
(__VLS_ctx.t("dashboard.greeting.message", { greeting: __VLS_ctx.greetingText, name: "Admin" }));
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm text-muted-foreground mt-1" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
(__VLS_ctx.currentDate);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
for (const [link] of __VLS_vFor((__VLS_ctx.shortcutLinks))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
        key: (link.label),
        href: (link.url),
        target: "_blank",
        rel: "noopener noreferrer",
        ...{ class: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (link.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (link.label);
    // @ts-ignore
    [greetingEmoji, t, greetingText, currentDate, shortcutLinks,];
}
// @ts-ignore
[];
var __VLS_9;
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
for (const [stat, index] of __VLS_vFor((__VLS_ctx.stats))) {
    let __VLS_12;
    /** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
    Card;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        key: (index),
    }));
    const __VLS_14 = __VLS_13({
        key: (index),
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    let __VLS_18;
    /** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
    CardHeader;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        ...{ class: "pb-2" },
    }));
    const __VLS_20 = __VLS_19({
        ...{ class: "pb-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    /** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
    const { default: __VLS_23 } = __VLS_21.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (stat.icon);
    (stat.title);
    // @ts-ignore
    [stats,];
    var __VLS_21;
    let __VLS_24;
    /** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
    CardContent;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const { default: __VLS_29 } = __VLS_27.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-end justify-between" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-2xl font-bold tabular-nums" },
    });
    /** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['tabular-nums']} */ ;
    (stat.displayValue);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-muted-foreground mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (stat.desc);
    if (stat.growth > 0) {
        let __VLS_30;
        /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
        Badge;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
            variant: "secondary",
            ...{ class: "text-green-600 dark:text-green-400" },
        }));
        const __VLS_32 = __VLS_31({
            variant: "secondary",
            ...{ class: "text-green-600 dark:text-green-400" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        /** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
        /** @type {__VLS_StyleScopedClasses['dark:text-green-400']} */ ;
        const { default: __VLS_35 } = __VLS_33.slots;
        (stat.growth);
        // @ts-ignore
        [];
        var __VLS_33;
    }
    // @ts-ignore
    [];
    var __VLS_27;
    // @ts-ignore
    [];
    var __VLS_15;
    // @ts-ignore
    [];
}
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ class: "pb-3" },
}));
const __VLS_44 = __VLS_43({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
    ...{ class: "text-sm" },
}));
const __VLS_50 = __VLS_49({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_53 } = __VLS_51.slots;
(__VLS_ctx.t("dashboard.recentVisit.title"));
// @ts-ignore
[t,];
var __VLS_51;
if (__VLS_ctx.recentMenus.length) {
    let __VLS_54;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }));
    const __VLS_56 = __VLS_55({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "h-7 text-xs" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    let __VLS_59;
    const __VLS_60 = ({ click: {} },
        { onClick: (__VLS_ctx.clearRecentMenus) });
    /** @type {__VLS_StyleScopedClasses['h-7']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    const { default: __VLS_61 } = __VLS_57.slots;
    (__VLS_ctx.t("dashboard.recentVisit.clear"));
    // @ts-ignore
    [t, recentMenus, clearRecentMenus,];
    var __VLS_57;
    var __VLS_58;
}
// @ts-ignore
[];
var __VLS_45;
let __VLS_62;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent1(__VLS_62, new __VLS_62({}));
const __VLS_64 = __VLS_63({}, ...__VLS_functionalComponentArgsRest(__VLS_63));
const { default: __VLS_67 } = __VLS_65.slots;
if (__VLS_ctx.recentMenus.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-wrap gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    for (const [menu] of __VLS_vFor((__VLS_ctx.recentMenus))) {
        let __VLS_68;
        /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
        Button;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
            ...{ 'onClick': {} },
            key: (menu.path),
            variant: "outline",
            size: "sm",
            ...{ class: "h-8 text-xs" },
        }));
        const __VLS_70 = __VLS_69({
            ...{ 'onClick': {} },
            key: (menu.path),
            variant: "outline",
            size: "sm",
            ...{ class: "h-8 text-xs" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        let __VLS_73;
        const __VLS_74 = ({ click: {} },
            { onClick: (...[$event]) => {
                    if (!(__VLS_ctx.recentMenus.length))
                        return;
                    __VLS_ctx.router.push(menu.path);
                    // @ts-ignore
                    [recentMenus, recentMenus, router,];
                } });
        /** @type {__VLS_StyleScopedClasses['h-8']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        const { default: __VLS_75 } = __VLS_71.slots;
        let __VLS_76;
        /** @ts-ignore @type { | typeof __VLS_components.MenuIcon} */
        MenuIcon;
        // @ts-ignore
        const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
            icon: (menu.icon),
            ...{ class: "size-3.5 mr-1" },
        }));
        const __VLS_78 = __VLS_77({
            icon: (menu.icon),
            ...{ class: "size-3.5 mr-1" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_77));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
        (menu.title);
        // @ts-ignore
        [];
        var __VLS_71;
        var __VLS_72;
        // @ts-ignore
        [];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.t("dashboard.recentVisit.empty"));
}
// @ts-ignore
[t,];
var __VLS_65;
// @ts-ignore
[];
var __VLS_39;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-5" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({}));
const __VLS_83 = __VLS_82({}, ...__VLS_functionalComponentArgsRest(__VLS_82));
const { default: __VLS_86 } = __VLS_84.slots;
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    ...{ class: "pb-2" },
}));
const __VLS_89 = __VLS_88({
    ...{ class: "pb-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
const { default: __VLS_92 } = __VLS_90.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ class: "text-sm" },
}));
const __VLS_95 = __VLS_94({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_98 } = __VLS_96.slots;
(__VLS_ctx.t("dashboard.trend.title"));
// @ts-ignore
[t,];
var __VLS_96;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
let __VLS_99;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent1(__VLS_99, new __VLS_99({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
    ...{ class: ({ 'bg-muted': __VLS_ctx.trendRange === 7 }) },
}));
const __VLS_101 = __VLS_100({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
    ...{ class: ({ 'bg-muted': __VLS_ctx.trendRange === 7 }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
let __VLS_104;
const __VLS_105 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.trendRange = 7;
            // @ts-ignore
            [trendRange, trendRange,];
        } });
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
const { default: __VLS_106 } = __VLS_102.slots;
(__VLS_ctx.t("dashboard.trend.days7"));
// @ts-ignore
[t,];
var __VLS_102;
var __VLS_103;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
    ...{ class: ({ 'bg-muted': __VLS_ctx.trendRange === 30 }) },
}));
const __VLS_109 = __VLS_108({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
    ...{ class: "h-7 text-xs" },
    ...{ class: ({ 'bg-muted': __VLS_ctx.trendRange === 30 }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_108));
let __VLS_112;
const __VLS_113 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.trendRange = 30;
            // @ts-ignore
            [trendRange, trendRange,];
        } });
/** @type {__VLS_StyleScopedClasses['h-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-muted']} */ ;
const { default: __VLS_114 } = __VLS_110.slots;
(__VLS_ctx.t("dashboard.trend.days30"));
// @ts-ignore
[t,];
var __VLS_110;
var __VLS_111;
// @ts-ignore
[];
var __VLS_90;
let __VLS_115;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent1(__VLS_115, new __VLS_115({}));
const __VLS_117 = __VLS_116({}, ...__VLS_functionalComponentArgsRest(__VLS_116));
const { default: __VLS_120 } = __VLS_118.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-4 mb-2 text-xs text-muted-foreground" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "flex items-center gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "inline-block w-3 h-0.5 rounded bg-blue-500" },
});
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-500']} */ ;
(__VLS_ctx.t("dashboard.trend.pv"));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "flex items-center gap-1" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span)({
    ...{ class: "inline-block w-3 h-0.5 rounded bg-green-500" },
});
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-500']} */ ;
(__VLS_ctx.t("dashboard.trend.uv"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full" },
    ...{ style: {} },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: (`0 0 ${__VLS_ctx.svgWidth} ${__VLS_ctx.svgHeight}`),
    ...{ class: "w-full h-full" },
    preserveAspectRatio: "none",
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "pvGrad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
    offset: "0%",
    'stop-color': "#3b82f6",
    'stop-opacity': "0.3",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
    offset: "100%",
    'stop-color': "#3b82f6",
    'stop-opacity': "0",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "uvGrad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
    offset: "0%",
    'stop-color': "#22c55e",
    'stop-opacity': "0.3",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
    offset: "100%",
    'stop-color': "#22c55e",
    'stop-opacity': "0",
});
for (const [i] of __VLS_vFor((4))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        key: ('grid-' + i),
        x1: (__VLS_ctx.paddingLeft),
        y1: (__VLS_ctx.paddingTop + (__VLS_ctx.chartHeight / 4) * (i - 1)),
        x2: (__VLS_ctx.svgWidth - __VLS_ctx.paddingRight),
        y2: (__VLS_ctx.paddingTop + (__VLS_ctx.chartHeight / 4) * (i - 1)),
        stroke: "currentColor",
        'stroke-opacity': "0.08",
        'stroke-dasharray': "4 4",
    });
    // @ts-ignore
    [t, t, svgWidth, svgWidth, svgHeight, paddingLeft, paddingTop, paddingTop, chartHeight, chartHeight, paddingRight,];
}
if (__VLS_ctx.pvAreaPoints) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.polygon)({
        points: (__VLS_ctx.pvAreaPoints),
        fill: "url(#pvGrad)",
    });
}
if (__VLS_ctx.uvAreaPoints) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.polygon)({
        points: (__VLS_ctx.uvAreaPoints),
        fill: "url(#uvGrad)",
    });
}
if (__VLS_ctx.pvLinePoints) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
        points: (__VLS_ctx.pvLinePoints),
        fill: "none",
        stroke: "#3b82f6",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
}
if (__VLS_ctx.uvLinePoints) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
        points: (__VLS_ctx.uvLinePoints),
        fill: "none",
        stroke: "#22c55e",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-between mt-1 text-xs text-muted-foreground overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.trendDates[0]);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.trendDates[__VLS_ctx.trendDates.length - 1]);
// @ts-ignore
[pvAreaPoints, pvAreaPoints, uvAreaPoints, uvAreaPoints, pvLinePoints, pvLinePoints, uvLinePoints, uvLinePoints, trendDates, trendDates, trendDates,];
var __VLS_118;
// @ts-ignore
[];
var __VLS_84;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
let __VLS_121;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_122 = __VLS_asFunctionalComponent1(__VLS_121, new __VLS_121({}));
const __VLS_123 = __VLS_122({}, ...__VLS_functionalComponentArgsRest(__VLS_122));
const { default: __VLS_126 } = __VLS_124.slots;
let __VLS_127;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_128 = __VLS_asFunctionalComponent1(__VLS_127, new __VLS_127({
    ...{ class: "pb-3" },
}));
const __VLS_129 = __VLS_128({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_128));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_132 } = __VLS_130.slots;
let __VLS_133;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_134 = __VLS_asFunctionalComponent1(__VLS_133, new __VLS_133({
    ...{ class: "text-sm" },
}));
const __VLS_135 = __VLS_134({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_134));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_138 } = __VLS_136.slots;
(__VLS_ctx.t("dashboard.todo.title"));
// @ts-ignore
[t,];
var __VLS_136;
// @ts-ignore
[];
var __VLS_130;
let __VLS_139;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_140 = __VLS_asFunctionalComponent1(__VLS_139, new __VLS_139({}));
const __VLS_141 = __VLS_140({}, ...__VLS_functionalComponentArgsRest(__VLS_140));
const { default: __VLS_144 } = __VLS_142.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
for (const [todo, index] of __VLS_vFor((__VLS_ctx.todos))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (index),
        ...{ class: "flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-muted/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    let __VLS_145;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_146 = __VLS_asFunctionalComponent1(__VLS_145, new __VLS_145({
        variant: (todo.priorityVariant),
        ...{ class: "text-[10px] px-1.5 py-0" },
    }));
    const __VLS_147 = __VLS_146({
        variant: (todo.priorityVariant),
        ...{ class: "text-[10px] px-1.5 py-0" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_146));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-1.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-0']} */ ;
    const { default: __VLS_150 } = __VLS_148.slots;
    (todo.priority);
    // @ts-ignore
    [todos,];
    var __VLS_148;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    (todo.text);
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_142;
// @ts-ignore
[];
var __VLS_124;
let __VLS_151;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_152 = __VLS_asFunctionalComponent1(__VLS_151, new __VLS_151({}));
const __VLS_153 = __VLS_152({}, ...__VLS_functionalComponentArgsRest(__VLS_152));
const { default: __VLS_156 } = __VLS_154.slots;
let __VLS_157;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent1(__VLS_157, new __VLS_157({
    ...{ class: "pb-3" },
}));
const __VLS_159 = __VLS_158({
    ...{ class: "pb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
/** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
const { default: __VLS_162 } = __VLS_160.slots;
let __VLS_163;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_164 = __VLS_asFunctionalComponent1(__VLS_163, new __VLS_163({
    ...{ class: "text-sm" },
}));
const __VLS_165 = __VLS_164({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_164));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_168 } = __VLS_166.slots;
(__VLS_ctx.t("dashboard.activity.title"));
// @ts-ignore
[t,];
var __VLS_166;
// @ts-ignore
[];
var __VLS_160;
let __VLS_169;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({}));
const __VLS_171 = __VLS_170({}, ...__VLS_functionalComponentArgsRest(__VLS_170));
const { default: __VLS_174 } = __VLS_172.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-3" },
});
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
for (const [activity, index] of __VLS_vFor((__VLS_ctx.activities))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (index),
        ...{ class: "flex gap-3 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "w-2 h-2 rounded-full mt-1.5" },
        ...{ class: (activity.dotColor) },
    });
    /** @type {__VLS_StyleScopedClasses['w-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1.5']} */ ;
    if (index < __VLS_ctx.activities.length - 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
            ...{ class: "w-px flex-1 bg-border mt-1" },
        });
        /** @type {__VLS_StyleScopedClasses['w-px']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-border']} */ ;
        /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 pb-3" },
    });
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['pb-3']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-foreground']} */ ;
    (activity.text);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-muted-foreground mt-0.5" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
    (activity.time);
    // @ts-ignore
    [activities, activities,];
}
// @ts-ignore
[];
var __VLS_172;
// @ts-ignore
[];
var __VLS_154;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map