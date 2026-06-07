import { createI18n } from "vue-i18n";
import { useAppStoreHook } from "@/stores/app";
import enLocale from "./package/en.json";
import zhCnLocale from "./package/zh-cn.json";
const appStore = useAppStoreHook();
const messages = {
    "zh-cn": zhCnLocale,
    en: enLocale,
};
const i18n = createI18n({
    legacy: false,
    locale: appStore.language,
    messages,
    globalInjection: true,
});
export function setupI18n(app) {
    app.use(i18n);
}
export default i18n;
//# sourceMappingURL=index.js.map