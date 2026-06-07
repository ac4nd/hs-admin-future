import { hasPerm, hasRole } from "./permission";
/**
 * 注册全局自定义指令
 */
export function setupDirective(app) {
    app.directive("hasPerm", hasPerm);
    app.directive("hasRole", hasRole);
}
//# sourceMappingURL=index.js.map