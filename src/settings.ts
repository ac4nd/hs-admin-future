/**
 * 应用配置
 */

import { LayoutMode, SidebarColor, ThemeMode, LanguageEnum } from "@/enums/settings";

const env = import.meta.env;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// ============================================
// 应用配置
// ============================================
export const appConfig = {
  title: (env.VITE_APP_TITLE as string) || "HS-Admin",
  tenantEnabled: env.VITE_APP_TENANT_ENABLED === "true",
} as const;

// ============================================
// 用户偏好默认值
// ============================================
export const defaults = {
  theme: prefersDark ? ThemeMode.DARK : ThemeMode.LIGHT,
  themeColor: "#1677FF",
  sidebarColorScheme: SidebarColor.MINIMAL_WHITE,
  layout: LayoutMode.LEFT,
  language: LanguageEnum.ZH_CN,
  showTagsView: true,
  showAppLogo: true,
  showWatermark: false,
  pageSwitchingAnimation: "fade-slide" as const,
  showSettings: true,
  glassEffect: true,
  glassParams: {
    displacementScale: 70,
    blur: 6,
    saturation: 140,
    aberrationIntensity: 2,
    elasticity: 0.15,
    cornerRadius: 32,
  },
} as const;

// ============================================
// 主题色预设
// ============================================
export const themeColorPresets = [
  "#1677FF",
  "#165DFF",
  "#3370FF",
  "#22C55E",
  "#FAAD14",
  "#FF4D4F",
  "#722ED1",
  "#EB2F96",
  "#13C2C2",
  "#F97316",
] as const;
