import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { toast } from "vue-sonner";
import { GlassSurface, GlassAvatar } from "@/components/glass";
import { useUserStore, useSettingsStore, useAppStore } from "@/stores";
import { appConfig } from "@/settings";
import AuthAPI from "@/api/auth";
import logoUrl from "@/assets/images/logo-dark.png";
import bgDarkUrl from "@/assets/images/bg-dark.webp";
const router = useRouter();
const { t, locale } = useI18n();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const appStore = useAppStore();
const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const captchaCode = ref("");
const captchaId = ref("");
const captchaBase64 = ref("");
const rememberMe = ref(false);
const loading = ref(false);
const showPassword = ref(false);
// 工具栏下拉状态
const showThemeMenu = ref(false);
const showLangMenu = ref(false);
// 是否暗色
const isDark = computed(() => settingsStore.resolvedTheme === "dark" /* ThemeMode.DARK */);
// Hero 特性
const featureKeys = ["auth", "tenant", "audit"];
const features = computed(() => featureKeys.map((key) => t(`login.hero.features.${key}`)));
// 主题选项
const themeOptions = [
    { value: "light" /* ThemeMode.LIGHT */, label: computed(() => t("login.light")) },
    { value: "dark" /* ThemeMode.DARK */, label: computed(() => t("login.dark")) },
    { value: "auto" /* ThemeMode.AUTO */, label: computed(() => t("login.auto")) },
];
// 语言选项
const langOptions = [
    { value: "zh-cn" /* LanguageEnum.ZH_CN */, label: "中文" },
    { value: "en" /* LanguageEnum.EN */, label: "English" },
];
// 主题图标
const themeIcon = computed(() => {
    if (settingsStore.theme === "auto" /* ThemeMode.AUTO */)
        return "monitor";
    return isDark.value ? "moon" : "sun";
});
// 切换主题
function handleThemeChange(mode) {
    settingsStore.theme = mode;
    showThemeMenu.value = false;
}
// 切换语言
function handleLangChange(lang) {
    locale.value = lang;
    appStore.changeLanguage(lang);
    showLangMenu.value = false;
    toast.success(t("langSelect.message.success"));
}
// 点击外部关闭菜单
function closeMenus() {
    showThemeMenu.value = false;
    showLangMenu.value = false;
}
async function loadCaptcha() {
    try {
        const data = await AuthAPI.getCaptcha();
        captchaId.value = data.captchaId;
        captchaBase64.value = data.captchaBase64;
    }
    catch {
        captchaBase64.value = "";
    }
}
function validateUsername() {
    if (!username.value.trim()) {
        usernameError.value = t("login.usernameRequired");
        return false;
    }
    usernameError.value = "";
    return true;
}
function validatePassword() {
    if (!password.value) {
        passwordError.value = t("login.passwordRequired");
        return false;
    }
    passwordError.value = "";
    return true;
}
function handleEnterLogin() {
    const v1 = validateUsername();
    const v2 = validatePassword();
    if (v1 && v2)
        handleLogin();
}
async function handleLogin() {
    const v1 = validateUsername();
    const v2 = validatePassword();
    if (!v1 || !v2)
        return;
    loading.value = true;
    try {
        await userStore.login({
            username: username.value,
            password: password.value,
            captchaId: captchaId.value,
            captchaCode: captchaCode.value,
            rememberMe: rememberMe.value,
        });
        const redirect = router.currentRoute.value.query.redirect || "/";
        router.push(redirect);
    }
    catch {
        captchaCode.value = "";
        loadCaptcha();
    }
    finally {
        loading.value = false;
    }
}
onMounted(loadCaptcha);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['login-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
/** @type {__VLS_StyleScopedClasses['login-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['login-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['login-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-field']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-field']} */ ;
/** @type {__VLS_StyleScopedClasses['glass-field']} */ ;
/** @type {__VLS_StyleScopedClasses['field-error']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['captcha-img']} */ ;
/** @type {__VLS_StyleScopedClasses['social-icon-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar-item']} */ ;
/** @type {__VLS_StyleScopedClasses['login-dark']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
/** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.closeMenus) },
    ...{ class: "login-page relative flex flex-col min-h-screen overflow-hidden" },
    ...{ class: ({ 'login-dark': __VLS_ctx.isDark }) },
});
/** @type {__VLS_StyleScopedClasses['login-page']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['login-dark']} */ ;
if (__VLS_ctx.isDark) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 bg-cover bg-center bg-no-repeat" },
        ...{ style: ({ backgroundImage: `url(${__VLS_ctx.bgDarkUrl})` }) },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-no-repeat']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "absolute inset-0 bg-black/40" },
    });
    /** @type {__VLS_StyleScopedClasses['absolute']} */ ;
    /** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-black/40']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "login-gradient" },
    });
    /** @type {__VLS_StyleScopedClasses['login-gradient']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "deco deco-1" },
    });
    /** @type {__VLS_StyleScopedClasses['deco']} */ ;
    /** @type {__VLS_StyleScopedClasses['deco-1']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "deco deco-2" },
    });
    /** @type {__VLS_StyleScopedClasses['deco']} */ ;
    /** @type {__VLS_StyleScopedClasses['deco-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "deco deco-3" },
    });
    /** @type {__VLS_StyleScopedClasses['deco']} */ ;
    /** @type {__VLS_StyleScopedClasses['deco-3']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-20 flex justify-end p-3 sm:p-4" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:p-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "toolbar-pill flex items-center gap-1" },
});
/** @type {__VLS_StyleScopedClasses['toolbar-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showThemeMenu = !__VLS_ctx.showThemeMenu;
            __VLS_ctx.showLangMenu = false;
            ;
            // @ts-ignore
            [closeMenus, isDark, isDark, bgDarkUrl, showThemeMenu, showThemeMenu, showLangMenu,];
        } },
    ...{ class: "toolbar-item" },
    title: (__VLS_ctx.t('login.themeToggle')),
});
/** @type {__VLS_StyleScopedClasses['toolbar-item']} */ ;
if (__VLS_ctx.themeIcon === 'sun') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4.5 h-4.5" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    });
}
else if (__VLS_ctx.themeIcon === 'moon') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4.5 h-4.5" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4.5 h-4.5" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    });
}
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "dropdown",
}));
const __VLS_2 = __VLS_1({
    name: "dropdown",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.showThemeMenu) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "dropdown-menu" },
    });
    /** @type {__VLS_StyleScopedClasses['dropdown-menu']} */ ;
    for (const [opt] of __VLS_vFor((__VLS_ctx.themeOptions))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showThemeMenu))
                        return;
                    __VLS_ctx.handleThemeChange(opt.value);
                    // @ts-ignore
                    [showThemeMenu, t, themeIcon, themeIcon, themeOptions, handleThemeChange,];
                } },
            key: (opt.value),
            ...{ class: "dropdown-item" },
            ...{ class: ({ active: __VLS_ctx.settingsStore.theme === opt.value }) },
        });
        /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        (opt.label.value);
        if (__VLS_ctx.settingsStore.theme === opt.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-3.5 h-3.5 ml-auto" },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "2.5",
                d: "M5 13l4 4L19 7",
            });
        }
        // @ts-ignore
        [settingsStore, settingsStore,];
    }
}
// @ts-ignore
[];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showLangMenu = !__VLS_ctx.showLangMenu;
            __VLS_ctx.showThemeMenu = false;
            ;
            // @ts-ignore
            [showThemeMenu, showLangMenu, showLangMenu,];
        } },
    ...{ class: "toolbar-item" },
    title: (__VLS_ctx.t('login.languageToggle')),
});
/** @type {__VLS_StyleScopedClasses['toolbar-item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-4.5 h-4.5" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-4.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
});
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    name: "dropdown",
}));
const __VLS_8 = __VLS_7({
    name: "dropdown",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
if (__VLS_ctx.showLangMenu) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: () => { } },
        ...{ class: "dropdown-menu" },
    });
    /** @type {__VLS_StyleScopedClasses['dropdown-menu']} */ ;
    for (const [opt] of __VLS_vFor((__VLS_ctx.langOptions))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.showLangMenu))
                        return;
                    __VLS_ctx.handleLangChange(opt.value);
                    // @ts-ignore
                    [showLangMenu, t, langOptions, handleLangChange,];
                } },
            key: (opt.value),
            ...{ class: "dropdown-item" },
            ...{ class: ({ active: __VLS_ctx.appStore.language === opt.value }) },
        });
        /** @type {__VLS_StyleScopedClasses['dropdown-item']} */ ;
        /** @type {__VLS_StyleScopedClasses['active']} */ ;
        (opt.label);
        if (__VLS_ctx.appStore.language === opt.value) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-3.5 h-3.5 ml-auto" },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            /** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
            /** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "2.5",
                d: "M5 13l4 4L19 7",
            });
        }
        // @ts-ignore
        [appStore, appStore,];
    }
}
// @ts-ignore
[];
var __VLS_9;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative z-10 flex-1 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 md:gap-8 items-center px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1280px] xl:max-w-[1400px] mx-auto w-full" },
});
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-[3fr_2fr]']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-8']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-12']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-16']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[1280px]']} */ ;
/** @type {__VLS_StyleScopedClasses['xl:max-w-[1400px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "hidden md:flex flex-col self-start pt-[18vh] animate-slide-up" },
});
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['self-start']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-[18vh]']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-slide-up']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "hero-title text-4xl lg:text-[56px] font-bold leading-tight tracking-tight" },
});
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-[56px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
(__VLS_ctx.appConfig.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "hero-title text-2xl lg:text-[32px] font-bold leading-tight tracking-tight mt-2" },
});
/** @type {__VLS_StyleScopedClasses['hero-title']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-[32px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
(__VLS_ctx.t("login.hero.subtitle"));
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-2 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed opacity-70" },
});
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
(__VLS_ctx.t("login.hero.description"));
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "grid gap-2 sm:gap-3" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:gap-3']} */ ;
for (const [feature] of __VLS_vFor((__VLS_ctx.features))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (feature),
        ...{ class: "feature-card flex items-center gap-3 px-4 py-3 text-sm font-medium" },
    });
    /** @type {__VLS_StyleScopedClasses['feature-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4 shrink-0 text-emerald-400" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-emerald-400']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2.5",
        d: "M5 13l4 4L19 7",
    });
    (feature);
    // @ts-ignore
    [t, t, appConfig, features,];
}
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.GlassSurface | typeof __VLS_components.GlassSurface} */
GlassSurface;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    preset: "card",
    mouseTracking: (true),
    ...{ class: "login-card justify-self-center" },
}));
const __VLS_14 = __VLS_13({
    preset: "card",
    mouseTracking: (true),
    ...{ class: "login-card justify-self-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-self-center']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full p-8 space-y-6" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.GlassAvatar} */
GlassAvatar;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    src: (__VLS_ctx.logoUrl),
    alt: "HS Admin",
    size: "lg",
}));
const __VLS_20 = __VLS_19({
    src: (__VLS_ctx.logoUrl),
    alt: "HS Admin",
    size: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-2xl font-bold tracking-tight login-text" },
});
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm opacity-70 login-text-sub" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
(__VLS_ctx.t("login.hero.subtitle"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['via-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleLogin) },
    ...{ class: "space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "text-xs font-medium login-text" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.username"));
let __VLS_23;
/** @ts-ignore @type { | typeof __VLS_components.GlassSurface | typeof __VLS_components.GlassSurface} */
GlassSurface;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    preset: "input",
    ...{ class: "glass-field w-full" },
    ...{ class: ({ 'field-error': __VLS_ctx.usernameError }) },
}));
const __VLS_25 = __VLS_24({
    preset: "input",
    ...{ class: "glass-field w-full" },
    ...{ class: ({ 'field-error': __VLS_ctx.usernameError }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
/** @type {__VLS_StyleScopedClasses['glass-field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field-error']} */ ;
const { default: __VLS_28 } = __VLS_26.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex items-center px-3 py-2.5 gap-2 relative z-[1]" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[1]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-4 h-4 shrink-0 login-text-sub" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onBlur: (__VLS_ctx.validateUsername) },
    ...{ onKeyup: (__VLS_ctx.handleEnterLogin) },
    value: (__VLS_ctx.username),
    type: "text",
    placeholder: (__VLS_ctx.t('login.username')),
    autocomplete: "off",
    ...{ class: "login-input flex-1 min-w-0 text-sm outline-none" },
});
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
// @ts-ignore
[t, t, t, logoUrl, handleLogin, usernameError, validateUsername, handleEnterLogin, username,];
var __VLS_26;
if (__VLS_ctx.usernameError) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-red-400 mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (__VLS_ctx.usernameError);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "text-xs font-medium login-text" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.password"));
let __VLS_29;
/** @ts-ignore @type { | typeof __VLS_components.GlassSurface | typeof __VLS_components.GlassSurface} */
GlassSurface;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    preset: "input",
    ...{ class: "glass-field w-full" },
    ...{ class: ({ 'field-error': __VLS_ctx.passwordError }) },
}));
const __VLS_31 = __VLS_30({
    preset: "input",
    ...{ class: "glass-field w-full" },
    ...{ class: ({ 'field-error': __VLS_ctx.passwordError }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['glass-field']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['field-error']} */ ;
const { default: __VLS_34 } = __VLS_32.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex items-center px-3 py-2.5 gap-2 relative z-[1]" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[1]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-4 h-4 shrink-0 login-text-sub" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onBlur: (__VLS_ctx.validatePassword) },
    ...{ onKeyup: (__VLS_ctx.handleEnterLogin) },
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    placeholder: (__VLS_ctx.t('login.password')),
    autocomplete: "off",
    ...{ class: "login-input flex-1 min-w-0 text-sm outline-none" },
});
(__VLS_ctx.password);
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            // @ts-ignore
            [t, t, usernameError, usernameError, handleEnterLogin, passwordError, validatePassword, showPassword, showPassword, showPassword, password,];
        } },
    type: "button",
    ...{ class: "shrink-0 p-0.5 opacity-60 hover:opacity-100 transition-opacity" },
});
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
if (!__VLS_ctx.showPassword) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4 login-text-sub" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    });
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4 login-text-sub" },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
    });
}
// @ts-ignore
[showPassword,];
var __VLS_32;
if (__VLS_ctx.passwordError) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xs text-red-400 mt-1" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    (__VLS_ctx.passwordError);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-1.5" },
});
/** @type {__VLS_StyleScopedClasses['space-y-1.5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "text-xs font-medium login-text" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.captchaCode"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_35;
/** @ts-ignore @type { | typeof __VLS_components.GlassSurface | typeof __VLS_components.GlassSurface} */
GlassSurface;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    preset: "input",
    ...{ class: "glass-field flex-1" },
}));
const __VLS_37 = __VLS_36({
    preset: "input",
    ...{ class: "glass-field flex-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
/** @type {__VLS_StyleScopedClasses['glass-field']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
const { default: __VLS_40 } = __VLS_38.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full flex items-center px-3 py-2.5 gap-2 relative z-[1]" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['z-[1]']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-4 h-4 shrink-0 login-text-sub" },
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
});
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
    'stroke-width': "2",
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    value: (__VLS_ctx.captchaCode),
    type: "text",
    placeholder: (__VLS_ctx.t('login.captchaCode')),
    autocomplete: "off",
    maxlength: "4",
    ...{ class: "login-input flex-1 min-w-0 text-sm outline-none" },
});
/** @type {__VLS_StyleScopedClasses['login-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['outline-none']} */ ;
// @ts-ignore
[t, t, passwordError, passwordError, captchaCode,];
var __VLS_38;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.loadCaptcha) },
    ...{ class: "captcha-img shrink-0 cursor-pointer overflow-hidden" },
    title: (__VLS_ctx.t('login.captchaCode')),
});
/** @type {__VLS_StyleScopedClasses['captcha-img']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
if (__VLS_ctx.captchaBase64) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.captchaBase64),
        alt: "captcha",
        ...{ class: "h-full w-full object-contain" },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['object-contain']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-full w-full flex items-center justify-center text-xs opacity-40 login-text" },
    });
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
    /** @type {__VLS_StyleScopedClasses['login-text']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-between" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    ...{ class: "flex items-center gap-2 cursor-pointer" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    type: "checkbox",
    ...{ class: "w-3.5 h-3.5 accent-blue-400 rounded" },
});
(__VLS_ctx.rememberMe);
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['accent-blue-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs login-text" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.rememberMe"));
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "text-xs login-text hover:opacity-80 transition-opacity" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
(__VLS_ctx.t("login.forgetPassword"));
let __VLS_41;
/** @ts-ignore @type { | typeof __VLS_components.GlassSurface | typeof __VLS_components.GlassSurface} */
GlassSurface;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    preset: "button",
    mouseTracking: (true),
    onClick: (__VLS_ctx.handleLogin),
    ...{ class: "w-full" },
}));
const __VLS_43 = __VLS_42({
    preset: "button",
    mouseTracking: (true),
    onClick: (__VLS_ctx.handleLogin),
    ...{ class: "w-full" },
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
const { default: __VLS_46 } = __VLS_44.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-full px-4 py-3 text-center text-sm font-semibold login-text" },
});
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
if (!__VLS_ctx.loading) {
    (__VLS_ctx.t("login.login"));
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "inline-flex items-center justify-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4 animate-spin" },
        fill: "none",
        viewBox: "0 0 24 24",
    });
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.circle)({
        ...{ class: "opacity-25" },
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        'stroke-width': "4",
    });
    /** @type {__VLS_StyleScopedClasses['opacity-25']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        ...{ class: "opacity-75" },
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z",
    });
    /** @type {__VLS_StyleScopedClasses['opacity-75']} */ ;
}
// @ts-ignore
[t, t, t, t, handleLogin, loadCaptcha, captchaBase64, captchaBase64, rememberMe, loading,];
var __VLS_44;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-center gap-1.5 text-sm" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "opacity-60 login-text" },
});
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.noAccount"));
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "font-medium hover:underline login-text" },
});
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.register"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['via-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-xs opacity-40 whitespace-nowrap login-text" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text']} */ ;
(__VLS_ctx.t("login.otherLoginMethods"));
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" },
});
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-px']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['via-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center justify-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "social-icon-btn" },
    title: "微信",
});
/** @type {__VLS_StyleScopedClasses['social-icon-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-5 h-5" },
    viewBox: "0 0 24 24",
    fill: "currentColor",
});
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 0 1-.253-1.726c0-3.573 3.26-6.47 7.278-6.47.122 0 .243.005.363.013C15.596 4.373 12.454 2.188 8.691 2.188zm-2.93 4.08a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12zm5.713 0a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12zM23.997 15.39c0-3.248-3.238-5.882-7.229-5.882-3.992 0-7.23 2.634-7.23 5.882 0 3.248 3.238 5.882 7.23 5.882.772 0 1.522-.107 2.227-.312a.72.72 0 0 1 .566.078l1.494.876a.262.262 0 0 0 .132.043.233.233 0 0 0 .229-.233c0-.058-.023-.115-.038-.17l-.305-1.165a.47.47 0 0 1 .168-.526c1.465-1.091 2.756-2.748 2.756-4.473zm-9.725-1.24a.834.834 0 1 1 0-1.67.834.834 0 0 1 0 1.67zm4.993 0a.834.834 0 1 1 0-1.67.834.834 0 0 1 0 1.67z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "social-icon-btn" },
    title: "QQ",
});
/** @type {__VLS_StyleScopedClasses['social-icon-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-5 h-5" },
    viewBox: "0 0 24 24",
    fill: "currentColor",
});
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M12 2C7.589 2 4 5.589 4 9.996c0 1.928.691 3.691 1.835 5.07-.18.632-.485 1.513-.863 2.28-.534 1.085-.272 1.932.738 1.932.81 0 1.677-.392 2.388-.9.649.203 1.313.34 1.99.4-.12.364-.243.832-.316 1.312-.115.755.284 1.21.897 1.21.59 0 1.272-.382 1.905-.948.147-.131.287-.27.418-.414.13.144.27.283.417.414.634.566 1.316.948 1.906.948.613 0 1.012-.455.897-1.21-.073-.48-.196-.948-.316-1.312.677-.06 1.341-.197 1.99-.4.71.508 1.578.9 2.388.9 1.01 0 1.272-.847.738-1.932-.378-.767-.683-1.648-.863-2.28A7.963 7.963 0 0 0 20 9.996C20 5.589 16.411 2 12 2zm0 2.5a5.49 5.49 0 0 1 5.49 5.496c0 1.255-.42 2.41-1.125 3.334l.028.048c.202.648.536 1.478.961 2.232-.47-.158-.96-.458-1.422-.83l-.036-.028-.043.022a7.454 7.454 0 0 1-3.853 1.067 7.454 7.454 0 0 1-3.853-1.067l-.043-.022-.036.028c-.462.372-.952.672-1.422.83.425-.754.759-1.584.961-2.232l.028-.048A5.466 5.466 0 0 1 6.51 9.996 5.49 5.49 0 0 1 12 4.5z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "social-icon-btn" },
    title: "GitHub",
});
/** @type {__VLS_StyleScopedClasses['social-icon-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-5 h-5" },
    viewBox: "0 0 24 24",
    fill: "currentColor",
});
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: "button",
    ...{ class: "social-icon-btn" },
    title: "Gitee",
});
/** @type {__VLS_StyleScopedClasses['social-icon-btn']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "w-5 h-5" },
    viewBox: "0 0 24 24",
    fill: "currentColor",
});
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H8.37a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h5.85z",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "text-center" },
});
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-xs login-text-sub" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['login-text-sub']} */ ;
// @ts-ignore
[t, t, t,];
var __VLS_15;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map