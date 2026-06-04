/**
 * 系统日志 API（Mock 实现）
 *
 * TODO: 接入后端 API 后替换 localStorage 为 HTTP 请求
 */
import type { PageResult } from "@/api/common";
import type { LogQuery, LogItem } from "./types";

const STORAGE_KEY = "mock_logs";

// ==================== 初始 Mock 数据 ====================

function getDefaultLogs(): LogItem[] {
  const now = new Date();
  return [
    {
      id: 1, module: "认证模块", actionType: "LOGIN", title: "用户登录",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/auth/login",
      requestMethod: "POST", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 128,
      createTime: formatDate(new Date(now.getTime() - 3600000)),
    },
    {
      id: 2, module: "用户模块", actionType: "QUERY", title: "查询用户列表",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/users",
      requestMethod: "GET", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 45,
      createTime: formatDate(new Date(now.getTime() - 1800000)),
    },
    {
      id: 3, module: "角色模块", actionType: "CREATE", title: "新增角色",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/roles",
      requestMethod: "POST", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 89,
      createTime: formatDate(new Date(now.getTime() - 1200000)),
    },
    {
      id: 4, module: "菜单模块", actionType: "UPDATE", title: "修改菜单",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/menus/1",
      requestMethod: "PUT", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 67,
      createTime: formatDate(new Date(now.getTime() - 600000)),
    },
    {
      id: 5, module: "用户模块", actionType: "DELETE", title: "删除用户",
      operatorId: 2, operatorName: "zhangsan", requestUri: "/api/v1/users/5",
      requestMethod: "DELETE", ip: "192.168.1.101", region: "内网",
      browser: "Firefox 126", os: "macOS 14", status: 1, executionTime: 34,
      createTime: formatDate(new Date(now.getTime() - 300000)),
    },
    {
      id: 6, module: "认证模块", actionType: "LOGIN", title: "用户登录",
      operatorId: 3, operatorName: "lisi", requestUri: "/api/v1/auth/login",
      requestMethod: "POST", ip: "10.0.0.55", region: "内网",
      browser: "Safari 17", os: "macOS 14", status: 0, executionTime: 15,
      errorMsg: "用户名或密码错误",
      createTime: formatDate(new Date(now.getTime() - 240000)),
    },
    {
      id: 7, module: "部门模块", actionType: "CREATE", title: "新增部门",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/depts",
      requestMethod: "POST", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 52,
      createTime: formatDate(new Date(now.getTime() - 180000)),
    },
    {
      id: 8, module: "字典模块", actionType: "UPDATE", title: "修改字典",
      operatorId: 2, operatorName: "zhangsan", requestUri: "/api/v1/dicts/1",
      requestMethod: "PUT", ip: "192.168.1.101", region: "内网",
      browser: "Firefox 126", os: "macOS 14", status: 1, executionTime: 78,
      createTime: formatDate(new Date(now.getTime() - 120000)),
    },
    {
      id: 9, module: "文件模块", actionType: "UPLOAD", title: "上传文件",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/files/upload",
      requestMethod: "POST", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 1250,
      content: "上传文件: report-2026.xlsx (2.3MB)",
      createTime: formatDate(new Date(now.getTime() - 60000)),
    },
    {
      id: 10, module: "用户模块", actionType: "EXPORT", title: "导出用户",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/users/export",
      requestMethod: "GET", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 0, executionTime: 3200,
      errorMsg: "导出数据量超过最大限制(100000)",
      createTime: formatDate(new Date(now.getTime() - 30000)),
    },
    {
      id: 11, module: "认证模块", actionType: "LOGOUT", title: "用户登出",
      operatorId: 2, operatorName: "zhangsan", requestUri: "/api/v1/auth/logout",
      requestMethod: "POST", ip: "192.168.1.101", region: "内网",
      browser: "Firefox 126", os: "macOS 14", status: 1, executionTime: 12,
      createTime: formatDate(new Date(now.getTime() - 10000)),
    },
    {
      id: 12, module: "角色模块", actionType: "DELETE", title: "删除角色",
      operatorId: 1, operatorName: "admin", requestUri: "/api/v1/roles/6",
      requestMethod: "DELETE", ip: "192.168.1.100", region: "内网",
      browser: "Chrome 125", os: "Windows 11", status: 1, executionTime: 41,
      createTime: formatDate(now),
    },
  ];
}

function formatDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function loadLogs(): LogItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const defaults = getDefaultLogs();
  saveLogs(defaults);
  return defaults;
}

function saveLogs(logs: LogItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

// ==================== API 方法 ====================

/** 获取日志分页列表 */
export function getLogPage(params: LogQuery): PageResult<LogItem> {
  const logs = loadLogs();
  let filtered = [...logs];

  // 关键字过滤（IP 或 操作人）
  if (params.keywords) {
    const kw = params.keywords.toLowerCase();
    filtered = filtered.filter(
      (log) =>
        log.ip?.toLowerCase().includes(kw) ||
        log.operatorName?.toLowerCase().includes(kw) ||
        log.title?.toLowerCase().includes(kw),
    );
  }

  // 时间范围过滤
  if (params.createTime?.[0] && params.createTime?.[1]) {
    const start = params.createTime[0];
    const end = params.createTime[1];
    filtered = filtered.filter((log) => {
      if (!log.createTime) return false;
      const date = log.createTime.slice(0, 10);
      return date >= start && date <= end;
    });
  }

  // 按时间倒序
  filtered.sort((a, b) => b.id - a.id);

  const total = filtered.length;
  const startIdx = (params.pageNum - 1) * params.pageSize;
  const list = filtered.slice(startIdx, startIdx + params.pageSize);

  return { list, total };
}
