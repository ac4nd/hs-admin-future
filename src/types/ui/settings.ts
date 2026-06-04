import type { ThemeMode } from "@/enums/settings";

export interface AppSettings {
  showTagsView: boolean;
  showAppLogo: boolean;
  showWatermark: boolean;
  pageSwitchingAnimation: string;
  layout: string;
  themeColor: string;
  theme: ThemeMode;
  sidebarColorScheme: string;
}
