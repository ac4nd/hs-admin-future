/**
 * Notice 通知公告类型定义
 */

import type { BaseQueryParams } from "@/api/common";

/** 通知分页查询参数 */
export interface NoticeQueryParams extends BaseQueryParams {
  /** 通知标题 */
  title?: string;
  /** 发布状态(0:未发布;1:已发布;-1:已撤回) */
  publishStatus?: number;
}

/** 通知表单对象 */
export interface NoticeForm {
  /** 通知ID */
  id?: string;
  /** 通知标题 */
  title?: string;
  /** 通知内容 */
  content?: string;
  /** 通知类型 */
  type?: number;
  /** 通知等级 */
  level?: string;
  /** 目标类型 (1:全部, 2:指定用户) */
  targetType?: number;
  /** 目标用户ID列表 */
  targetUsers?: number[];
  /** 目标用户ID列表（提交给后端） */
  targetUserIds?: number[];
}

/** 通知分页对象 */
export interface NoticeItem {
  /** 通知ID */
  id: string;
  /** 通知标题 */
  title: string;
  /** 通知类型 */
  type: number;
  /** 通知等级 */
  level: string;
  /** 发布人名称 */
  publisherName?: string;
  /** 目标类型 */
  targetType?: number;
  /** 发布状态(0:未发布;1:已发布;-1:已撤回) */
  publishStatus: number;
  /** 创建时间 */
  createTime?: string;
  /** 发布时间 */
  publishTime?: string;
  /** 撤回时间 */
  revokeTime?: string;
}

/** 通知详情对象 */
export interface NoticeDetail {
  /** 通知ID */
  id?: string;
  /** 通知标题 */
  title?: string;
  /** 通知内容 */
  content?: string;
  /** 通知类型 */
  type?: number;
  /** 通知等级 */
  level?: string;
  /** 发布状态 */
  publishStatus?: number;
  /** 发布人名称 */
  publisherName?: string;
  /** 发布时间 */
  publishTime?: string;
}
