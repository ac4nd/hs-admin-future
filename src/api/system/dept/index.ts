/**
 * 部门管理 API（Mock 实现）
 *
 * TODO: 接入后端 API 后替换 localStorage 为 HTTP 请求
 */
import type { OptionItem } from "@/api/common";
import type { DeptQuery, DeptItem, DeptForm } from "./types";

const STORAGE_KEY = "mock_depts";

// ==================== 初始 Mock 数据 ====================

function getDefaultDepts(): DeptItem[] {
  return [
    {
      id: "100", name: "总公司", parentId: "0", sort: 1, status: 1,
      updateTime: "2026-05-20 10:00:00",
      children: [
        {
          id: "101", name: "研发部门", parentId: "100", sort: 1, status: 1,
          updateTime: "2026-05-21 14:30:00",
          children: [
            { id: "103", name: "前端组", parentId: "101", sort: 1, status: 1, updateTime: "2026-05-22 09:15:00" },
            { id: "104", name: "后端组", parentId: "101", sort: 2, status: 1, updateTime: "2026-05-22 09:15:00" },
            { id: "107", name: "测试组", parentId: "101", sort: 3, status: 1, updateTime: "2026-05-22 09:15:00" },
          ],
        },
        { id: "102", name: "市场部门", parentId: "100", sort: 2, status: 1, updateTime: "2026-05-23 11:20:00" },
        { id: "105", name: "财务部门", parentId: "100", sort: 3, status: 1, updateTime: "2026-05-24 16:45:00" },
        { id: "106", name: "人事部门", parentId: "100", sort: 4, status: 1, updateTime: "2026-05-25 08:30:00" },
        { id: "108", name: "运维部门", parentId: "100", sort: 5, status: 0, updateTime: "2026-05-26 10:00:00" },
      ],
    },
  ];
}

function loadDepts(): DeptItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const defaults = getDefaultDepts();
  saveDepts(defaults);
  return defaults;
}

function saveDepts(depts: DeptItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(depts));
}

let nextId = 200;

// ==================== 工具函数 ====================

/** 过滤树（按关键字和状态） */
function filterTree(nodes: DeptItem[], query: DeptQuery): DeptItem[] {
  return nodes
    .map((node) => {
      const matchSelf = (!query.keywords || node.name.includes(query.keywords))
        && (query.status === undefined || query.status === null || node.status === query.status);
      const filteredChildren = node.children ? filterTree(node.children, query) : [];

      if (matchSelf || filteredChildren.length > 0) {
        return { ...node, children: filteredChildren.length > 0 ? filteredChildren : node.children ? [] : undefined };
      }
      return null;
    })
    .filter(Boolean) as DeptItem[];
}

/** 在树中查找节点 */
function findNode(nodes: DeptItem[], id: string): DeptItem | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

/** 在树中删除节点 */
function removeNode(nodes: DeptItem[], id: string): DeptItem[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.children ? removeNode(n.children, id) : undefined,
    }));
}

/** 转换为 OptionItem 树 */
function toOptionItems(nodes: DeptItem[]): OptionItem[] {
  return nodes.map((n) => ({
    value: n.id,
    label: n.name,
    children: n.children?.length ? toOptionItems(n.children) : undefined,
  }));
}

// ==================== API 方法 ====================

/** 获取部门树列表 */
export function getDeptList(query?: DeptQuery): DeptItem[] {
  const depts = loadDepts();
  if (!query || (!query.keywords && query.status === undefined)) return depts;
  return filterTree(depts, query);
}

/** 获取部门下拉选项（用于上级部门选择） */
export function getDeptOptions(): OptionItem[] {
  return toOptionItems(loadDepts());
}

/** 获取部门表单数据 */
export function getDeptFormData(id: string): DeptForm | undefined {
  const node = findNode(loadDepts(), id);
  if (!node) return undefined;
  return {
    id: node.id,
    name: node.name,
    parentId: node.parentId,
    sort: node.sort,
    status: node.status,
  };
}

/** 新增部门 */
export function createDept(data: DeptForm): DeptItem {
  const depts = loadDepts();
  const item: DeptItem = {
    id: String(nextId++),
    name: data.name,
    parentId: data.parentId,
    sort: data.sort,
    status: data.status,
    updateTime: new Date().toLocaleString("zh-CN"),
  };

  // 插入到父节点
  if (data.parentId === "0") {
    depts.push(item);
  } else {
    const parent = findNode(depts, data.parentId);
    if (parent) {
      if (!parent.children) parent.children = [];
      parent.children.push(item);
    }
  }

  saveDepts(depts);
  return item;
}

/** 更新部门 */
export function updateDept(id: string, data: DeptForm): boolean {
  const depts = loadDepts();
  const node = findNode(depts, id);
  if (!node) return false;

  // 如果父级变更，需要移动节点
  if (node.parentId !== data.parentId) {
    const childNodes = node.children;
    removeNode(depts, id);
    const freshDepts = loadDepts();
    // 从旧位置移除
    const cleaned = removeNode(freshDepts, id);
    // 构造新节点
    const newNode: DeptItem = {
      ...data,
      id,
      updateTime: new Date().toLocaleString("zh-CN"),
      children: childNodes,
    };
    // 插入新位置
    if (data.parentId === "0") {
      cleaned.push(newNode);
    } else {
      const parent = findNode(cleaned, data.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(newNode);
      }
    }
    saveDepts(cleaned);
  } else {
    node.name = data.name;
    node.sort = data.sort;
    node.status = data.status;
    node.updateTime = new Date().toLocaleString("zh-CN");
    saveDepts(depts);
  }

  return true;
}

/** 删除部门 */
export function deleteDeptByIds(ids: string): boolean {
  let depts = loadDepts();
  const idList = ids.split(",");
  for (const id of idList) {
    depts = removeNode(depts, id);
  }
  saveDepts(depts);
  return true;
}

/** 兼容旧代码的 default export */
// eslint-disable-next-line @typescript-eslint/no-redeclare
const DeptAPI = { getOptions: getDeptOptions };
export default DeptAPI;
