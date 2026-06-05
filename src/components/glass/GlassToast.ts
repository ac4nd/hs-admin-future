import { toast } from "vue-sonner";
import { useSettingsStore } from "@/stores";

/** 玻璃效果 Toast composable（需在 setup 中调用） */
export function useGlassToast() {
  const settingsStore = useSettingsStore();

  /** Toast 不使用 SVG filter，仅用 CSS backdrop-filter 实现毛玻璃 */
  function getGlassStyle(): Record<string, string> | undefined {
    if (!settingsStore.glassEffect) return undefined;
    return {
      backdropFilter: "blur(8px) saturate(200%)",
      WebkitBackdropFilter: "blur(8px) saturate(200%)",
      background: "rgba(18,18,20,0.72)",
      border: "1px solid rgba(255,255,255,0.1)",
    };
  }

  function show(message: string, options?: { description?: string; duration?: number }) {
    toast(message, { ...options, style: getGlassStyle() });
  }

  function success(message: string, options?: { description?: string }) {
    toast.success(message, { ...options, style: getGlassStyle() });
  }

  function error(message: string, options?: { description?: string }) {
    toast.error(message, { ...options, style: getGlassStyle() });
  }

  return { show, success, error };
}
