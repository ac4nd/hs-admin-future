/**
 * 系统配置 API（Mock 实现）
 *
 * TODO: 接入后端 API 后替换 localStorage 为 HTTP 请求
 */
import type { PageResult } from "@/api/common";
import type { ConfigQuery, ConfigItem, ConfigForm } from "./types";

const STORAGE_KEY = "mock_configs";

function getDefaultConfigs(): ConfigItem[] {
  return [
    { id: "1", configName: "用户初始密码", configKey: "sys.user.initPassword", configValue: "123456", remark: "用户初始密码", updateTime: "2026-05-20 10:00:00" },
    { id: "2", configName: "账号自助注册", configKey: "sys.account.registerUser", configValue: "true", remark: "是否开启账号自助注册", updateTime: "2026-05-21 14:30:00" },
    { id: "3", configName: "登录验证码", configKey: "sys.login.captchaEnabled", configValue: "true", remark: "是否开启登录验证码校验", updateTime: "2026-05-22 09:15:00" },
    { id: "4", configName: "用户管理-账号初始密码", configKey: "sys.user.password", configValue: "123456", remark: "用户管理模块-账号初始密码", updateTime: "2026-05-23 11:20:00" },
    { id: "5", configName: "全局日志记录", configKey: "sys.log.enabled", configValue: "true", remark: "是否开启全局日志记录", updateTime: "2026-05-24 16:45:00" },
    { id: "6", configName: "文件上传大小限制", configKey: "sys.upload.maxSize", configValue: "10MB", remark: "文件上传大小限制", updateTime: "2026-05-25 08:30:00" },
    { id: "7", configName: "Token 有效期", configKey: "sys.token.expire", configValue: "7200", remark: "Token 有效期（秒）", updateTime: "2026-05-26 10:00:00" },
    { id: "8", configName: "会话超时时间", configKey: "sys.session.timeout", configValue: "1800", remark: "会话超时时间（秒）", updateTime: "2026-05-27 13:00:00" },
  ];
}

function loadConfigs(): ConfigItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  const defaults = getDefaultConfigs();
  saveConfigs(defaults);
  return defaults;
}

function saveConfigs(configs: ConfigItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

let nextId = 100;

export function getConfigPage(params: ConfigQuery): PageResult<ConfigItem> {
  const configs = loadConfigs();
  let filtered = [...configs];

  if (params.keywords) {
    const kw = params.keywords.toLowerCase();
    filtered = filtered.filter(
      (c) => c.configName.toLowerCase().includes(kw) || c.configKey.toLowerCase().includes(kw),
    );
  }

  const total = filtered.length;
  const start = (params.pageNum - 1) * params.pageSize;
  const list = filtered.slice(start, start + params.pageSize);

  return { list, total };
}

export function getConfigFormData(id: string): ConfigForm | undefined {
  const configs = loadConfigs();
  const item = configs.find((c) => c.id === id);
  if (!item) return undefined;
  return {
    id: item.id,
    configName: item.configName,
    configKey: item.configKey,
    configValue: item.configValue,
    remark: item.remark,
  };
}

export function createConfig(data: ConfigForm): ConfigItem {
  const configs = loadConfigs();
  const item: ConfigItem = {
    id: String(nextId++),
    configName: data.configName,
    configKey: data.configKey,
    configValue: data.configValue,
    remark: data.remark,
    updateTime: new Date().toLocaleString("zh-CN"),
  };
  configs.unshift(item);
  saveConfigs(configs);
  return item;
}

export function updateConfig(id: string, data: ConfigForm): boolean {
  const configs = loadConfigs();
  const idx = configs.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  configs[idx] = {
    ...configs[idx],
    configName: data.configName,
    configKey: data.configKey,
    configValue: data.configValue,
    remark: data.remark,
    updateTime: new Date().toLocaleString("zh-CN"),
  };
  saveConfigs(configs);
  return true;
}

export function deleteConfig(id: string): boolean {
  const configs = loadConfigs();
  const filtered = configs.filter((c) => c.id !== id);
  if (filtered.length === configs.length) return false;
  saveConfigs(filtered);
  return true;
}

/** 刷新缓存（Mock：无操作） */
export function refreshConfigCache(): void {
  // TODO: 接入后端后调用刷新缓存 API
}
