import request from "@/utils/request";
import type { OptionItem } from "@/api/common";

const ROLE_BASE_URL = "/api/v1/roles";

const RoleAPI = {
  /** 获取角色下拉选项 */
  getOptions() {
    return request<unknown, OptionItem[]>({
      url: `${ROLE_BASE_URL}/options`,
      method: "get",
    });
  },
};

export default RoleAPI;
