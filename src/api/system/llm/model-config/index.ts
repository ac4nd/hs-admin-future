import request from "@/utils/request";
import type { ModelConfigQueryParams, ModelConfigItem, ModelConfigForm } from "./types";
import type { PageResult } from "@/api/common";

const BASE_URL = "/api/v1/llm/model-configs";

const ModelConfigAPI = {
  getPage(queryParams: ModelConfigQueryParams) {
    return request<unknown, PageResult<ModelConfigItem>>({
      url: BASE_URL,
      method: "get",
      params: queryParams,
    });
  },

  getFormData(id: string) {
    return request<unknown, ModelConfigForm>({
      url: `${BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  create(data: ModelConfigForm) {
    return request({ url: BASE_URL, method: "post", data });
  },

  update(id: string, data: ModelConfigForm) {
    return request({ url: `${BASE_URL}/${id}`, method: "put", data });
  },

  deleteByIds(ids: string) {
    return request({ url: `${BASE_URL}/${ids}`, method: "delete" });
  },
};

export default ModelConfigAPI;
export * from "./types";
