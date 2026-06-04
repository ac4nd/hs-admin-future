import { computed, toRef, type ComputedRef } from 'vue'
import { useGlassTheme } from './useGlassTheme'
import { useSettingsStore } from '@/stores'
import { getGlassPreset } from './presets'
import type { GlassPreset, GlassPresetConfig, CSSProperties } from './types'

export interface UseGlassFilterReturn {
  /** 滤镜内联样式 (filter + backdrop-filter) */
  filterStyle: ComputedRef<Partial<CSSProperties>>
  /** 是否为亮色主题 */
  isOverLight: ComputedRef<boolean>
  /** 预设圆角 (受设置面板参数覆盖) */
  cornerRadius: ComputedRef<number>
  /** 完整预设配置 (已合并设置面板参数) */
  config: ComputedRef<GlassPresetConfig>
  /** 玻璃效果是否启用 */
  isEnabled: ComputedRef<boolean>
}

/**
 * 玻璃滤镜 composable
 *
 * 设置面板 glassParams 覆盖 preset 值：
 * - blur / saturation / cornerRadius / displacementScale / aberrationIntensity / elasticity
 */
export function useGlassFilter(preset: GlassPreset): UseGlassFilterReturn {
  const settingsStore = useSettingsStore()
  const { isOverLight } = useGlassTheme()
  const presetConfig = getGlassPreset(preset)

  // toRef 保持与 store Ref 的响应式绑定
  const glassEffect = toRef(settingsStore, 'glassEffect')
  const glassParams = toRef(settingsStore, 'glassParams')

  const isEnabled = computed(() => glassEffect.value)

  const config = computed<GlassPresetConfig>(() => {
    const gp = glassParams.value
    return {
      ...presetConfig,
      // blur / saturate 取预设与全局的较大值，预设定义视觉下限，全局设置只能增强
      blur: Math.max(presetConfig.blur, gp.blur),
      saturate: Math.max(presetConfig.saturate, gp.saturation),
      // cornerRadius 保留 preset 原值，不被全局参数覆盖（圆角是组件设计属性）
      displacementScale: gp.displacementScale,
      aberrationIntensity: gp.aberrationIntensity,
      elasticity: gp.elasticity,
    }
  })

  const cornerRadius = computed(() => config.value.cornerRadius)

  const filterStyle = computed(() => {
    if (!isEnabled.value) return {}

    const c = config.value
    const isFirefox = typeof navigator !== 'undefined'
      && navigator.userAgent.toLowerCase().includes('firefox')

    return {
      filter: (!c.useSvgFilter || isFirefox) ? undefined : `url(#${c.layer})`,
      backdropFilter: `blur(${c.blur}px) saturate(${c.saturate}%)`,
      WebkitBackdropFilter: `blur(${c.blur}px) saturate(${c.saturate}%)`,
    }
  })

  return {
    filterStyle,
    isOverLight,
    cornerRadius,
    config,
    isEnabled,
  }
}
