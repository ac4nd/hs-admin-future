import request from "@/utils/request";
const DICT_BASE_URL = "/api/v1/dicts";
/** 后端标签类型码 → 前端标签类型 */
const decodeTagType = (code) => {
    const val = String(code ?? "")
        .trim()
        .toUpperCase();
    const map = {
        P: "primary",
        S: "success",
        W: "warning",
        I: "info",
        D: "danger",
        N: "",
    };
    return map[val] ?? "";
};
/** 前端标签类型 → 后端标签类型码 */
const encodeTagType = (tagType) => {
    const val = String(tagType ?? "")
        .trim()
        .toLowerCase();
    const map = {
        primary: "P",
        success: "S",
        warning: "W",
        info: "I",
        danger: "D",
        error: "D",
        default: "N",
        "": "N",
    };
    return map[val] ?? "N";
};
/** 统一转换字典项标签类型 */
function normalizeTagType(item) {
    return { ...item, tagType: decodeTagType(item.tagType) };
}
const DictAPI = {
    // ==================== 字典类型 ====================
    /** 字典分页列表 */
    getPage(queryParams) {
        return request({
            url: DICT_BASE_URL,
            method: "get",
            params: queryParams,
        });
    },
    /** 字典列表（下拉选项） */
    getList() {
        return request({
            url: `${DICT_BASE_URL}/options`,
            method: "get",
        });
    },
    /** 字典表单数据 */
    getFormData(id) {
        return request({
            url: `${DICT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },
    /** 新增字典 */
    create(data) {
        return request({ url: DICT_BASE_URL, method: "post", data });
    },
    /** 修改字典 */
    update(id, data) {
        return request({ url: `${DICT_BASE_URL}/${id}`, method: "put", data });
    },
    /** 删除字典 */
    deleteByIds(ids) {
        return request({ url: `${DICT_BASE_URL}/${ids}`, method: "delete" });
    },
    // ==================== 字典项 ====================
    /** 字典项分页列表 */
    getDictItemPage(dictCode, queryParams) {
        return request({
            url: `${DICT_BASE_URL}/${dictCode}/items`,
            method: "get",
            params: queryParams,
        }).then((data) => ({
            ...data,
            list: (data.list ?? []).map(normalizeTagType),
        }));
    },
    /** 字典项列表（下拉选项） */
    getDictItems(dictCode) {
        return request({
            url: `${DICT_BASE_URL}/${dictCode}/items/options`,
            method: "get",
        }).then((items) => (items ?? []).map(normalizeTagType));
    },
    /** 字典项表单数据 */
    getDictItemFormData(dictCode, id) {
        return request({
            url: `${DICT_BASE_URL}/${dictCode}/items/${id}/form`,
            method: "get",
        }).then(normalizeTagType);
    },
    /** 新增字典项 */
    createDictItem(dictCode, data) {
        return request({
            url: `${DICT_BASE_URL}/${dictCode}/items`,
            method: "post",
            data: { ...data, tagType: encodeTagType(data.tagType) },
        });
    },
    /** 修改字典项 */
    updateDictItem(dictCode, id, data) {
        return request({
            url: `${DICT_BASE_URL}/${dictCode}/items/${id}`,
            method: "put",
            data: { ...data, tagType: encodeTagType(data.tagType) },
        });
    },
    /** 删除字典项 */
    deleteDictItems(dictCode, ids) {
        return request({
            url: `${DICT_BASE_URL}/${dictCode}/items/${ids}`,
            method: "delete",
        });
    },
};
export default DictAPI;
export * from "./types";
//# sourceMappingURL=index.js.map