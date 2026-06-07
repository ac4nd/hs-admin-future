import { ref } from "vue";
import { defineStore } from "pinia";
export const useTagsViewStore = defineStore("tagsView", () => {
    const visitedViews = ref([]);
    const cachedViews = ref([]);
    /** 从路由对象添加一个标签 */
    function addView(route) {
        addTagView(route);
        addCachedView(route);
    }
    /** 删除一个标签 */
    function deleteView(view) {
        delTagView(view);
        delCachedView(view);
    }
    /** 关闭其他标签 */
    function deleteOthersViews(view) {
        visitedViews.value = visitedViews.value.filter((v) => v.affix || v.path === view.path);
        cachedViews.value = cachedViews.value.filter((name) => visitedViews.value.some((v) => v.name === name));
    }
    /** 关闭左侧标签 */
    function deleteLeftViews(view) {
        const idx = visitedViews.value.findIndex((v) => v.path === view.path);
        if (idx === -1)
            return;
        visitedViews.value = visitedViews.value.filter((item, index) => {
            if (index >= idx || item.affix)
                return true;
            const ci = cachedViews.value.indexOf(item.name);
            if (ci !== -1)
                cachedViews.value.splice(ci, 1);
            return false;
        });
    }
    /** 关闭右侧标签 */
    function deleteRightViews(view) {
        const idx = visitedViews.value.findIndex((v) => v.path === view.path);
        if (idx === -1)
            return;
        visitedViews.value = visitedViews.value.filter((item, index) => {
            if (index <= idx || item.affix)
                return true;
            const ci = cachedViews.value.indexOf(item.name);
            if (ci !== -1)
                cachedViews.value.splice(ci, 1);
            return false;
        });
    }
    /** 关闭所有非 affix 标签 */
    function deleteAllViews() {
        const affixTags = visitedViews.value.filter((tag) => tag.affix);
        visitedViews.value = [...affixTags];
        cachedViews.value = affixTags.filter((tag) => tag.keepAlive).map((tag) => tag.name);
    }
    /** 删除指定标签的缓存 */
    function deleteCachedView(view) {
        const idx = cachedViews.value.indexOf(view.name);
        if (idx !== -1)
            cachedViews.value.splice(idx, 1);
    }
    // ---- 内部方法 ----
    function addTagView(route) {
        const { name, meta, path, fullPath, query } = route;
        if (visitedViews.value.some((v) => v.path === path))
            return;
        visitedViews.value.push({
            name: name,
            title: meta?.title ?? "",
            path,
            fullPath,
            icon: meta?.icon,
            affix: meta?.affix,
            keepAlive: meta?.keepAlive,
            query,
        });
    }
    function addCachedView(route) {
        const name = route.name;
        if (!name || cachedViews.value.includes(name))
            return;
        if (route.meta?.keepAlive)
            cachedViews.value.push(name);
    }
    function delTagView(view) {
        const idx = visitedViews.value.findIndex((v) => v.path === view.path);
        if (idx !== -1)
            visitedViews.value.splice(idx, 1);
    }
    function delCachedView(view) {
        const idx = cachedViews.value.indexOf(view.name);
        if (idx !== -1)
            cachedViews.value.splice(idx, 1);
    }
    /** 初始化 affix 标签 */
    function initAffixTags(routes) {
        const affixViews = [];
        function walk(routeList, basePath = "") {
            for (const route of routeList) {
                if (route.meta?.hidden)
                    continue;
                const full = resolvePath(basePath, route.path);
                if (route.children?.length) {
                    walk(route.children, full);
                }
                else if (route.meta?.affix) {
                    affixViews.push({
                        name: route.name ?? "",
                        title: route.meta?.title ?? "",
                        path: full,
                        fullPath: full,
                        icon: route.meta?.icon,
                        affix: true,
                        keepAlive: route.meta?.keepAlive,
                    });
                }
            }
        }
        walk(routes);
        visitedViews.value = affixViews;
        cachedViews.value = affixViews.filter((v) => v.keepAlive).map((v) => v.name);
    }
    return {
        visitedViews,
        cachedViews,
        addView,
        deleteView,
        deleteOthersViews,
        deleteLeftViews,
        deleteRightViews,
        deleteAllViews,
        deleteCachedView,
        initAffixTags,
    };
});
function resolvePath(basePath, routePath) {
    if (routePath.startsWith("/"))
        return routePath;
    return `${basePath}/${routePath}`.replace(/\/+/g, "/");
}
//# sourceMappingURL=tagsView.js.map