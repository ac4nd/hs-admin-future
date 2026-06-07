/**
 * 布局 Composable — 整合布局状态、设备检测
 */
import { computed, watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useAppStore, useSettingsStore } from "@/stores";
const DESKTOP_BREAKPOINT = 992;
export function useLayout() {
    const appStore = useAppStore();
    const settingsStore = useSettingsStore();
    const { width } = useWindowSize();
    const isDesktop = computed(() => width.value >= DESKTOP_BREAKPOINT);
    const isMobile = computed(() => appStore.device === "mobile" /* DeviceEnum.MOBILE */);
    watchEffect(() => {
        appStore.setDevice(isDesktop.value ? "desktop" /* DeviceEnum.DESKTOP */ : "mobile" /* DeviceEnum.MOBILE */);
        // 设备切换时自动控制侧边栏：桌面端展开，移动端收起
        if (isDesktop.value) {
            appStore.openSidebar();
        }
        else {
            appStore.closeSidebar();
        }
    });
    const isSidebarOpen = computed(() => appStore.sidebar.opened);
    const showTagsView = computed(() => settingsStore.showTagsView);
    const showLogo = computed(() => settingsStore.showAppLogo);
    const layoutClass = computed(() => ({
        hideSidebar: !appStore.sidebar.opened,
        openSidebar: appStore.sidebar.opened,
        mobile: appStore.device === "mobile" /* DeviceEnum.MOBILE */,
        [`layout-${settingsStore.layout}`]: true,
    }));
    function closeSidebar() {
        appStore.closeSidebar();
    }
    return {
        isDesktop,
        isMobile,
        layoutClass,
        isSidebarOpen,
        showTagsView,
        showLogo,
        closeSidebar,
    };
}
//# sourceMappingURL=useLayout.js.map