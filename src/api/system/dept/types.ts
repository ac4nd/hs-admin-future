/**
 * Dept 部门类型定义
 */

/** 部门查询参数 */
export interface DeptQuery {
  /** 搜索关键字 */
  keywords?: string;
  /** 状态（1正常 0停用） */
  status?: number;
}

/** 部门视图对象 */
export interface DeptItem {
  id: string;
  /** 部门名称 */
  name: string;
  /** 父部门 ID */
  parentId: string;
  /** 排序 */
  sort: number;
  /** 状态（1正常 0停用） */
  status: number;
  /** 更新时间 */
  updateTime: string;
  /** 子部门 */
  children?: DeptItem[];
}

/** 部门表单对象 */
export interface DeptForm {
  id?: string;
  /** 部门名称 */
  name: string;
  /** 父部门 ID */
  parentId: string;
  /** 排序 */
  sort: number;
  /** 状态 */
  status: number;
}
