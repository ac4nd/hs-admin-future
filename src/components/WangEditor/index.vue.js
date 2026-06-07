import { ref, shallowRef, watch, onBeforeUnmount } from "vue";
import "@wangeditor-next/editor/dist/css/style.css";
import { Toolbar, Editor } from "@wangeditor-next/editor-for-vue";
const props = withDefaults(defineProps(), {
    height: "400px",
    placeholder: "请输入内容...",
});
const modelValue = defineModel({
    type: String,
    required: false,
    default: "",
});
// 编辑器实例，必须用 shallowRef
const editorInstance = shallowRef();
const innerUpdating = ref(false);
const toolbarConfig = {};
const editorConfig = {
    placeholder: props.placeholder,
    MENU_CONF: {
        uploadImage: {
            async customUpload(file, insertFn) {
                // Mock: 使用 ObjectURL 模拟上传，实际接入后端时替换为 FileAPI.uploadFile(file)
                const url = URL.createObjectURL(file);
                insertFn(url, file.name, url);
            },
        },
    },
};
function handleCreated(editor) {
    editorInstance.value = editor;
}
function handleChange() {
    innerUpdating.value = true;
    Promise.resolve().then(() => {
        innerUpdating.value = false;
    });
}
watch(() => modelValue.value, () => {
    if (innerUpdating.value)
        return;
    // 外部赋值时重建编辑器以同步内容
    editorInstance.value = null;
});
onBeforeUnmount(() => {
    const editor = editorInstance.value;
    if (editor == null)
        return;
    editor.destroy();
});
const __VLS_defaultModels = {
    'modelValue': "",
};
let __VLS_modelEmit;
const __VLS_defaults = {
    height: "400px",
    placeholder: "请输入内容...",
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "border rounded-lg overflow-hidden" },
});
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
if (__VLS_ctx.editorInstance) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.Toolbar} */
    Toolbar;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        editor: (__VLS_ctx.editorInstance),
        defaultConfig: (__VLS_ctx.toolbarConfig),
        mode: "simple",
        ...{ class: "border-b" },
    }));
    const __VLS_2 = __VLS_1({
        editor: (__VLS_ctx.editorInstance),
        defaultConfig: (__VLS_ctx.toolbarConfig),
        mode: "simple",
        ...{ class: "border-b" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
}
let __VLS_5;
/** @ts-ignore @type { | typeof __VLS_components.Editor} */
Editor;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    ...{ 'onOnCreated': {} },
    ...{ 'onOnChange': {} },
    modelValue: (__VLS_ctx.modelValue),
    ...{ style: ({ height: __VLS_ctx.height, overflowY: 'hidden' }) },
    defaultConfig: (__VLS_ctx.editorConfig),
    mode: "simple",
}));
const __VLS_7 = __VLS_6({
    ...{ 'onOnCreated': {} },
    ...{ 'onOnChange': {} },
    modelValue: (__VLS_ctx.modelValue),
    ...{ style: ({ height: __VLS_ctx.height, overflowY: 'hidden' }) },
    defaultConfig: (__VLS_ctx.editorConfig),
    mode: "simple",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
let __VLS_10;
const __VLS_11 = ({ onCreated: {} },
    { onOnCreated: (__VLS_ctx.handleCreated) });
const __VLS_12 = ({ onChange: {} },
    { onOnChange: (__VLS_ctx.handleChange) });
var __VLS_8;
var __VLS_9;
// @ts-ignore
[editorInstance, editorInstance, toolbarConfig, modelValue, height, editorConfig, handleCreated, handleChange,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
//# sourceMappingURL=index.vue.js.map