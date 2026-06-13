import request from "@/utils/request";
import type { ApiKeyConfigQueryParams, ApiKeyConfigItem, ApiKeyConfigForm } from "./types";
import type { PageResult } from "@/api/common";

const BASE_URL = "/api/v1/llm/api-key-configs";

const ApiKeyConfigAPI = {
  getPage(queryParams: ApiKeyConfigQueryParams) {
    return request<unknown, PageResult<ApiKeyConfigItem>>({
      url: BASE_URL,
      method: "get",
      params: queryParams,
    });
  },

  getFormData(id: string) {
    return request<unknown, ApiKeyConfigForm>({
      url: `${BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  create(data: ApiKeyConfigForm) {
    return request({ url: BASE_URL, method: "post", data });
  },

  update(id: string, data: ApiKeyConfigForm) {
    return request({ url: `${BASE_URL}/${id}`, method: "put", data });
  },

  deleteByIds(ids: string) {
    return request({ url: `${BASE_URL}/${ids}`, method: "delete" });
  },

  /** 获取API-KEY下拉选项 */
  getOptions() {
    return request<unknown, PageResult<ApiKeyConfigItem>>({
      url: BASE_URL,
      method: "get",
      params: { pageNum: 1, pageSize: 100, status: 1 },
    }).then((data) => (data.list ?? []).map((item) => ({ value: item.id, label: item.keyName })));
  },
};

export default ApiKeyConfigAPI;
export * from "./types";
