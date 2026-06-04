/**
 * 角色管理 API（Mock 实现）
 *
 * TODO: 接入后端 API 后替换 localStorage 为 HTTP 请求
 */
import type { PageResult, OptionItem } from "@/api/common";
import type { RoleQuery, RoleItem, RoleForm } from "./types";

const STORAGE_KEY = "mock_roles";
const MENU_IDS_KEY = "mock_role_menu_ids";

// ==================== 数据权限映射 ====================

const dataScopeMap: Record<number, string> = {
  1: "全部数据",
  2: "部门及子部门",
  3: "本部门数据",
  4: "本人数据",
  5: "自定义部门",
};

// ==================== 初始 Mock 数据 ====================

function getDefaultRoles(): RoleItem[] {
  return [
    { id: "1", name: "超级管理员", code: "ROOT", dataScope: 1, dataScopeLabel: "全部数据", status: 1, sort: 1, updateTime: "2026-05-20 10:00:00" },
    { id: "2", name: "系统管理员", code: "ADMIN", dataScope: 1, dataScopeLabel: "全部数据", status: 1, sort: 2, updateTime: "2026-05-21 14:30:00" },
    { id: "3", name: "普通用户", code: "USER", dataScope: 4, dataScopeLabel: "本人数据", status: 1, sort: 3, updateTime: "2026-05-22 09:15:00" },
    { id: "4", name: "部门管理员", code: "DEPT_ADMIN", dataScope: 2, dataScopeLabel: "部门及子部门", status: 1, sort: 4, updateTime: "2026-05-23 11:20:00" },
    { id: "5", name: "审计员", code: "AUDITOR", dataScope: 3, dataScopeLabel: "本部门数据", status: 1, sort: 5, updateTime: "2026-05-24 16:45:00" },
    { id: "6", name: "访客", code: "GUEST", dataScope: 4, dataScopeLabel: "本人数据", status: 0, sort: 6, updateTime: "2026-05-25 08:30:00" },
  ];
}

function loadRoles(): RoleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const defaults = getDefaultRoles();
  saveRoles(defaults);
  return defaults;
}

function saveRoles(roles: RoleItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
}

function loadRoleMenuIds(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(MENU_IDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { "1": ["1", "2", "3", "4", "5"] };
}

function saveRoleMenuIds(map: Record<string, string[]>) {
  localStorage.setItem(MENU_IDS_KEY, JSON.stringify(map));
}

let nextId = 100;

// ==================== API 方法 ====================

/** 获取角色分页列表 */
export function getRolePage(params: RoleQuery): PageResult<RoleItem> {
  const roles = loadRoles();
  let filtered = [...roles];

  if (params.keywords) {
    const kw = params.keywords.toLowerCase();
    filtered = filtered.filter(
      (r) => r.name.toLowerCase().includes(kw) || r.code.toLowerCase().includes(kw),
    );
  }

  // 排序
  filtered.sort((a, b) => a.sort - b.sort);

  const total = filtered.length;
  const start = (params.pageNum - 1) * params.pageSize;
  const list = filtered.slice(start, start + params.pageSize);

  return { list, total };
}

/** 获取角色表单数据（编辑时回显） */
export function getRoleFormData(id: string): RoleForm | undefined {
  const roles = loadRoles();
  const role = roles.find((r) => r.id === id);
  if (!role) return undefined;
  return {
    id: role.id,
    name: role.name,
    code: role.code,
    dataScope: role.dataScope,
    status: role.status,
    sort: role.sort,
  };
}

/** 新增角色 */
export function createRole(data: RoleForm): RoleItem {
  const roles = loadRoles();
  const item: RoleItem = {
    id: String(nextId++),
    name: data.name,
    code: data.code,
    dataScope: data.dataScope,
    dataScopeLabel: dataScopeMap[data.dataScope] ?? "未知",
    status: data.status,
    sort: data.sort,
    updateTime: new Date().toLocaleString("zh-CN"),
  };
  roles.unshift(item);
  saveRoles(roles);
  return item;
}

/** 更新角色 */
export function updateRole(id: string, data: RoleForm): boolean {
  const roles = loadRoles();
  const idx = roles.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  roles[idx] = {
    ...roles[idx],
    name: data.name,
    code: data.code,
    dataScope: data.dataScope,
    dataScopeLabel: dataScopeMap[data.dataScope] ?? "未知",
    status: data.status,
    sort: data.sort,
    updateTime: new Date().toLocaleString("zh-CN"),
  };
  saveRoles(roles);
  return true;
}

/** 批量删除角色 */
export function deleteRoleByIds(ids: string): boolean {
  const idList = ids.split(",");
  const roles = loadRoles();
  const filtered = roles.filter((r) => !idList.includes(r.id));
  if (filtered.length === roles.length) return false;
  saveRoles(filtered);
  return true;
}

/** 获取角色已分配的菜单 ID */
export function getRoleMenuIds(roleId: string): string[] {
  const map = loadRoleMenuIds();
  return map[roleId] ?? [];
}

/** 更新角色菜单权限 */
export function updateRoleMenuIds(roleId: string, menuIds: string[]): boolean {
  const map = loadRoleMenuIds();
  map[roleId] = menuIds;
  saveRoleMenuIds(map);
  return true;
}

/** 获取菜单权限树（Mock） */
export function getMenuPermOptions(): OptionItem[] {
  return [
    {
      value: "1", label: "系统管理",
      children: [
        { value: "1-1", label: "用户管理" },
        { value: "1-2", label: "角色管理" },
        { value: "1-3", label: "菜单管理" },
        { value: "1-4", label: "部门管理" },
        {
          value: "1-5", label: "字典管理",
          children: [
            { value: "1-5-1", label: "字典类型" },
            { value: "1-5-2", label: "字典数据" },
          ],
        },
        { value: "1-6", label: "系统日志" },
        { value: "1-7", label: "通知公告" },
      ],
    },
    {
      value: "2", label: "系统监控",
      children: [
        { value: "2-1", label: "在线用户" },
        { value: "2-2", label: "服务监控" },
        { value: "2-3", label: "缓存监控" },
      ],
    },
    {
      value: "3", label: "系统工具",
      children: [
        { value: "3-1", label: "代码生成" },
        { value: "3-2", label: "API 文档" },
      ],
    },
    {
      value: "4", label: "企业中心",
      children: [
        { value: "4-1", label: "组织架构" },
        { value: "4-2", label: "员工管理" },
      ],
    },
  ];
}

/** 获取部门选项树（Mock，dataScope=5 自定义时使用） */
export function getDeptOptions(): OptionItem[] {
  return [
    {
      value: "100", label: "总公司",
      children: [
        {
          value: "101", label: "研发部门",
          children: [
            { value: "103", label: "前端组" },
            { value: "104", label: "后端组" },
          ],
        },
        { value: "102", label: "市场部门" },
        { value: "105", label: "财务部门" },
        { value: "106", label: "人事部门" },
      ],
    },
  ];
}
