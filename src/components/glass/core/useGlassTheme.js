import { computed } from "vue";
import { useSettingsStore } from "@/stores";
/** 判断当前是否为亮色主题 */
export function useGlassTheme() {
    const settingsStore = useSettingsStore();
    const isOverLight = computed(() => {
        return settingsStore.resolvedTheme !== "dark" /* ThemeMode.DARK */;
    });
    return { isOverLight };
}
//# sourceMappingURL=useGlassTheme.js.map