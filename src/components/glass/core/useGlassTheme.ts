import { computed } from "vue";
import { useSettingsStore } from "@/stores";
import { ThemeMode } from "@/enums/settings";

/** 判断当前是否为亮色主题 */
export function useGlassTheme() {
  const settingsStore = useSettingsStore();

  const isOverLight = computed(() => {
    return settingsStore.resolvedTheme !== ThemeMode.DARK;
  });

  return { isOverLight };
}
