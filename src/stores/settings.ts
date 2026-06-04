import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { SidebarColor, ThemeMode } from "@/enums/settings";
import type { LayoutMode } from "@/enums/settings";
import {
  applyTheme,
  generateThemeColors,
  resolveThemeMode,
  toggleDarkMode,
  toggleSidebarColor,
  watchSystemTheme,
} from "@/utils/theme";
import { STORAGE_KEYS } from "@/constants";
import { defaults } from "@/settings";

export const useSettingsStore = defineStore("setting", () => {
  // 界面显示
  const settingsVisible = ref(false);
  const showTagsView = useStorage(STORAGE_KEYS.SHOW_TAGS_VIEW, defaults.showTagsView);
  const showAppLogo = useStorage(STORAGE_KEYS.SHOW_APP_LOGO, defaults.showAppLogo);
  const showWatermark = useStorage(STORAGE_KEYS.SHOW_WATERMARK, defaults.showWatermark);
  const pageSwitchingAnimation = useStorage(
    STORAGE_KEYS.PAGE_SWITCHING_ANIMATION,
    defaults.pageSwitchingAnimation,
  );

  // 布局
  const layout = useStorage<LayoutMode>(STORAGE_KEYS.LAYOUT, defaults.layout as LayoutMode);
  const sidebarColorScheme = useStorage(
    STORAGE_KEYS.SIDEBAR_COLOR_SCHEME,
    defaults.sidebarColorScheme,
  );

  // 主题
  const theme = useStorage<ThemeMode>(STORAGE_KEYS.THEME, defaults.theme);
  const themeColor = useStorage(STORAGE_KEYS.THEME_COLOR, defaults.themeColor);
  const resolvedTheme = ref<ThemeMode>(resolveThemeMode(theme.value));

  // 特殊模式
  const grayMode = useStorage(STORAGE_KEYS.GRAY_MODE, false);
  const colorWeak = useStorage(STORAGE_KEYS.COLOR_WEAK, false);

  // 玻璃效果
  const glassEffect = useStorage(STORAGE_KEYS.GLASS_EFFECT, defaults.glassEffect);
  const glassParams = useStorage(STORAGE_KEYS.GLASS_PARAMS, { ...defaults.glassParams });

  /** 更新单个玻璃参数（确保触发 useStorage 持久化） */
  function setGlassParam<K extends keyof typeof defaults.glassParams>(key: K, value: (typeof defaults.glassParams)[K]) {
    glassParams.value = { ...glassParams.value, [key]: value };
  }

  // 主题变化监听
  let stopWatchingSystemTheme: (() => void) | undefined;

  watch(
    theme,
    (value) => {
      stopWatchingSystemTheme?.();
      resolvedTheme.value = resolveThemeMode(value);

      if (value === ThemeMode.AUTO) {
        stopWatchingSystemTheme = watchSystemTheme((systemTheme) => {
          resolvedTheme.value = systemTheme;
        });
      } else {
        stopWatchingSystemTheme = undefined;
      }
    },
    { immediate: true },
  );

  watch(
    [resolvedTheme, themeColor],
    ([t, c]: [ThemeMode, string]) => {
      toggleDarkMode(t === ThemeMode.DARK);
      applyTheme(generateThemeColors(c, t));
    },
    { immediate: true },
  );

  watch(sidebarColorScheme, (v) => toggleSidebarColor(v === SidebarColor.CLASSIC_BLUE), {
    immediate: true,
  });

  // 玻璃效果
  watch(
    glassEffect,
    (v) => {
      document.documentElement.classList.toggle("glass-effect", v);
    },
    { immediate: true },
  );

  // 灰色模式
  watch(
    grayMode,
    (v) => {
      document.documentElement.style.filter = v ? "grayscale(100%)" : "";
    },
    { immediate: true },
  );

  // 色弱模式
  watch(
    colorWeak,
    (v) => {
      document.documentElement.classList.toggle("color-weak", v);
    },
    { immediate: true },
  );

  function resetSettings() {
    showTagsView.value = defaults.showTagsView;
    showAppLogo.value = defaults.showAppLogo;
    showWatermark.value = defaults.showWatermark;
    pageSwitchingAnimation.value = defaults.pageSwitchingAnimation;
    grayMode.value = false;
    colorWeak.value = false;
    glassEffect.value = defaults.glassEffect;
    glassParams.value = { ...defaults.glassParams };
    sidebarColorScheme.value = defaults.sidebarColorScheme;
    layout.value = defaults.layout as LayoutMode;
    themeColor.value = defaults.themeColor;
    theme.value = defaults.theme;
  }

  return {
    settingsVisible,
    showTagsView,
    showAppLogo,
    showWatermark,
    pageSwitchingAnimation,
    grayMode,
    colorWeak,
    glassEffect,
    glassParams,
    sidebarColorScheme,
    layout,
    themeColor,
    theme,
    resolvedTheme,
    resetSettings,
    setGlassParam,
  };
});
