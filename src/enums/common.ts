/**
 * 通用枚举
 *
 * @description 包含对话框模式、通用状态等跨业务的枚举定义
 */

/** 对话框模式 */
export enum DialogMode {
  CREATE = "create",
  EDIT = "edit",
  VIEW = "view",
}

/** 通用状态 */
export enum CommonStatus {
  DISABLED = 0,
  ENABLED = 1,
}

/** 审核状态 */
export enum AuditStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}
