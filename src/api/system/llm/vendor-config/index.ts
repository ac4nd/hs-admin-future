import request from "@/utils/request";
import type { VendorConfigQueryParams, VendorConfigItem, VendorConfigForm } from "./types";
import type { PageResult } from "@/api/common";

const BASE_URL = "/api/v1/llm/vendor-configs";

const VendorConfigAPI = {
  getPage(queryParams: VendorConfigQueryParams) {
    return request<unknown, PageResult<VendorConfigItem>>({
      url: BASE_URL,
      method: "get",
      params: queryParams,
    });
  },

  getFormData(id: string) {
    return request<unknown, VendorConfigForm>({
      url: `${BASE_URL}/${id}/form`,
      method: "get",
    });
  },

  create(data: VendorConfigForm) {
    return request({ url: BASE_URL, method: "post", data });
  },

  update(id: string, data: VendorConfigForm) {
    return request({ url: `${BASE_URL}/${id}`, method: "put", data });
  },

  deleteByIds(ids: string) {
    return request({ url: `${BASE_URL}/${ids}`, method: "delete" });
  },

  /** 获取厂商下拉选项 */
  getOptions() {
    return request<unknown, PageResult<VendorConfigItem>>({
      url: BASE_URL,
      method: "get",
      params: { pageNum: 1, pageSize: 100, status: 1 },
    }).then((data) =>
      (data.list ?? []).map((item) => ({ value: item.id, label: item.vendorName }))
    );
  },
};

export default VendorConfigAPI;
export * from "./types";
