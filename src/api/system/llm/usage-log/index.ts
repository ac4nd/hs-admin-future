import request from "@/utils/request";
import type { UsageLogQueryParams, UsageLogItem } from "./types";
import type { PageResult } from "@/api/common";

const BASE_URL = "/api/v1/llm/usage-logs";

const UsageLogAPI = {
  getPage(queryParams: UsageLogQueryParams) {
    return request<unknown, PageResult<UsageLogItem>>({
      url: BASE_URL,
      method: "get",
      params: queryParams,
    });
  },
};

export default UsageLogAPI;
export * from "./types";
