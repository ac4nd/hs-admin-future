import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { STORAGE_KEYS } from "@/constants";
import { defaults } from "@/settings";
import { store } from "@/stores";
export const useAppStore = defineStore("app", () => {
    const device = useStorage(STORAGE_KEYS.DEVICE, "desktop" /* DeviceEnum.DESKTOP */);
    const sidebarStatus = useStorage(STORAGE_KEYS.SIDEBAR_STATUS, "closed" /* SidebarStatus.CLOSED */);
    const language = useStorage(STORAGE_KEYS.LANGUAGE, defaults.language);
    const activeTopMenuPath = useStorage(STORAGE_KEYS.ACTIVE_TOP_MENU_PATH, "");
    const contentFullscreen = ref(false);
    const sidebar = reactive({
        opened: sidebarStatus.value === "opened" /* SidebarStatus.OPENED */,
        withoutAnimation: false,
    });
    function toggleSidebar() {
        sidebar.opened = !sidebar.opened;
        sidebar.withoutAnimation = false;
        sidebarStatus.value = sidebar.opened ? "opened" /* SidebarStatus.OPENED */ : "closed" /* SidebarStatus.CLOSED */;
    }
    function closeSidebar() {
        sidebar.opened = false;
        sidebar.withoutAnimation = false;
        sidebarStatus.value = "closed" /* SidebarStatus.CLOSED */;
    }
    function openSidebar() {
        sidebar.opened = true;
        sidebar.withoutAnimation = false;
        sidebarStatus.value = "opened" /* SidebarStatus.OPENED */;
    }
    function toggleContentFullscreen() {
        contentFullscreen.value = !contentFullscreen.value;
    }
    function setDevice(deviceType) {
        device.value = deviceType;
    }
    function changeLanguage(lang) {
        language.value = lang;
    }
    function setActiveTopMenuPath(path) {
        activeTopMenuPath.value = path;
    }
    return {
        device,
        sidebar,
        language,
        activeTopMenuPath,
        contentFullscreen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        toggleContentFullscreen,
        setDevice,
        changeLanguage,
        setActiveTopMenuPath,
    };
});
export function useAppStoreHook() {
    return useAppStore(store);
}
//# sourceMappingURL=app.js.map