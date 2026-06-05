<template>
  <component
    :is="as"
    ref="surfaceRef"
    :class="
      cn(
        'glass-surface relative overflow-hidden',
        shouldTrackMouse && 'glass-surface--elastic',
        props.class
      )
    "
    :style="containerStyle"
    @mousemove="shouldTrackMouse ? handleMouseMove($event) : undefined"
    @mouseenter="isHovered = true"
    @mouseleave="handleMouseLeave"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
    @click="onClick"
  >
    <!-- backdrop 扭曲层（仅 SVG 滤镜组需要，纯 CSS 组由容器自身承担 backdrop-filter） -->
    <span
      v-if="isEnabled && config.useSvgFilter"
      class="absolute inset-0 pointer-events-none"
      :style="{ ...filterStyle, borderRadius: `${cornerRadius}px` }"
    />

    <!-- 用户内容 -->
    <div
      class="relative z-[1] flex w-full h-full"
      :style="{
        alignItems: 'inherit',
        justifyContent: 'inherit',
        gap: 'inherit',
        flexDirection: 'inherit',
      }"
    >
      <slot />
    </div>

    <!-- 边框渐变层 1 (screen) -->
    <span
      v-if="isEnabled"
      class="absolute inset-0 pointer-events-none"
      :style="{
        borderRadius: `${cornerRadius}px`,
        mixBlendMode: 'screen',
        opacity: 0.2,
        padding: '1.5px',
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        background: borderGradient,
        transition: 'all 0.3s ease',
      }"
    />

    <!-- 边框渐变层 2 (overlay) -->
    <span
      v-if="isEnabled"
      class="absolute inset-0 pointer-events-none"
      :style="{
        borderRadius: `${cornerRadius}px`,
        mixBlendMode: 'overlay',
        padding: '1.5px',
        WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        background: borderGradient,
        transition: 'all 0.3s ease',
      }"
    />

    <!-- Hover 效果 -->
    <div
      v-if="isEnabled && onClick"
      class="absolute inset-0 pointer-events-none transition-opacity duration-200"
      :style="{
        borderRadius: `${cornerRadius}px`,
        opacity: isHovered || isActive ? 0.5 : 0,
        backgroundImage:
          'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)',
        mixBlendMode: 'overlay',
      }"
    />
  </component>
</template>

<script lang="ts" setup>
import { ref, computed, type HTMLAttributes } from "vue";
import { useGlassFilter } from "./core/useGlassFilter";
import { cn } from "@/lib/utils";
import type { GlassPreset } from "./core/types";

const props = withDefaults(
  defineProps<{
    preset: GlassPreset;
    class?: HTMLAttributes["class"];
    as?: string;
    mouseTracking?: boolean;
    elasticity?: number;
    onClick?: () => void;
  }>(),
  { as: "div" }
);

const { filterStyle, isOverLight, cornerRadius, config, isEnabled } = useGlassFilter(props.preset);

const surfaceRef = ref<HTMLElement>();
const mouseOffset = ref({ x: 0, y: 0 });
const isHovered = ref(false);
const isActive = ref(false);

const shouldTrackMouse = computed(
  () => isEnabled.value && (props.mouseTracking ?? config.value.mouseTracking)
);
const effectiveElasticity = computed(() => props.elasticity ?? config.value.elasticity);

// --- 性能优化：仅对 mouseTracking 组件监听 mousemove ---
let rafId = 0;
function handleMouseMove(e: MouseEvent) {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const rect = surfaceRef.value!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseOffset.value = {
      x: ((e.clientX - cx) / rect.width) * 100,
      y: ((e.clientY - cy) / rect.height) * 100,
    };
  });
}

function handleMouseLeave() {
  isHovered.value = false;
  isActive.value = false;
  mouseOffset.value = { x: 0, y: 0 };
}

// 弹性变换 — 仅 mouseTracking 组件计算
const elasticTransform = computed(() => {
  if (!effectiveElasticity.value) return "";
  const e = effectiveElasticity.value;
  const nx = mouseOffset.value.x / 100;
  const ny = mouseOffset.value.y / 100;
  const sx = 1 + Math.abs(nx) * e * 0.3 - Math.abs(ny) * e * 0.15;
  const sy = 1 + Math.abs(ny) * e * 0.3 - Math.abs(nx) * e * 0.15;
  const tx = nx * e * 10;
  const ty = ny * e * 10;
  const click = isActive.value && props.onClick ? "scale(0.96)" : "";
  return `translate(${tx}px,${ty}px) scaleX(${Math.max(0.85, sx)}) scaleY(${Math.max(0.85, sy)}) ${click}`;
});

// 边框渐变 — 仅 hover 时有值，否则用静态值减少计算
const borderGradient = computed(() => {
  if (!isHovered.value && !shouldTrackMouse.value) {
    return "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 33%, rgba(255,255,255,0.2) 66%, rgba(255,255,255,0) 100%)";
  }
  const ox = mouseOffset.value.x;
  const oy = mouseOffset.value.y;
  const base = isHovered.value ? 0.15 : 0.08;
  const mid = isHovered.value ? 0.35 : 0.2;
  return `linear-gradient(${135 + ox * 1.2}deg,rgba(255,255,255,0) 0%,rgba(255,255,255,${base + Math.abs(ox) * 0.005}) ${Math.max(10, 33 + oy * 0.3)}%,rgba(255,255,255,${mid + Math.abs(ox) * 0.008}) ${Math.min(90, 66 + oy * 0.4)}%,rgba(255,255,255,0) 100%)`;
});

// 层级样式 — 静态，不依赖鼠标
const layerStyles = computed(() => {
  const ol = isOverLight.value;
  const map: Record<string, string> = {
    "liq-high": ol
      ? "0 0 0 0.5px rgba(255,255,255,0.5) inset, 0 1px 3px rgba(255,255,255,0.25) inset, 0 1px 4px rgba(0,0,0,0.35)"
      : "0 0 0 0.5px rgba(255,255,255,0.15) inset, 0 1px 2px rgba(255,255,255,0.1) inset, 0 4px 20px rgba(0,0,0,0.6)",
    "liq-med": ol
      ? "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)"
      : "0 2px 12px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.06)",
    "liq-clear": ol
      ? "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)"
      : "0 8px 32px rgba(0,0,0,0.5), inset 0 0.5px 0 rgba(255,255,255,0.04)",
  };
  return map[config.value.layer];
});

const containerStyle = computed(() => {
  if (!isEnabled.value) return {};
  const ol = isOverLight.value;
  return {
    ...filterStyle.value,
    borderRadius: `${cornerRadius.value}px`,
    background:
      config.value.layer === "liq-clear"
        ? ol
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)"
        : ol
          ? "rgba(255,255,255,0.12)"
          : "rgba(30,30,35,0.3)",
    border: `1px solid ${ol ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.06)"}`,
    boxShadow: layerStyles.value,
    ...(shouldTrackMouse.value && effectiveElasticity.value
      ? {
          transform: elasticTransform.value,
          transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
        }
      : {}),
  };
});
</script>
