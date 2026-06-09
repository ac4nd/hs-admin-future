/**
 * 动态路由定义
 *
 * 数据结构与 hs-admin mock `menus/routes` 返回值一致。
 * 未来接入后端 API 后，此文件可替换为 API 返回数据。
 */
import type { RouteRecordRaw } from "vue-router";

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/system",
    component: () => import("@/layouts/index.vue"),
    redirect: "/system/user",
    name: "/system",
    meta: { title: "系统管理", icon: "🖥️" },
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        name: "User",
        meta: { title: "用户管理", icon: "👤", keepAlive: true },
      },
      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "Role",
        meta: { title: "角色管理", icon: "🔑", keepAlive: true },
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "SysMenu",
        meta: { title: "菜单管理", icon: "📋", keepAlive: true },
      },
      {
        path: "dept",
        component: () => import("@/views/system/dept/index.vue"),
        name: "Dept",
        meta: { title: "部门管理", icon: "🌳", keepAlive: true },
      },
      {
        path: "dict",
        component: () => import("@/views/system/dict/index.vue"),
        name: "Dict",
        meta: { title: "字典管理", icon: "📚", keepAlive: true },
      },
      {
        path: "dict/:dictCode/items",
        component: () => import("@/views/system/dict/dict-item.vue"),
        name: "DictItem",
        meta: { title: "字典数据", icon: "📑", hidden: true },
      },
      {
        path: "log",
        component: () => import("@/views/system/log/index.vue"),
        name: "Log",
        meta: { title: "系统日志", icon: "📝", keepAlive: true },
      },
      {
        path: "config",
        component: () => import("@/views/system/config/index.vue"),
        name: "Config",
        meta: { title: "系统配置", icon: "🔧", keepAlive: true },
      },
      {
        path: "notice",
        component: () => import("@/views/system/notice/index.vue"),
        name: "Notice",
        meta: { title: "通知公告", icon: "📢" },
      },
      {
        path: "tenant-plan",
        component: () => import("@/views/system/tenant-plan/index.vue"),
        name: "TenantPlan",
        meta: { title: "租户套餐", icon: "📦", keepAlive: true },
      },
      {
        path: "tenant",
        component: () => import("@/views/system/tenant/index.vue"),
        name: "Tenant",
        meta: { title: "租户管理", icon: "🏢", keepAlive: true },
      },
    ],
  },
  {
    path: "/codegen",
    component: () => import("@/layouts/index.vue"),
    name: "/codegen",
    meta: { title: "系统工具", icon: "🛠️", hideInBreadcrumb: true },
    children: [
      {
        path: "codegen",
        component: () => import("@/views/codegen/index.vue"),
        name: "Codegen",
        meta: { title: "代码生成", icon: "✨", keepAlive: true },
      },
    ],
  },
  {
    path: "/api",
    component: () => import("@/layouts/index.vue"),
    name: "/api",
    meta: { title: "接口文档", icon: "📡", alwaysShow: true },
    children: [
      {
        path: "apifox",
        component: () => import("@/views/demo/api/apifox.vue"),
        name: "Apifox",
        meta: { title: "Apifox", icon: "🔗", keepAlive: true },
      },
    ],
  },
  {
    path: "/doc",
    component: () => import("@/layouts/index.vue"),
    redirect: "/doc/frontend",
    name: "/doc",
    meta: { title: "平台文档", icon: "📖" },
    children: [
      {
        path: "frontend",
        component: () => import("@/views/doc/frontend.vue"),
        name: "FrontendDoc",
        meta: { title: "前端文档", icon: "💻", keepAlive: true },
      },
      {
        path: "backend",
        component: () => import("@/views/doc/backend.vue"),
        name: "BackendDoc",
        meta: { title: "后端文档", icon: "🖥️", keepAlive: true },
      },
      {
        path: "mobile",
        component: () => import("@/views/doc/mobile.vue"),
        name: "MobileDoc",
        meta: { title: "移动端文档", icon: "📱", keepAlive: true },
      },
    ],
  },
  {
    path: "/multi-level",
    component: () => import("@/layouts/index.vue"),
    name: "/multiLevel",
    meta: { title: "多级菜单", icon: "🔀", alwaysShow: true },
    children: [
      {
        path: "multi-level1",
        component: () => import("@/layouts/index.vue"),
        name: "MultiLevel1",
        meta: { title: "菜单一级", icon: "", alwaysShow: true },
        children: [
          {
            path: "multi-level2",
            component: () => import("@/layouts/index.vue"),
            name: "MultiLevel2",
            meta: { title: "菜单二级", icon: "" },
            children: [
              {
                path: "multi-level3-1",
                component: () => import("@/views/demo/multi-level/level3-1.vue"),
                name: "MultiLevel31",
                meta: { title: "菜单三级-1", icon: "1️⃣", keepAlive: true },
              },
              {
                path: "multi-level3-2",
                component: () => import("@/views/demo/multi-level/level3-2.vue"),
                name: "MultiLevel32",
                meta: { title: "菜单三级-2", icon: "2️⃣", keepAlive: true },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/component",
    component: () => import("@/layouts/index.vue"),
    name: "/component",
    meta: { title: "组件封装", icon: "🧩" },
    children: [
      {
        path: "curd",
        component: () => import("@/views/demo/curd/index.vue"),
        name: "Curd",
        meta: { title: "增删改查", icon: "📝", keepAlive: true },
      },
      {
        path: "table-select",
        component: () => import("@/views/demo/table-select/index.vue"),
        name: "TableSelect",
        meta: { title: "列表选择器", icon: "📋", keepAlive: true },
      },
      {
        path: "wang-editor",
        component: () => import("@/views/demo/wang-editor.vue"),
        name: "WangEditor",
        meta: { title: "富文本编辑器", icon: "✏️", keepAlive: true },
      },
      {
        path: "upload",
        component: () => import("@/views/demo/upload.vue"),
        name: "Upload",
        meta: { title: "图片上传", icon: "🖼️", keepAlive: true },
      },
      {
        path: "dict-demo",
        component: () => import("@/views/demo/dictionary.vue"),
        name: "DictDemo",
        meta: { title: "字典组件", icon: "📑", keepAlive: true },
      },
      {
        path: "icon-select",
        component: () => import("@/views/demo/icon-select.vue"),
        name: "IconSelect",
        meta: { title: "图标选择器", icon: "🎨", keepAlive: true },
      },
      {
        path: "drag",
        component: () => import("@/views/demo/drag.vue"),
        name: "Drag",
        meta: { title: "拖拽组件", icon: "✋", keepAlive: true },
      },
      {
        path: "text-scroll",
        component: () => import("@/views/demo/text-scroll.vue"),
        name: "TextScroll",
        meta: { title: "滚动文本", icon: "📜", keepAlive: true },
      },
    ],
  },
  {
    path: "/route-param",
    component: () => import("@/layouts/index.vue"),
    name: "/routeParam",
    meta: { title: "路由参数", icon: "🔗", alwaysShow: true },
    children: [
      {
        path: "route-param-type1",
        component: () => import("@/views/demo/route-param.vue"),
        name: "RouteParamType1",
        meta: { title: "参数(type=1)", icon: "⭐", keepAlive: true, params: { type: "1" } },
      },
      {
        path: "route-param-type2",
        component: () => import("@/views/demo/route-param.vue"),
        name: "RouteParamType2",
        meta: { title: "参数(type=2)", icon: "⭐", keepAlive: true, params: { type: "2" } },
      },
    ],
  },
  {
    path: "/function",
    component: () => import("@/layouts/index.vue"),
    name: "/function",
    meta: { title: "功能演示", icon: "🌈" },
    children: [
      {
        path: "icon-demo",
        component: () => import("@/views/demo/icons.vue"),
        name: "IconDemo",
        meta: { title: "Icons", icon: "🎨", keepAlive: true },
      },
      {
        path: "dict-sync",
        component: () => import("@/views/demo/dict-sync.vue"),
        name: "DictSync",
        meta: { title: "字典实时同步", icon: "🔄", keepAlive: true },
      },
      {
        path: "vxe-table",
        component: () => import("@/views/demo/vxe-table/index.vue"),
        name: "VxeTable",
        meta: { title: "VxeTable", icon: "✨", keepAlive: true },
      },
      {
        path: "curd-single",
        component: () => import("@/views/demo/curd-single.vue"),
        name: "CurdSingle",
        meta: { title: "CURD单文件", icon: "📖", keepAlive: true },
      },
    ],
  },
];
