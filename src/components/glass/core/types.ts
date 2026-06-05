import type { CSSProperties } from "vue";

/** 液态玻璃折射层级 */
export type GlassLayer = "liq-high" | "liq-med" | "liq-clear";

/** 重导出 CSSProperties 方便内部使用 */
export type { CSSProperties };

/** 位移模式 */
export type GlassMode = "standard" | "polar" | "prominent";

/** 组件预设名称 */
export type GlassPreset =
  | "button"
  | "badge"
  | "icon"
  | "text"
  | "avatar"
  | "navbar"
  | "breadcrumb"
  | "dropdown"
  | "tabs"
  | "carousel"
  | "steps"
  | "pagination"
  | "input"
  | "textarea"
  | "radio"
  | "checkbox"
  | "select"
  | "switch"
  | "slider"
  | "date-picker"
  | "card"
  | "table"
  | "accordion"
  | "list"
  | "timeline"
  | "divider"
  | "modal"
  | "drawer"
  | "alert"
  | "toast"
  | "notification"
  | "loading"
  | "popconfirm"
  | "tooltip"
  | "progress";

/** 预设配置 */
export interface GlassPresetConfig {
  /** 所属折射层级 */
  layer: GlassLayer;
  /** 背景模糊 (px) */
  blur: number;
  /** 饱和度 (%) */
  saturate: number;
  /** 圆角 (px) */
  cornerRadius: number;
  /** SVG feDisplacementMap scale */
  displacementScale: number;
  /** 色差强度 */
  aberrationIntensity: number;
  /** 弹性系数 (0 = 无弹性) */
  elasticity: number;
  /** 是否启用鼠标追踪 */
  mouseTracking: boolean;
  /** 位移模式 */
  mode: GlassMode;
  /** 是否使用 SVG 滤镜（false = 纯 CSS 毛玻璃，性能更优） */
  useSvgFilter: boolean;
}
