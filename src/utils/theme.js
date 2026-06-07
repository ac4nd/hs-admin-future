const SYSTEM_DARK_MEDIA = "(prefers-color-scheme: dark)";
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
export function getDarkColor(color, level) {
    const rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++)
        rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
}
export const getLightColor = (color, level) => {
    const rgb = hexToRgb(color);
    for (let i = 0; i < 3; i++)
        rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
/**
 * 生成主题色变体
 */
export function generateThemeColors(primary, theme) {
    const resolvedTheme = resolveThemeMode(theme);
    const colors = { primary };
    for (let i = 1; i <= 9; i++) {
        colors[`primary-light-${i}`] =
            resolvedTheme === "light" /* ThemeMode.LIGHT */
                ? getLightColor(primary, i / 10)
                : getDarkColor(primary, i / 10);
    }
    colors["primary-dark-2"] =
        resolvedTheme === "light" /* ThemeMode.LIGHT */ ? getLightColor(primary, 0.2) : getDarkColor(primary, 0.3);
    return colors;
}
export function getSystemTheme() {
    return window.matchMedia(SYSTEM_DARK_MEDIA).matches ? "dark" /* ThemeMode.DARK */ : "light" /* ThemeMode.LIGHT */;
}
export function resolveThemeMode(theme) {
    return theme === "auto" /* ThemeMode.AUTO */ ? getSystemTheme() : theme;
}
export function watchSystemTheme(callback) {
    const mediaQuery = window.matchMedia(SYSTEM_DARK_MEDIA);
    const handler = () => callback(mediaQuery.matches ? "dark" /* ThemeMode.DARK */ : "light" /* ThemeMode.LIGHT */);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
}
/**
 * 将生成的颜色写入 CSS 变量到 :root
 * 使用 --color-* 命名空间（Tailwind v4 兼容）
 */
export function applyTheme(colors) {
    const el = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
        el.style.setProperty(`--theme-${key}`, value);
    });
}
export function toggleDarkMode(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
}
export function toggleSidebarColor(isBlue) {
    document.documentElement.classList.toggle("sidebar-color-blue", isBlue);
}
//# sourceMappingURL=theme.js.map