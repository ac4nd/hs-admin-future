/**
 * 菜单管理 API（Mock 实现）
 *
 * TODO: 接入后端 API 后替换 localStorage 为 HTTP 请求
 */
import type { OptionItem } from "@/api/common";
import type { MenuQuery, MenuItem, MenuForm } from "./types";

const STORAGE_KEY = "mock_menus";

// ==================== 初始 Mock 数据 ====================

function getDefaultMenus(): MenuItem[] {
  return [
    {
      id: "1", parentId: "0", name: "系统管理", type: "C",
      path: "/system", routeName: "/system", routePath: "/system",
      icon: "Settings", sort: 1, visible: 1, scope: 1, redirect: "/system/user",
      children: [
        {
          id: "1-1", parentId: "1", name: "用户管理", type: "M",
          path: "user", routeName: "SysUser", routePath: "user",
          component: "system/user/index", icon: "User", sort: 1, visible: 1, scope: 1,
          children: [
            { id: "1-1-1", parentId: "1-1", name: "用户新增", type: "B", perm: "sys:user:create", sort: 1, visible: 1, scope: 1 },
            { id: "1-1-2", parentId: "1-1", name: "用户编辑", type: "B", perm: "sys:user:update", sort: 2, visible: 1, scope: 1 },
            { id: "1-1-3", parentId: "1-1", name: "用户删除", type: "B", perm: "sys:user:delete", sort: 3, visible: 1, scope: 1 },
          ],
        },
        {
          id: "1-2", parentId: "1", name: "角色管理", type: "M",
          path: "role", routeName: "SysRole", routePath: "role",
          component: "system/role/index", icon: "Shield", sort: 2, visible: 1, scope: 1,
          children: [
            { id: "1-2-1", parentId: "1-2", name: "角色新增", type: "B", perm: "sys:role:create", sort: 1, visible: 1, scope: 1 },
            { id: "1-2-2", parentId: "1-2", name: "角色编辑", type: "B", perm: "sys:role:update", sort: 2, visible: 1, scope: 1 },
            { id: "1-2-3", parentId: "1-2", name: "角色删除", type: "B", perm: "sys:role:delete", sort: 3, visible: 1, scope: 1 },
          ],
        },
        {
          id: "1-3", parentId: "1", name: "菜单管理", type: "M",
          path: "menu", routeName: "SysMenu", routePath: "menu",
          component: "system/menu/index", icon: "Menu", sort: 3, visible: 1, scope: 1,
          children: [
            { id: "1-3-1", parentId: "1-3", name: "菜单新增", type: "B", perm: "sys:menu:create", sort: 1, visible: 1, scope: 1 },
            { id: "1-3-2", parentId: "1-3", name: "菜单编辑", type: "B", perm: "sys:menu:update", sort: 2, visible: 1, scope: 1 },
            { id: "1-3-3", parentId: "1-3", name: "菜单删除", type: "B", perm: "sys:menu:delete", sort: 3, visible: 1, scope: 1 },
          ],
        },
        {
          id: "1-4", parentId: "1", name: "部门管理", type: "M",
          path: "dept", routeName: "SysDept", routePath: "dept",
          component: "system/dept/index", icon: "Building2", sort: 4, visible: 1, scope: 1,
          children: [
            { id: "1-4-1", parentId: "1-4", name: "部门新增", type: "B", perm: "sys:dept:create", sort: 1, visible: 1, scope: 1 },
            { id: "1-4-2", parentId: "1-4", name: "部门编辑", type: "B", perm: "sys:dept:update", sort: 2, visible: 1, scope: 1 },
            { id: "1-4-3", parentId: "1-4", name: "部门删除", type: "B", perm: "sys:dept:delete", sort: 3, visible: 1, scope: 1 },
          ],
        },
        {
          id: "1-5", parentId: "1", name: "字典管理", type: "M",
          path: "dict", routeName: "SysDict", routePath: "dict",
          component: "system/dict/index", icon: "BookOpen", sort: 5, visible: 1, scope: 1,
          children: [
            { id: "1-5-1", parentId: "1-5", name: "字典新增", type: "B", perm: "sys:dict:create", sort: 1, visible: 1, scope: 1 },
            { id: "1-5-2", parentId: "1-5", name: "字典编辑", type: "B", perm: "sys:dict:update", sort: 2, visible: 1, scope: 1 },
            { id: "1-5-3", parentId: "1-5", name: "字典删除", type: "B", perm: "sys:dict:delete", sort: 3, visible: 1, scope: 1 },
          ],
        },
      ],
    },
    {
      id: "2", parentId: "0", name: "系统监控", type: "C",
      path: "/monitor", routeName: "/monitor", routePath: "/monitor",
      icon: "Monitor", sort: 2, visible: 1, scope: 1, redirect: "/monitor/online",
      children: [
        {
          id: "2-1", parentId: "2", name: "在线用户", type: "M",
          path: "online", routeName: "MonitorOnline", routePath: "online",
          component: "monitor/online/index", icon: "Users", sort: 1, visible: 1, scope: 1,
        },
        {
          id: "2-2", parentId: "2", name: "服务监控", type: "M",
          path: "server", routeName: "MonitorServer", routePath: "server",
          component: "monitor/server/index", icon: "Server", sort: 2, visible: 1, scope: 1,
        },
      ],
    },
    {
      id: "3", parentId: "0", name: "系统工具", type: "C",
      path: "/tool", routeName: "/tool", routePath: "/tool",
      icon: "Wrench", sort: 3, visible: 1, scope: 2, redirect: "/tool/codegen",
      children: [
        {
          id: "3-1", parentId: "3", name: "代码生成", type: "M",
          path: "codegen", routeName: "ToolCodegen", routePath: "codegen",
          component: "tool/codegen/index", icon: "Code", sort: 1, visible: 1, scope: 2,
        },
        {
          id: "3-2", parentId: "3", name: "API 文档", type: "M",
          path: "api", routeName: "ToolApi", routePath: "api",
          component: "tool/api/index", icon: "FileText", sort: 2, visible: 1, scope: 2,
        },
      ],
    },
  ];
}

function loadMenus(): MenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const defaults = getDefaultMenus();
  saveMenus(defaults);
  return defaults;
}

function saveMenus(menus: MenuItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
}

let nextId = 200;

// ==================== 辅助方法 ====================

/** 递归过滤菜单树 */
function filterMenuTree(items: MenuItem[], keywords: string): MenuItem[] {
  const kw = keywords.toLowerCase();
  return items
    .map((item) => {
      const nameMatch = item.name?.toLowerCase().includes(kw);
      if (item.children?.length) {
        const filteredChildren = filterMenuTree(item.children, keywords);
        if (nameMatch || filteredChildren.length > 0) {
          return { ...item, children: nameMatch ? item.children : filteredChildren };
        }
      }
      return nameMatch ? { ...item } : null;
    })
    .filter(Boolean) as MenuItem[];
}

/** 递归查找菜单节点 */
function findMenuNode(items: MenuItem[], id: string): MenuItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findMenuNode(item.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

/** 递归删除菜单节点 */
function removeMenuNode(items: MenuItem[], id: string): MenuItem[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) => {
      if (item.children) {
        return { ...item, children: removeMenuNode(item.children, id) };
      }
      return item;
    });
}

/** 递归更新菜单节点 */
function updateMenuNode(items: MenuItem[], id: string, data: MenuForm): MenuItem[] {
  return items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        name: data.name,
        type: data.type,
        path: data.path,
        routeName: data.routeName,
        routePath: data.routePath,
        component: data.component,
        icon: data.icon,
        perm: data.perm,
        sort: data.sort,
        visible: data.visible,
        scope: data.scope,
        redirect: data.redirect,
      };
    }
    if (item.children) {
      return { ...item, children: updateMenuNode(item.children, id, data) };
    }
    return item;
  });
}

/** 递归添加子菜单 */
function addChildMenu(items: MenuItem[], parentId: string, newMenu: MenuItem): MenuItem[] {
  return items.map((item) => {
    if (item.id === parentId) {
      const children = [...(item.children ?? []), newMenu];
      return { ...item, children };
    }
    if (item.children) {
      return { ...item, children: addChildMenu(item.children, parentId, newMenu) };
    }
    return item;
  });
}

/** 菜单树转下拉选项树 */
function menuToOptions(items: MenuItem[], onlyParent?: boolean): OptionItem[] {
  return items
    .filter((item) => !onlyParent || item.type !== "B")
    .map((item) => {
      const option: OptionItem = { value: item.id!, label: item.name! };
      if (item.children?.length) {
        const childOptions = menuToOptions(item.children, onlyParent);
        if (childOptions.length > 0) {
          option.children = childOptions;
        }
      }
      return option;
    });
}

// ==================== API 方法 ====================

/** 获取菜单树形列表 */
export function getMenuList(params?: MenuQuery): MenuItem[] {
  const menus = loadMenus();
  if (params?.keywords) {
    return filterMenuTree(menus, params.keywords);
  }
  return menus;
}

/** 获取菜单下拉选项 */
export function getMenuOptions(onlyParent?: boolean): OptionItem[] {
  const menus = loadMenus();
  return menuToOptions(menus, onlyParent);
}

/** 获取菜单表单数据（编辑时回显） */
export function getMenuFormData(id: string): MenuForm | undefined {
  const node = findMenuNode(loadMenus(), id);
  if (!node) return undefined;
  return {
    id: node.id,
    parentId: node.parentId,
    name: node.name,
    type: node.type,
    path: node.path,
    routeName: node.routeName,
    routePath: node.routePath,
    redirect: node.redirect,
    component: node.component,
    icon: node.icon,
    sort: node.sort,
    visible: node.visible,
    scope: node.scope,
    perm: node.perm,
    params: [],
    alwaysShow: 0,
    keepAlive: 1,
  };
}

/** 新增菜单 */
export function createMenu(data: MenuForm): MenuItem {
  const menus = loadMenus();
  const newMenu: MenuItem = {
    id: String(nextId++),
    parentId: data.parentId ?? "0",
    name: data.name,
    type: data.type,
    path: data.path,
    routeName: data.routeName,
    routePath: data.routePath,
    redirect: data.redirect,
    component: data.component,
    icon: data.icon,
    perm: data.perm,
    sort: data.sort ?? 1,
    visible: data.visible ?? 1,
    scope: data.scope ?? 2,
  };

  if (data.parentId && data.parentId !== "0") {
    saveMenus(addChildMenu(menus, data.parentId, newMenu));
  } else {
    menus.push(newMenu);
    saveMenus(menus);
  }
  return newMenu;
}

/** 更新菜单 */
export function updateMenu(id: string, data: MenuForm): boolean {
  const menus = loadMenus();
  const node = findMenuNode(menus, id);
  if (!node) return false;
  saveMenus(updateMenuNode(menus, id, data));
  return true;
}

/** 删除菜单 */
export function deleteMenu(id: string): boolean {
  const menus = loadMenus();
  const before = JSON.stringify(menus);
  const result = removeMenuNode(menus, id);
  if (JSON.stringify(result) === before) return false;
  saveMenus(result);
  return true;
}
