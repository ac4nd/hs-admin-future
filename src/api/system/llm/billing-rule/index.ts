import request from "@/utils/request";
import type { BillingRuleQueryParams, BillingRuleItem, BillingRuleForm } from "./types";
import type { PageResult } from "@/api/common";

const BASE_URL = "/api/v1/llm/billing-rules";

const BillingRuleAPI = {
  getPage(queryParams: BillingRuleQueryParams) {
    return request<unknown, PageResult<BillingRuleItem>>({
      url: BASE_URL,
      method: "get",
      params: queryParams,
    });
  },

  getFormData(id: string) {
    return request<unknown, BillingRuleForm>({
      url: `${BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  create(data: BillingRuleForm) {
    return request({ url: BASE_URL, method: "post", data });
  },

  update(id: string, data: BillingRuleForm) {
    return request({ url: `${BASE_URL}/${id}`, method: "put", data });
  },

  deleteByIds(ids: string) {
    return request({ url: `${BASE_URL}/${ids}`, method: "delete" });
  },
};

export default BillingRuleAPI;
export * from "./types";
