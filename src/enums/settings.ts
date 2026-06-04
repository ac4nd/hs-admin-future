/**
 * 设置相关枚举
 */

export const enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
  AUTO = "auto",
}

export const enum SidebarColor {
  CLASSIC_BLUE = "classic-blue",
  MINIMAL_WHITE = "minimal-white",
}

export const enum LayoutMode {
  LEFT = "left",
  TOP = "top",
  MIX = "mix",
}

export const enum SidebarStatus {
  OPENED = "opened",
  CLOSED = "closed",
}

export const enum DeviceEnum {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

export const enum LanguageEnum {
  ZH_CN = "zh-cn",
  EN = "en",
}

export const enum PageSwitchingAnimationEnum {
  NONE = "none",
  FADE = "fade",
  FADE_SLIDE = "fade-slide",
  FADE_SCALE = "fade-scale",
}

interface OptionItem {
  value: string;
  label: string;
}

export const PageSwitchingAnimationOptions: Record<string, OptionItem> = {
  none: { value: "none", label: "无动画" },
  fade: { value: "fade", label: "淡入淡出" },
  "fade-slide": { value: "fade-slide", label: "平滑切换" },
  "fade-scale": { value: "fade-scale", label: "缩放切换" },
};
