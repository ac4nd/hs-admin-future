/**
 * 代码生成 API
 *
 * 对接后端 /api/v1/codegen 接口
 */
import request from "@/utils/request";
import type { PageResult, OptionItem } from "@/api/common";
import type { TableQuery, TableItem, GenConfigForm, GeneratorPreviewItem } from "./types";

const GENERATOR_BASE_URL = "/api/v1/codegen";

/** 构建预览和下载接口的查询参数 */
const buildCodegenParams = (pageType?: "classic" | "curd", type?: "ts" | "js") => {
  const params: Record<string, string> = {};
  if (pageType) params.pageType = pageType;
  if (type) params.type = type;
  return Object.keys(params).length ? params : undefined;
};

/** 获取数据表分页列表 */
export function getTablePage(params: TableQuery) {
  return request<unknown, PageResult<TableItem>>({
    url: `${GENERATOR_BASE_URL}/table`,
    method: "get",
    params,
  });
}

/** 获取代码生成配置 */
export function getGenConfig(tableName: string) {
  return request<unknown, GenConfigForm>({
    url: `${GENERATOR_BASE_URL}/${tableName}/config`,
    method: "get",
  });
}

/** 保存代码生成配置 */
export function saveGenConfig(tableName: string, data: GenConfigForm) {
  return request({
    url: `${GENERATOR_BASE_URL}/${tableName}/config`,
    method: "post",
    data,
  });
}

/** 获取代码生成预览数据 */
export function getPreviewData(
  tableName: string,
  pageType?: "classic" | "curd",
  type?: "ts" | "js"
) {
  return request<unknown, GeneratorPreviewItem[]>({
    url: `${GENERATOR_BASE_URL}/${tableName}/preview`,
    method: "get",
    params: buildCodegenParams(pageType, type),
  });
}

/** 重置代码生成配置 */
export function resetGenConfig(tableName: string) {
  return request({
    url: `${GENERATOR_BASE_URL}/${tableName}/config`,
    method: "delete",
  });
}

/** 下载代码生成 ZIP 文件 */
export function downloadZip(tableName: string, pageType?: "classic" | "curd", type?: "ts" | "js") {
  return request({
    url: `${GENERATOR_BASE_URL}/${tableName}/download`,
    method: "get",
    params: buildCodegenParams(pageType, type),
    responseType: "blob",
  }).then((response: any) => {
    const disposition = response?.headers?.["content-disposition"] as string | undefined;
    let fileName = `${tableName}.zip`;
    if (disposition) {
      const match = /filename\*?=(?:UTF-8''|")?([^;"]+)/i.exec(disposition);
      if (match?.[1]) {
        try {
          fileName = decodeURIComponent(match[1]);
        } catch {
          fileName = match[1];
        }
      }
    }

    const blob = new Blob([response.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  });
}

/** 获取菜单下拉选项 */
export function getMenuOptions(): Promise<OptionItem[]> {
  return request<unknown, OptionItem[]>({
    url: `${GENERATOR_BASE_URL}/menus`,
    method: "get",
  });
}
