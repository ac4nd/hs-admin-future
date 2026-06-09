# HS Admin Future

> 氦闪技术开源组织（Hypersense）出品的现代化后台管理系统前端，基于 Vue 3 + TypeScript + shadcn-vue + Tailwind CSS v4 构建，采用液态玻璃设计语言。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5 | 渐进式 JavaScript 框架 |
| TypeScript | 6.x | 类型安全 |
| Vite | 8.x | 下一代前端构建工具 |
| Pinia | 3.x | Vue 状态管理 |
| Vue Router | 5.x | 路由管理 |
| Tailwind CSS | 4.x | 原子化 CSS 框架 |
| shadcn-vue | 2.x | 可定制 UI 组件库 |
| reka-ui | 2.x | 无样式 Headless 组件 |
| vue-i18n | 11.x | 国际化支持（中/英） |
| Axios | 1.x | HTTP 请求 |
| ECharts | 6.x | 数据可视化 |

## 功能特性

- **液态玻璃设计系统** — 自研 Glass 组件库（30+ 组件），支持 glass 效果开关与 light/dark 主题切换
- **多布局模式** — 左侧布局、顶部布局、混合布局，自由切换
- **动态路由 & 权限控制** — 基于后端菜单接口动态注册路由，按钮级权限控制
- **多租户架构** — 数据行级隔离，租户套餐管理
- **国际化** — vue-i18n 中英文双语，支持热切换
- **系统管理** — 用户、角色、菜单、部门、字典、日志、通知、配置等完整 CRUD
- **平台文档** — 前端/后端/移动端文档页，液态玻璃风格 + 视频背景
- **代码生成器** — 对接后端代码生成接口，快速生成前后端 CRUD 代码
- **个人中心** — 头像上传、基本信息编辑、安全设置、操作日志

## 项目结构

```
src/
├── api/                  # API 接口定义（按业务模块拆分）
├── assets/               # 静态资源（图片、样式、视频）
├── components/
│   ├── glass/            # 液态玻璃组件库（30+ 组件）
│   │   └── core/         # 核心 composable（useGlassFilter、useGlassTheme）
│   └── ui/               # shadcn-vue 基础组件（28 类）
├── composables/          # 组合式函数
├── constants/            # 常量定义
├── enums/                # 枚举类型
├── lang/package/         # 国际化语言包（zh-cn.json、en.json）
├── layouts/              # 布局组件（左侧/顶部/混合）
│   └── components/       # 布局子组件（Sidebar、Navbar、Toolbar、TagsView）
├── lib/                  # 工具库（cn、request）
├── router/               # 路由配置（静态路由 + 动态路由）
├── settings/             # 全局配置
├── stores/               # Pinia Store（user、app、settings、permission、tagsView）
├── styles/               # 全局样式
├── types/                # TypeScript 类型声明
├── utils/                # 工具函数
└── views/                # 页面视图
    ├── dashboard/        # 仪表盘（统计、趋势图、待办、动态）
    ├── login/            # 登录页
    ├── profile/          # 个人中心
    ├── system/           # 系统管理（用户/角色/菜单/部门/字典/日志/通知/租户）
    ├── doc/              # 平台文档（前端/后端/移动端）
    │   └── components/   # 文档共享组件（Hero、Architecture、TechStack 等）
    ├── codegen/          # 代码生成器
    ├── demo/             # 功能演示页面
    └── error/            # 错误页（401/404）
```

## 快速开始

### 环境要求

- Node.js >= 18.x（推荐 20.x LTS）
- pnpm >= 8.x
- Git >= 2.30

### 安装

```bash
# 克隆项目
git clone https://github.com/ac4nd/hs-admin-future.git
cd hs-admin-future

# 安装依赖
pnpm install

# 启动开发服务
pnpm dev
```

### 构建部署

```bash
# 生产构建
pnpm build

# 预览构建产物
pnpm preview
```

### 环境配置

项目通过 `.env.development` 和 `.env.production` 管理环境变量：

```bash
# .env.development
VITE_API_URL=/dev-api
```

开发环境通过 Vite proxy 代理转发 API 请求至后端（默认 `http://localhost:8000`），避免跨域问题。

## 配套后端

后端基于 Java 17 + Spring Boot 4.0.5 + PostgreSQL 16.4 构建，提供完整的多租户权限管理 API：

- 仓库：[GodlikeAgents](https://github.com/ac4nd/GodlikeAgents)
- API 文档：启动后访问 `/doc.html`（Knife4j）

## 开发规范

- **组件规范**：`<script setup lang="ts">` + Composition API
- **样式方案**：Tailwind CSS 4 + CSS Variables 主题切换
- **状态管理**：Pinia Setup Store 风格（`defineStore('name', () => {})`）
- **API 层**：`src/api/` 按模块拆分，统一使用 `request.ts` 封装的 axios 实例
- **路由**：静态路由在 `router/`，动态路由由后端接口返回后通过 `router.addRoute()` 注册
- **国际化**：所有用户可见文案使用 `t()` 函数，语言包在 `src/lang/package/`
- **代码质量**：ESLint + Prettier + Stylelint + Husky + Commitlint + lint-staged

## 开源协议

[MIT License](LICENSE)

---

**氦闪技术开源组织 · Hypersense**

探索前沿 · 感知未来 · 极客精神
