import i18n from "@/lang";
/**
 * 翻译路由标题
 * 与 hs-admin 的 translateRouteTitle 逻辑一致：
 * 优先查找 i18n key `route.${title}`，不存在则返回原始字符串
 */
export function translateRouteTitle(title) {
    if (!title)
        return "";
    const key = `route.${title}`;
    return i18n.global.te(key) ? i18n.global.t(key) : title;
}
//# sourceMappingURL=i18n.js.map