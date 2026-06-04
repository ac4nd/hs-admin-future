/**
 * Dict 字典类型定义
 */

import type { BaseQueryParams } from "@/api/common";

/** 字典分页查询参数 */
export interface DictTypeQueryParams extends BaseQueryParams {
  keywords?: string;
  status?: number;
}

/** 字典分页对象 */
export interface DictTypeItem {
  id: string;
  name: string;
  dictCode: string;
  status: number;
}

/** 字典表单对象 */
export interface DictTypeForm {
  id?: string;
  name?: string;
  dictCode?: string;
  status?: number;
  remark?: string;
}

/** 字典项分页查询参数 */
export interface DictItemQueryParams extends BaseQueryParams {
  keywords?: string;
  dictCode?: string;
}

/** 字典项分页对象 */
export interface DictItem {
  id: string;
  dictCode: string;
  label: string;
  value: string;
  status: number;
  sort?: number;
  tagType?: TagType;
}

/** 字典项表单对象 */
export interface DictItemForm {
  id?: string;
  dictCode?: string;
  label?: string;
  value?: string;
  status?: number;
  sort?: number;
  tagType?: TagType;
}

/** 字典项选项 */
export interface DictItemOption {
  value: number | string;
  label: string;
  tagType?: TagType;
}

/** 标签类型 */
export type TagType = "success" | "warning" | "info" | "primary" | "danger" | "";
