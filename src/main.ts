import { createApp } from "vue";
import { setupStore } from "@/stores";
import { setupI18n } from "@/lang";
import { setupPermissionGuard } from "@/router/guards/permission";
import router from "./router";
import App from "./App.vue";
import "@/assets/index.css";

const app = createApp(App);
setupStore(app);
setupI18n(app);
setupPermissionGuard();
app.use(router);
app.mount("#app");
