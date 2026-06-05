import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { DeviceEnum, SidebarStatus } from "@/enums/settings";
import { STORAGE_KEYS } from "@/constants";
import { defaults } from "@/settings";
import { store } from "@/stores";

export const useAppStore = defineStore("app", () => {
  const device = useStorage(STORAGE_KEYS.DEVICE, DeviceEnum.DESKTOP);
  const sidebarStatus = useStorage(STORAGE_KEYS.SIDEBAR_STATUS, SidebarStatus.CLOSED);
  const language = useStorage(STORAGE_KEYS.LANGUAGE, defaults.language);
  const activeTopMenuPath = useStorage(STORAGE_KEYS.ACTIVE_TOP_MENU_PATH, "");
  const contentFullscreen = ref(false);

  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatus.OPENED,
    withoutAnimation: false,
  });

  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
    sidebar.withoutAnimation = false;
    sidebarStatus.value = sidebar.opened ? SidebarStatus.OPENED : SidebarStatus.CLOSED;
  }

  function closeSidebar() {
    sidebar.opened = false;
    sidebar.withoutAnimation = false;
    sidebarStatus.value = SidebarStatus.CLOSED;
  }

  function openSidebar() {
    sidebar.opened = true;
    sidebar.withoutAnimation = false;
    sidebarStatus.value = SidebarStatus.OPENED;
  }

  function toggleContentFullscreen() {
    contentFullscreen.value = !contentFullscreen.value;
  }

  function setDevice(deviceType: DeviceEnum) {
    device.value = deviceType;
  }

  function changeLanguage(lang: string) {
    language.value = lang;
  }

  function setActiveTopMenuPath(path: string) {
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
