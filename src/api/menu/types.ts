/**
 * Menu 菜单类型定义
 */

/** 菜单查询参数 */
export interface MenuQuery {
  /** 搜索关键字 */
  keywords?: string;
}

/** 菜单视图对象（树节点） */
export interface MenuItem {
  /** 菜单ID */
  id?: string;
  /** 父菜单ID */
  parentId?: string;
  /** 菜单名称 */
  name?: string;
  /** 菜单类型（C-目录 M-菜单 B-按钮） */
  type?: string;
  /** 路由路径 */
  path?: string;
  /** 路由名称 */
  routeName?: string;
  /** 路由路径（自定义字段） */
  routePath?: string;
  /** 组件路径 */
  component?: string;
  /** 图标 */
  icon?: string;
  /** 权限标识 */
  perm?: string;
  /** 排序 */
  sort?: number;
  /** 是否可见(1:显示;0:隐藏) */
  visible?: number;
  /** 菜单范围(1=平台 2=业务) */
  scope?: number;
  /** 跳转路径 */
  redirect?: string;
  /** 子菜单 */
  children?: MenuItem[];
}

/** 菜单表单对象 */
export interface MenuForm {
  /** 菜单ID */
  id?: string;
  /** 父菜单ID */
  parentId?: string;
  /** 菜单名称 */
  name?: string;
  /** 菜单类型（C-目录 M-菜单 B-按钮） */
  type?: string;
  /** 路由路径 */
  path?: string;
  /** 路由名称 */
  routeName?: string;
  /** 路由路径（自定义字段） */
  routePath?: string;
  /** 跳转路径 */
  redirect?: string;
  /** 组件路径 */
  component?: string;
  /** 图标 */
  icon?: string;
  /** 排序 */
  sort?: number;
  /** 是否可见 */
  visible?: number;
  /** 菜单范围 */
  scope?: number;
  /** 权限标识 */
  perm?: string;
  /** 路由参数 */
  params?: { key?: string; value?: string }[];
  /** 是否始终显示 */
  alwaysShow?: number;
  /** 是否缓存页面 */
  keepAlive?: number;
}
