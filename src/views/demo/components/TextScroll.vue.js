import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { XIcon } from "@lucide/vue";
const props = withDefaults(defineProps(), {
    type: "default",
    speed: 50,
    direction: "left",
    typewriter: false,
    showClose: false,
});
const visible = ref(true);
const displayedText = ref("");
let twTimer = null;
const typeClass = computed(() => {
    const map = {
        default: "bg-muted/50 text-foreground",
        success: "bg-green-500/10 text-green-700 dark:text-green-400",
        warning: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        danger: "bg-red-500/10 text-red-700 dark:text-red-400",
        info: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    };
    return map[props.type] ?? map.default;
});
const scrollAnim = computed(() => {
    const dir = props.direction === "right" ? "scrollRight" : "scrollLeft";
    const duration = Math.max(5, props.text.length * 0.15);
    return `${dir} ${duration}s linear infinite`;
});
// 打字机效果
function startTypewriter() {
    displayedText.value = "";
    let idx = 0;
    const tick = () => {
        if (idx < props.text.length) {
            displayedText.value += props.text[idx++];
            twTimer = setTimeout(tick, 80);
        }
        else {
            // 完成后暂停再重新开始
            twTimer = setTimeout(() => {
                idx = 0;
                displayedText.value = "";
                tick();
            }, 3000);
        }
    };
    tick();
}
watch(() => props.text, () => {
    if (props.typewriter) {
        if (twTimer)
            clearTimeout(twTimer);
        startTypewriter();
    }
});
onMounted(() => {
    if (props.typewriter)
        startTypewriter();
});
onUnmounted(() => {
    if (twTimer)
        clearTimeout(twTimer);
});
const __VLS_defaults = {
    type: "default",
    speed: 50,
    direction: "left",
    typewriter: false,
    showClose: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.visible) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: (['flex items-center gap-2 px-4 py-2 rounded-lg text-sm', __VLS_ctx.typeClass]) },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    if (__VLS_ctx.showClose) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.visible))
                        return;
                    if (!(__VLS_ctx.showClose))
                        return;
                    __VLS_ctx.visible = false;
                    // @ts-ignore
                    [visible, visible, typeClass, showClose,];
                } },
            ...{ class: "shrink-0 opacity-60 hover:opacity-100" },
        });
        /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
        let __VLS_0;
        /** @ts-ignore @type { | typeof __VLS_components.XIcon} */
        XIcon;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            ...{ class: "size-3.5" },
        }));
        const __VLS_2 = __VLS_1({
            ...{ class: "size-3.5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        /** @type {__VLS_StyleScopedClasses['size-3.5']} */ ;
    }
    if (__VLS_ctx.typewriter) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "whitespace-nowrap overflow-hidden" },
        });
        /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        (__VLS_ctx.displayedText);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "animate-pulse" },
        });
        /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "overflow-hidden flex-1 relative" },
        });
        /** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
        /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
        /** @type {__VLS_StyleScopedClasses['relative']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ref: "scrollRef",
            ...{ class: "whitespace-nowrap inline-block" },
            ...{ style: ({ animation: __VLS_ctx.scrollAnim }) },
        });
        /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
        /** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
        (__VLS_ctx.text);
    }
}
// @ts-ignore
[typewriter, displayedText, scrollAnim, text,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=TextScroll.vue.js.map