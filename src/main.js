import { createApp } from "vue";
import { setupStore } from "@/stores";
import { setupI18n } from "@/lang";
import { setupDirective } from "@/directives";
import { setupPermissionGuard } from "@/router/guards/permission";
import router from "./router";
import App from "./App.vue";
import MenuIcon from "@/layouts/components/MenuIcon.vue";
import "@/assets/index.css";
const app = createApp(App);
setupStore(app);
setupI18n(app);
setupDirective(app);
setupPermissionGuard();
app.component("MenuIcon", MenuIcon);
app.use(router);
app.mount("#app");
//# sourceMappingURL=main.js.map