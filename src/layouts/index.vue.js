import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSettingsStore } from "@/stores";
import LeftLayout from "./LeftLayout.vue";
import TopLayout from "./TopLayout.vue";
import MixLayout from "./MixLayout.vue";
import LayoutSettings from "./components/LayoutSettings.vue";
const route = useRoute();
const settingsStore = useSettingsStore();
const currentLayoutComponent = computed(() => {
    const override = route.meta?.layout;
    const layout = override ?? settingsStore.layout;
    switch (layout) {
        case "top" /* LayoutMode.TOP */:
            return TopLayout;
        case "mix" /* LayoutMode.MIX */:
            return MixLayout;
        default:
            return LeftLayout;
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full h-full" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
const __VLS_0 = (__VLS_ctx.currentLayoutComponent);
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_5 = LayoutSettings;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
// @ts-ignore
[currentLayoutComponent,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map