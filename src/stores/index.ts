import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { useSettingsStore } from "./settings";
export { useAppStore } from "./app";
export { useUserStore } from "./user";
export { usePermissionStore } from "./permission";
export { useTagsViewStore } from "./tagsView";
export { store };
