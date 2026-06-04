/**
 * User 用户类型定义
 */

import type { BaseQueryParams } from "@/api/common";

/** 登录用户信息 */
export interface UserInfo {
  userId?: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  canSwitchTenant?: boolean;
  roles: string[];
  perms: string[];
}

/** 用户分页查询参数 */
export interface UserQueryParams extends BaseQueryParams {
  keywords?: string;
  status?: number;
  deptId?: string;
  createTime?: [string, string];
}

/** 用户分页对象 */
export interface UserItem {
  id: string;
  avatar?: string;
  createTime?: string;
  deptName?: string;
  email?: string;
  gender?: number;
  mobile?: string;
  nickname?: string;
  roleNames?: string;
  status?: number;
  username?: string;
}

/** 用户表单对象 */
export interface UserForm {
  id?: string;
  avatar?: string;
  deptId?: string;
  email?: string;
  gender?: number;
  mobile?: string;
  nickname?: string;
  roleIds?: number[];
  status?: number;
  username?: string;
}

/** 个人中心用户信息 */
export interface UserProfileDetail {
  id?: string;
  username?: string;
  nickname?: string;
  avatar?: string;
  gender?: number;
  mobile?: string;
  email?: string;
  deptName?: string;
  roleNames?: string;
  createTime?: string;
}

/** 个人中心用户信息表单 */
export interface UserProfileForm {
  nickname?: string;
  avatar?: string;
  gender?: number;
}

/** 修改密码表单 */
export interface PasswordChangeForm {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

/** 密码校验表单 */
export interface PasswordVerifyForm {
  password?: string;
}

/** 修改手机表单 */
export interface MobileUpdateForm {
  mobile?: string;
  code?: string;
  password?: string;
}

/** 修改邮箱表单 */
export interface EmailUpdateForm {
  email?: string;
  code?: string;
  password?: string;
}
