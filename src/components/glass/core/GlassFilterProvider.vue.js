import { displacementMapStandard } from "./displacementMaps";
const filters = [
    { id: "liq-high", displacementScale: 70, aberrationIntensity: 2, gaussianBlur: 0.3 },
    { id: "liq-med", displacementScale: 15, aberrationIntensity: 1.5, gaussianBlur: 0.35 },
    { id: "liq-clear", displacementScale: 8, aberrationIntensity: 0.8, gaussianBlur: 0.42 },
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ style: {} },
    'aria-hidden': "true",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
for (const [f] of __VLS_vFor((__VLS_ctx.filters))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.radialGradient, __VLS_intrinsics.radialGradient)({
        id: (`${f.id}-edge-mask`),
        key: (`${f.id}-edge-mask`),
        cx: "50%",
        cy: "50%",
        r: "50%",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "0%",
        'stop-color': "black",
        'stop-opacity': "0",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: (`${Math.max(30, 80 - f.aberrationIntensity * 2)}%`),
        'stop-color': "black",
        'stop-opacity': "0",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.stop)({
        offset: "100%",
        'stop-color': "white",
        'stop-opacity': "1",
    });
    // @ts-ignore
    [filters,];
}
for (const [f] of __VLS_vFor((__VLS_ctx.filters))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.filter, __VLS_intrinsics.filter)({
        id: (f.id),
        key: (f.id),
        x: "-35%",
        y: "-35%",
        width: "170%",
        height: "170%",
        'color-interpolation-filters': "sRGB",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feImage)({
        x: "0",
        y: "0",
        width: "100%",
        height: "100%",
        result: "DISPLACEMENT_MAP",
        href: (__VLS_ctx.displacementMapStandard),
        preserveAspectRatio: "xMidYMid slice",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feColorMatrix)({
        in: "DISPLACEMENT_MAP",
        type: "matrix",
        values: "0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0",
        result: "EDGE_INTENSITY",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feComponentTransfer, __VLS_intrinsics.feComponentTransfer)({
        in: "EDGE_INTENSITY",
        result: "EDGE_MASK",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feFuncA)({
        type: "discrete",
        tableValues: (`0 ${f.aberrationIntensity * 0.05} 1`),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feOffset)({
        in: "SourceGraphic",
        dx: "0",
        dy: "0",
        result: "CENTER_ORIGINAL",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feDisplacementMap)({
        in: "SourceGraphic",
        in2: "DISPLACEMENT_MAP",
        scale: (-f.displacementScale),
        xChannelSelector: "R",
        yChannelSelector: "B",
        result: "RED_DISPLACED",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feColorMatrix)({
        in: "RED_DISPLACED",
        type: "matrix",
        values: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
        result: "RED_CHANNEL",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feDisplacementMap)({
        in: "SourceGraphic",
        in2: "DISPLACEMENT_MAP",
        scale: (-f.displacementScale - f.displacementScale * f.aberrationIntensity * 0.05),
        xChannelSelector: "R",
        yChannelSelector: "B",
        result: "GREEN_DISPLACED",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feColorMatrix)({
        in: "GREEN_DISPLACED",
        type: "matrix",
        values: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
        result: "GREEN_CHANNEL",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feDisplacementMap)({
        in: "SourceGraphic",
        in2: "DISPLACEMENT_MAP",
        scale: (-f.displacementScale - f.displacementScale * f.aberrationIntensity * 0.1),
        xChannelSelector: "R",
        yChannelSelector: "B",
        result: "BLUE_DISPLACED",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feColorMatrix)({
        in: "BLUE_DISPLACED",
        type: "matrix",
        values: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
        result: "BLUE_CHANNEL",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feBlend)({
        in: "GREEN_CHANNEL",
        in2: "BLUE_CHANNEL",
        mode: "screen",
        result: "GB_COMBINED",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feBlend)({
        in: "RED_CHANNEL",
        in2: "GB_COMBINED",
        mode: "screen",
        result: "RGB_COMBINED",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feGaussianBlur)({
        in: "RGB_COMBINED",
        stdDeviation: (Math.max(0.1, 0.5 - f.aberrationIntensity * 0.1)),
        result: "ABERRATED_BLURRED",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feComposite)({
        in: "ABERRATED_BLURRED",
        in2: "EDGE_MASK",
        operator: "in",
        result: "EDGE_ABERRATION",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feComponentTransfer, __VLS_intrinsics.feComponentTransfer)({
        in: "EDGE_MASK",
        result: "INVERTED_MASK",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feFuncA)({
        type: "table",
        tableValues: "1 0",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feComposite)({
        in: "CENTER_ORIGINAL",
        in2: "INVERTED_MASK",
        operator: "in",
        result: "CENTER_CLEAN",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.feComposite)({
        in: "EDGE_ABERRATION",
        in2: "CENTER_CLEAN",
        operator: "over",
    });
    // @ts-ignore
    [filters, displacementMapStandard,];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=GlassFilterProvider.vue.js.map