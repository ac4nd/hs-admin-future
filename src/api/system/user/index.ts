import request from "@/utils/request";
import type {
  UserInfo,
  UserForm,
  UserQueryParams,
  UserItem,
  UserProfileDetail,
  UserProfileForm,
  PasswordChangeForm,
  PasswordVerifyForm,
  MobileUpdateForm,
  EmailUpdateForm,
} from "./types";
import type { OptionItem, PageResult } from "@/api/common";

const USER_BASE_URL = "/api/v1/users";

const UserAPI = {
  /** 获取当前登录用户信息 */
  getInfo() {
    return request<unknown, UserInfo>({
      url: `${USER_BASE_URL}/me`,
      method: "get",
    });
  },

  /** 获取用户分页列表 */
  getPage(queryParams: UserQueryParams) {
    return request<unknown, PageResult<UserItem>>({
      url: USER_BASE_URL,
      method: "get",
      params: queryParams,
    });
  },

  /** 获取用户表单详情 */
  getFormData(userId: string) {
    return request<unknown, UserForm>({
      url: `${USER_BASE_URL}/${userId}/form`,
      method: "get",
    });
  },

  /** 添加用户 */
  create(data: UserForm) {
    return request({
      url: USER_BASE_URL,
      method: "post",
      data,
    });
  },

  /** 修改用户 */
  update(id: string, data: UserForm) {
    return request({
      url: `${USER_BASE_URL}/${id}`,
      method: "put",
      data,
    });
  },

  /** 重置密码 */
  resetPassword(id: string, password: string) {
    return request({
      url: `${USER_BASE_URL}/${id}/password/reset`,
      method: "put",
      params: { password },
    });
  },

  /** 批量删除用户 */
  deleteByIds(ids: string) {
    return request({
      url: `${USER_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /** 下载导入模板 */
  downloadTemplate() {
    return request({
      url: `${USER_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },

  /** 导出用户 */
  export(queryParams: UserQueryParams) {
    return request({
      url: `${USER_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },

  /** 导入用户 */
  import(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request({
      url: `${USER_BASE_URL}/import`,
      method: "post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /** 获取用户下拉列表 */
  getOptions() {
    return request<unknown, OptionItem[]>({
      url: `${USER_BASE_URL}/options`,
      method: "get",
    });
  },

  // ========== 个人中心 ==========

  /** 获取个人中心用户详情 */
  getProfile() {
    return request<unknown, UserProfileDetail>({
      url: `${USER_BASE_URL}/profile`,
      method: "get",
    });
  },

  /** 更新个人资料 */
  updateProfile(data: UserProfileForm) {
    return request({
      url: `${USER_BASE_URL}/profile`,
      method: "put",
      data,
    });
  },

  /** 修改密码 */
  changePassword(data: PasswordChangeForm) {
    return request({
      url: `${USER_BASE_URL}/password`,
      method: "put",
      data,
    });
  },

  /** 发送手机验证码 */
  sendMobileCode(mobile: string) {
    return request({
      url: `${USER_BASE_URL}/mobile/code`,
      method: "post",
      params: { mobile },
    });
  },

  /** 绑定或更换手机号 */
  bindOrChangeMobile(data: MobileUpdateForm) {
    return request({
      url: `${USER_BASE_URL}/mobile`,
      method: "put",
      data,
    });
  },

  /** 解绑手机号 */
  unbindMobile(data: PasswordVerifyForm) {
    return request({
      url: `${USER_BASE_URL}/mobile/unbind`,
      method: "put",
      data,
    });
  },

  /** 发送邮箱验证码 */
  sendEmailCode(email: string) {
    return request({
      url: `${USER_BASE_URL}/email/code`,
      method: "post",
      params: { email },
    });
  },

  /** 绑定或更换邮箱 */
  bindOrChangeEmail(data: EmailUpdateForm) {
    return request({
      url: `${USER_BASE_URL}/email`,
      method: "put",
      data,
    });
  },

  /** 解绑邮箱 */
  unbindEmail(data: PasswordVerifyForm) {
    return request({
      url: `${USER_BASE_URL}/email/unbind`,
      method: "put",
      data,
    });
  },
};

export default UserAPI;
export * from "./types";
