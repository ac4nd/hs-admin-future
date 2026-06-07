import { ref, computed } from "vue";
import { useGlassFilter } from "./core/useGlassFilter";
import { cn } from "@/lib/utils";
const props = withDefaults(defineProps(), { as: "div" });
const { filterStyle, isOverLight, cornerRadius, config, isEnabled } = useGlassFilter(props.preset);
const surfaceRef = ref();
const mouseOffset = ref({ x: 0, y: 0 });
const isHovered = ref(false);
const isActive = ref(false);
const shouldTrackMouse = computed(() => isEnabled.value && (props.mouseTracking ?? config.value.mouseTracking));
const effectiveElasticity = computed(() => props.elasticity ?? config.value.elasticity);
// --- 性能优化：仅对 mouseTracking 组件监听 mousemove ---
let rafId = 0;
function handleMouseMove(e) {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
        const rect = surfaceRef.value.getBoundingClientRect();
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
    if (!effectiveElasticity.value)
        return "";
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
    const map = {
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
    if (!isEnabled.value)
        return {};
    const ol = isOverLight.value;
    return {
        ...filterStyle.value,
        borderRadius: `${cornerRadius.value}px`,
        background: config.value.layer === "liq-clear"
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
const __VLS_defaults = { as: "div" };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = (__VLS_ctx.as);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onMousemove': {} },
    ...{ 'onMouseenter': {} },
    ...{ 'onMouseleave': {} },
    ...{ 'onMousedown': {} },
    ...{ 'onMouseup': {} },
    ...{ 'onClick': {} },
    ref: "surfaceRef",
    ...{ class: (__VLS_ctx.cn('glass-surface relative overflow-hidden', __VLS_ctx.shouldTrackMouse && 'glass-surface--elastic', props.class)) },
    ...{ style: (__VLS_ctx.containerStyle) },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onMousemove': {} },
    ...{ 'onMouseenter': {} },
    ...{ 'onMouseleave': {} },
    ...{ 'onMousedown': {} },
    ...{ 'onMouseup': {} },
    ...{ 'onClick': {} },
    ref: "surfaceRef",
    ...{ class: (__VLS_ctx.cn('glass-surface relative overflow-hidden', __VLS_ctx.shouldTrackMouse && 'glass-surface--elastic', props.class)) },
    ...{ style: (__VLS_ctx.containerStyle) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ mousemove: {} },
    { onMousemove: (...[$event]) => {
            __VLS_ctx.shouldTrackMouse ? __VLS_ctx.handleMouseMove($event) : undefined;
            // @ts-ignore
            [as, cn, shouldTrackMouse, shouldTrackMouse, containerStyle, handleMouseMove,];
        } });
const __VLS_7 = ({ mouseenter: {} },
    { onMouseenter: (...[$event]) => {
            __VLS_ctx.isHovered = true;
            // @ts-ignore
            [isHovered,];
        } });
const __VLS_8 = ({ mouseleave: {} },
    { onMouseleave: (__VLS_ctx.handleMouseLeave) });
const __VLS_9 = ({ mousedown: {} },
    { onMousedown: (...[$event]) => {
            __VLS_ctx.isActive = true;
            // @ts-ignore
            [handleMouseLeave, isActive,];
        } });
const __VLS_10 = ({ mouseup: {} },
    { onMouseup: (...[$event]) => {
            __VLS_ctx.isActive = false;
            // @ts-ignore
            [isActive,];
        } });
const __VLS_11 = ({ click: {} },
    { onClick: (__VLS_ctx.onClick) });
var __VLS_12;
const { default: __VLS_14 } = __VLS_3.slots;
if (__VLS_ctx.isEnabled && __VLS_ctx.config.useSvgFilter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "absolute inset-0 pointer-events-none" },
        ...{ style: ({ ...__VLS_ctx.filterStyle, borderRadius: `${__VLS_ctx.cornerRadius}px` }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-[1] flex w-full h-full" },
    ...{ style: ({
            alignItems: 'inherit',
            justifyContent: 'inherit',
            gap: 'inherit',
            flexDirection: 'inherit',
        }) },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[1]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
var __VLS_15 = {};
if (__VLS_ctx.isEnabled) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "absolute inset-0 pointer-events-none" },
        ...{ style: ({
                borderRadius: `${__VLS_ctx.cornerRadius}px`,
                mixBlendMode: 'screen',
                opacity: 0.2,
                padding: '1.5px',
                WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                background: __VLS_ctx.borderGradient,
                transition: 'all 0.3s ease',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
}
if (__VLS_ctx.isEnabled) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "absolute inset-0 pointer-events-none" },
        ...{ style: ({
                borderRadius: `${__VLS_ctx.cornerRadius}px`,
                mixBlendMode: 'overlay',
                padding: '1.5px',
                WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                background: __VLS_ctx.borderGradient,
                transition: 'all 0.3s ease',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
}
if (__VLS_ctx.isEnabled && __VLS_ctx.onClick) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 pointer-events-none transition-opacity duration-200" },
        ...{ style: ({
                borderRadius: `${__VLS_ctx.cornerRadius}px`,
                opacity: __VLS_ctx.isHovered || __VLS_ctx.isActive ? 0.5 : 0,
                backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)',
                mixBlendMode: 'overlay',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
    /** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
}
// @ts-ignore
[isHovered, isActive, onClick, onClick, isEnabled, isEnabled, isEnabled, isEnabled, config, filterStyle, cornerRadius, cornerRadius, cornerRadius, cornerRadius, borderGradient, borderGradient,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_13 = __VLS_12, __VLS_16 = __VLS_15;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
//# sourceMappingURL=GlassSurface.vue.js.map