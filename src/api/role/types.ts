import type { BaseQueryParams } from "@/api/common";

/** 角色查询参数 */
export interface RoleQuery extends BaseQueryParams {
  /** 搜索关键字（角色名称） */
  keywords?: string;
}

/** 角色列表项 */
export interface RoleItem {
  id: string;
  /** 角色名称 */
  name: string;
  /** 角色编码 */
  code: string;
  /** 数据权限（1全部 2部门及子部门 3本部门 4本人 5自定义） */
  dataScope: number;
  /** 数据权限标签 */
  dataScopeLabel: string;
  /** 状态（1正常 0停用） */
  status: number;
  /** 排序 */
  sort: number;
  /** 更新时间 */
  updateTime: string;
}

/** 角色表单 */
export interface RoleForm {
  id?: string;
  /** 角色名称 */
  name: string;
  /** 角色编码 */
  code: string;
  /** 数据权限 */
  dataScope: number;
  /** 自定义数据权限部门 ID 列表 */
  deptIds?: string[];
  /** 状态 */
  status: number;
  /** 排序 */
  sort: number;
  /** 备注 */
  remark?: string;
}
