import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { params, query } = route;
const { path } = params;
router.replace({ path: "/" + path, query });
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({});
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map