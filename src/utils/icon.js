import * as LucideIcons from "@lucide/vue";
const iconModules = LucideIcons;
/**
 * 将图标名称字符串解析为 Lucide Vue 组件
 *
 * 支持格式：
 * - PascalCase: User, Settings
 * - Icon 后缀: UserIcon, SettingsIcon
 * - kebab-case: user, user-icon
 * - 小写: user → User
 */
export function resolveIcon(name) {
    if (!name || typeof name !== "string")
        return null;
    // 1. 直接匹配 (User, Settings)
    if (iconModules[name])
        return iconModules[name];
    // 2. 加 Icon 后缀 (User → UserIcon)
    const withSuffix = `${name}Icon`;
    if (iconModules[withSuffix])
        return iconModules[withSuffix];
    // 3. 首字母大写 (user → User)
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    if (iconModules[capitalized])
        return iconModules[capitalized];
    const capitalizedWithSuffix = `${capitalized}Icon`;
    if (iconModules[capitalizedWithSuffix])
        return iconModules[capitalizedWithSuffix];
    // 4. kebab-case → PascalCase (user-icon → UserIcon)
    const pascal = name
        .split("-")
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
        .join("");
    if (iconModules[pascal])
        return iconModules[pascal];
    const pascalWithSuffix = `${pascal}Icon`;
    if (iconModules[pascalWithSuffix])
        return iconModules[pascalWithSuffix];
    return null;
}
//# sourceMappingURL=icon.js.map