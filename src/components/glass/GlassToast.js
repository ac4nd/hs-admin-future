import { toast } from "vue-sonner";
import { useSettingsStore } from "@/stores";
/** 玻璃效果 Toast composable（需在 setup 中调用） */
export function useGlassToast() {
    const settingsStore = useSettingsStore();
    /** Toast 不使用 SVG filter，仅用 CSS backdrop-filter 实现毛玻璃 */
    function getGlassStyle() {
        if (!settingsStore.glassEffect)
            return undefined;
        return {
            backdropFilter: "blur(8px) saturate(200%)",
            WebkitBackdropFilter: "blur(8px) saturate(200%)",
            background: "rgba(18,18,20,0.72)",
            border: "1px solid rgba(255,255,255,0.1)",
        };
    }
    function show(message, options) {
        toast(message, { ...options, style: getGlassStyle() });
    }
    function success(message, options) {
        toast.success(message, { ...options, style: getGlassStyle() });
    }
    function error(message, options) {
        toast.error(message, { ...options, style: getGlassStyle() });
    }
    function warning(message, options) {
        toast.warning(message, { ...options, style: getGlassStyle() });
    }
    function info(message, options) {
        toast.info(message, { ...options, style: getGlassStyle() });
    }
    function promise(p, data) {
        return toast.promise(p, {
            ...data,
            style: getGlassStyle(),
        });
    }
    return { show, success, error, warning, info, promise };
}
//# sourceMappingURL=GlassToast.js.map