/**
 * 从路由配置中递归提取菜单树
 * 过滤 meta.hidden 路由，构建 MenuItem 树
 */
export function generateMenus(routes, basePath = "") {
    const menus = [];
    for (const route of routes) {
        const item = buildMenuItem(route, basePath);
        if (item)
            menus.push(item);
    }
    return menus;
}
function buildMenuItem(route, basePath) {
    const meta = route.meta;
    if (meta?.hidden)
        return null;
    const fullPath = resolveRoutePath(basePath, route.path);
    const item = {
        fullPath,
        name: route.name,
        title: meta?.title ?? "",
        icon: meta?.icon,
        hidden: meta?.hidden,
        affix: meta?.affix,
        alwaysShow: meta?.alwaysShow,
        params: meta?.params,
    };
    if (route.children?.length) {
        const children = [];
        for (const child of route.children) {
            const childItem = buildMenuItem(child, fullPath);
            if (childItem)
                children.push(childItem);
        }
        // 单可见子节点 & 无 alwaysShow → 提升子节点为当前层级
        if (children.length === 1 && !meta?.alwaysShow) {
            const only = children[0];
            return {
                ...only,
                fullPath: only.fullPath,
            };
        }
        if (children.length > 0)
            item.children = children;
    }
    return item;
}
function resolveRoutePath(basePath, routePath) {
    if (routePath.startsWith("/"))
        return routePath;
    if (routePath.startsWith("http"))
        return routePath;
    if (basePath.endsWith("/"))
        return `${basePath}${routePath}`;
    return `${basePath}/${routePath}`;
}
//# sourceMappingURL=menu.js.map