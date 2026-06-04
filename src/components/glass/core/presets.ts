import type { GlassPreset, GlassPresetConfig } from './types'

/** 三层折射预设配置表 */
const presets: Record<GlassPreset, GlassPresetConfig> = {
  // ---- 高透高折射层 (liq-high) — 全部使用 SVG 滤镜 ----
  button: {
    layer: 'liq-high', blur: 8, saturate: 200, cornerRadius: 10,
    displacementScale: 200, aberrationIntensity: 2.5, elasticity: 0.2,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  badge: {
    layer: 'liq-high', blur: 6, saturate: 180, cornerRadius: 999,
    displacementScale: 20, aberrationIntensity: 2, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  icon: {
    layer: 'liq-high', blur: 8, saturate: 190, cornerRadius: 12,
    displacementScale: 25, aberrationIntensity: 2, elasticity: 0.15,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  alert: {
    layer: 'liq-high', blur: 10, saturate: 180, cornerRadius: 12,
    displacementScale: 25, aberrationIntensity: 2, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  toast: {
    layer: 'liq-high', blur: 8, saturate: 180, cornerRadius: 16,
    displacementScale: 20, aberrationIntensity: 2, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  notification: {
    layer: 'liq-high', blur: 10, saturate: 180, cornerRadius: 16,
    displacementScale: 25, aberrationIntensity: 2, elasticity: 0.1,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  loading: {
    layer: 'liq-high', blur: 6, saturate: 170, cornerRadius: 999,
    displacementScale: 20, aberrationIntensity: 1.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  popconfirm: {
    layer: 'liq-high', blur: 10, saturate: 180, cornerRadius: 12,
    displacementScale: 25, aberrationIntensity: 2, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },

  // ---- 中透平滑层 (liq-med) — 全部使用 SVG 滤镜 ----
  input: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  textarea: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  select: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  switch: {
    layer: 'liq-med', blur: 10, saturate: 150, cornerRadius: 999,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0.15,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  checkbox: {
    layer: 'liq-med', blur: 10, saturate: 150, cornerRadius: 6,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  radio: {
    layer: 'liq-med', blur: 10, saturate: 150, cornerRadius: 6,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  slider: {
    layer: 'liq-med', blur: 10, saturate: 150, cornerRadius: 999,
    displacementScale: 10, aberrationIntensity: 1, elasticity: 0.1,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  breadcrumb: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 8,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  dropdown: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  tabs: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0.1,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  carousel: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 12,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  steps: {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  pagination: {
    layer: 'liq-med', blur: 10, saturate: 150, cornerRadius: 8,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  'date-picker': {
    layer: 'liq-med', blur: 12, saturate: 160, cornerRadius: 10,
    displacementScale: 12, aberrationIntensity: 1, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  navbar: {
    layer: 'liq-med', blur: 12, saturate: 170, cornerRadius: 0,
    displacementScale: 15, aberrationIntensity: 1.5, elasticity: 0.1,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },

  // ---- 高清晰展示层 (liq-clear) — 纯 CSS 毛玻璃，不使用 SVG ----
  card: {
    layer: 'liq-high', blur: 16, saturate: 180, cornerRadius: 32,
    displacementScale: 70, aberrationIntensity: 2, elasticity: 0.15,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  table: {
    layer: 'liq-clear', blur: 20, saturate: 140, cornerRadius: 12,
    displacementScale: 8, aberrationIntensity: 0.8, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  accordion: {
    layer: 'liq-clear', blur: 20, saturate: 140, cornerRadius: 12,
    displacementScale: 8, aberrationIntensity: 0.8, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  list: {
    layer: 'liq-clear', blur: 20, saturate: 140, cornerRadius: 12,
    displacementScale: 8, aberrationIntensity: 0.8, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  timeline: {
    layer: 'liq-clear', blur: 20, saturate: 140, cornerRadius: 8,
    displacementScale: 8, aberrationIntensity: 0.8, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  divider: {
    layer: 'liq-clear', blur: 16, saturate: 130, cornerRadius: 0,
    displacementScale: 5, aberrationIntensity: 0.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  modal: {
    layer: 'liq-high', blur: 6, saturate: 140, cornerRadius: 32,
    displacementScale: 70, aberrationIntensity: 2, elasticity: 0.15,
    mouseTracking: true, mode: 'standard', useSvgFilter: true,
  },
  drawer: {
    layer: 'liq-clear', blur: 24, saturate: 140, cornerRadius: 0,
    displacementScale: 8, aberrationIntensity: 0.8, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: true,
  },
  avatar: {
    layer: 'liq-clear', blur: 16, saturate: 140, cornerRadius: 999,
    displacementScale: 8, aberrationIntensity: 0.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  text: {
    layer: 'liq-clear', blur: 16, saturate: 130, cornerRadius: 8,
    displacementScale: 5, aberrationIntensity: 0.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  tooltip: {
    layer: 'liq-clear', blur: 16, saturate: 140, cornerRadius: 8,
    displacementScale: 8, aberrationIntensity: 0.8, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
  progress: {
    layer: 'liq-clear', blur: 16, saturate: 140, cornerRadius: 999,
    displacementScale: 5, aberrationIntensity: 0.5, elasticity: 0,
    mouseTracking: false, mode: 'standard', useSvgFilter: false,
  },
}

/** 获取预设配置的副本 */
export function getGlassPreset(preset: GlassPreset): GlassPresetConfig {
  return { ...presets[preset] }
}
