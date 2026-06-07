import { ref, computed } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
const mockUsers = [
    {
        id: "1",
        username: "admin",
        nickname: "管理员",
        deptName: "研发部门",
        roleNames: "超级管理员",
        status: 1,
    },
    {
        id: "2",
        username: "zhangsan",
        nickname: "张三",
        deptName: "市场部门",
        roleNames: "普通用户",
        status: 1,
    },
    {
        id: "3",
        username: "lisi",
        nickname: "李四",
        deptName: "财务部门",
        roleNames: "审计员",
        status: 1,
    },
    {
        id: "4",
        username: "wangwu",
        nickname: "王五",
        deptName: "人事部门",
        roleNames: "HR",
        status: 0,
    },
    {
        id: "5",
        username: "zhaoliu",
        nickname: "赵六",
        deptName: "研发部门",
        roleNames: "开发工程师",
        status: 1,
    },
    {
        id: "6",
        username: "sunqi",
        nickname: "孙七",
        deptName: "测试部门",
        roleNames: "测试工程师",
        status: 1,
    },
];
const popoverOpen = ref(false);
const keyword = ref("");
const selectedUser = ref();
const filteredUsers = computed(() => {
    if (!keyword.value)
        return mockUsers;
    const kw = keyword.value.toLowerCase();
    return mockUsers.filter((u) => u.username.toLowerCase().includes(kw) || u.nickname.toLowerCase().includes(kw));
});
function selectUser(user) {
    selectedUser.value = user;
}
function confirmSelect() {
    popoverOpen.value = false;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
let __VLS_6;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_11 } = __VLS_9.slots;
let __VLS_12;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
    ...{ class: "text-sm" },
}));
const __VLS_14 = __VLS_13({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_17 } = __VLS_15.slots;
var __VLS_15;
var __VLS_9;
let __VLS_18;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    ...{ class: "space-y-4" },
}));
const __VLS_20 = __VLS_19({
    ...{ class: "space-y-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
const { default: __VLS_23 } = __VLS_21.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.Label | typeof __VLS_components.Label} */
Label;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    ...{ class: "w-20 text-sm" },
}));
const __VLS_26 = __VLS_25({
    ...{ class: "w-20 text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
var __VLS_27;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Popover | typeof __VLS_components.Popover} */
Popover;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({
    open: (__VLS_ctx.popoverOpen),
}));
const __VLS_32 = __VLS_31({
    open: (__VLS_ctx.popoverOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.PopoverTrigger | typeof __VLS_components.PopoverTrigger} */
PopoverTrigger;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    asChild: true,
}));
const __VLS_38 = __VLS_37({
    asChild: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    variant: "outline",
    ...{ class: "w-80 justify-start font-normal" },
}));
const __VLS_44 = __VLS_43({
    variant: "outline",
    ...{ class: "w-80 justify-start font-normal" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
if (__VLS_ctx.selectedUser) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "flex items-center gap-2" },
    });
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    let __VLS_48;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({
        variant: "secondary",
        ...{ class: "text-[10px]" },
    }));
    const __VLS_50 = __VLS_49({
        variant: "secondary",
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_53 } = __VLS_51.slots;
    (__VLS_ctx.selectedUser.status === 1 ? "启用" : "禁用");
    // @ts-ignore
    [popoverOpen, selectedUser, selectedUser,];
    var __VLS_51;
    (__VLS_ctx.selectedUser.username);
    (__VLS_ctx.selectedUser.deptName);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
}
// @ts-ignore
[selectedUser, selectedUser,];
var __VLS_45;
// @ts-ignore
[];
var __VLS_39;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
PopoverContent;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    ...{ class: "w-[500px] p-3" },
    align: "start",
}));
const __VLS_56 = __VLS_55({
    ...{ class: "w-[500px] p-3" },
    align: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
/** @type {__VLS_StyleScopedClasses['w-[500px]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
const { default: __VLS_59 } = __VLS_57.slots;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.Input} */
Input;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索用户名/昵称...",
    ...{ class: "mb-3 h-8" },
}));
const __VLS_62 = __VLS_61({
    modelValue: (__VLS_ctx.keyword),
    placeholder: "搜索用户名/昵称...",
    ...{ class: "mb-3 h-8" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
let __VLS_65;
/** @ts-ignore @type { | typeof __VLS_components.ScrollArea | typeof __VLS_components.ScrollArea} */
ScrollArea;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent1(__VLS_65, new __VLS_65({
    ...{ class: "h-[280px]" },
}));
const __VLS_67 = __VLS_66({
    ...{ class: "h-[280px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
/** @type {__VLS_StyleScopedClasses['h-[280px]']} */ ;
const { default: __VLS_70 } = __VLS_68.slots;
let __VLS_71;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent1(__VLS_71, new __VLS_71({}));
const __VLS_73 = __VLS_72({}, ...__VLS_functionalComponentArgsRest(__VLS_72));
const { default: __VLS_76 } = __VLS_74.slots;
let __VLS_77;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent1(__VLS_77, new __VLS_77({}));
const __VLS_79 = __VLS_78({}, ...__VLS_functionalComponentArgsRest(__VLS_78));
const { default: __VLS_82 } = __VLS_80.slots;
let __VLS_83;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent1(__VLS_83, new __VLS_83({}));
const __VLS_85 = __VLS_84({}, ...__VLS_functionalComponentArgsRest(__VLS_84));
const { default: __VLS_88 } = __VLS_86.slots;
let __VLS_89;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_90 = __VLS_asFunctionalComponent1(__VLS_89, new __VLS_89({
    ...{ class: "w-10" },
}));
const __VLS_91 = __VLS_90({
    ...{ class: "w-10" },
}, ...__VLS_functionalComponentArgsRest(__VLS_90));
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
// @ts-ignore
[keyword,];
var __VLS_97;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({}));
const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_105 } = __VLS_103.slots;
// @ts-ignore
[];
var __VLS_103;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
const { default: __VLS_111 } = __VLS_109.slots;
// @ts-ignore
[];
var __VLS_109;
// @ts-ignore
[];
var __VLS_86;
// @ts-ignore
[];
var __VLS_80;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({}));
const __VLS_114 = __VLS_113({}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
for (const [user] of __VLS_vFor((__VLS_ctx.filteredUsers))) {
    let __VLS_118;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({
        ...{ 'onClick': {} },
        key: (user.id),
        ...{ class: "cursor-pointer" },
        ...{ class: ({ 'bg-primary/5': __VLS_ctx.selectedUser?.id === user.id }) },
    }));
    const __VLS_120 = __VLS_119({
        ...{ 'onClick': {} },
        key: (user.id),
        ...{ class: "cursor-pointer" },
        ...{ class: ({ 'bg-primary/5': __VLS_ctx.selectedUser?.id === user.id }) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    let __VLS_123;
    const __VLS_124 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.selectUser(user);
                // @ts-ignore
                [selectedUser, filteredUsers, selectUser,];
            } });
    /** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary/5']} */ ;
    const { default: __VLS_125 } = __VLS_121.slots;
    let __VLS_126;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({}));
    const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
    const { default: __VLS_131 } = __VLS_129.slots;
    let __VLS_132;
    /** @ts-ignore @type { | typeof __VLS_components.Checkbox} */
    Checkbox;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
        checked: (__VLS_ctx.selectedUser?.id === user.id),
    }));
    const __VLS_134 = __VLS_133({
        checked: (__VLS_ctx.selectedUser?.id === user.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    // @ts-ignore
    [selectedUser,];
    var __VLS_129;
    let __VLS_137;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
        ...{ class: "font-medium" },
    }));
    const __VLS_139 = __VLS_138({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_142 } = __VLS_140.slots;
    (user.username);
    // @ts-ignore
    [];
    var __VLS_140;
    let __VLS_143;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({}));
    const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
    const { default: __VLS_148 } = __VLS_146.slots;
    (user.deptName);
    // @ts-ignore
    [];
    var __VLS_146;
    let __VLS_149;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({}));
    const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
    const { default: __VLS_154 } = __VLS_152.slots;
    let __VLS_155;
    /** @ts-ignore @type { | typeof __VLS_components.Badge | typeof __VLS_components.Badge} */
    Badge;
    // @ts-ignore
    const __VLS_156 = __VLS_asFunctionalComponent1(__VLS_155, new __VLS_155({
        variant: (user.status === 1 ? 'default' : 'secondary'),
        ...{ class: "text-[10px]" },
    }));
    const __VLS_157 = __VLS_156({
        variant: (user.status === 1 ? 'default' : 'secondary'),
        ...{ class: "text-[10px]" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_156));
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    const { default: __VLS_160 } = __VLS_158.slots;
    (user.status === 1 ? "启用" : "禁用");
    // @ts-ignore
    [];
    var __VLS_158;
    // @ts-ignore
    [];
    var __VLS_152;
    // @ts-ignore
    [];
    var __VLS_121;
    var __VLS_122;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_115;
// @ts-ignore
[];
var __VLS_74;
// @ts-ignore
[];
var __VLS_68;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex justify-end mt-3 gap-2" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
let __VLS_161;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_162 = __VLS_asFunctionalComponent1(__VLS_161, new __VLS_161({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}));
const __VLS_163 = __VLS_162({
    ...{ 'onClick': {} },
    variant: "outline",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_162));
let __VLS_166;
const __VLS_167 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.popoverOpen = false;
            // @ts-ignore
            [popoverOpen,];
        } });
const { default: __VLS_168 } = __VLS_164.slots;
// @ts-ignore
[];
var __VLS_164;
var __VLS_165;
let __VLS_169;
/** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
Button;
// @ts-ignore
const __VLS_170 = __VLS_asFunctionalComponent1(__VLS_169, new __VLS_169({
    ...{ 'onClick': {} },
    size: "sm",
}));
const __VLS_171 = __VLS_170({
    ...{ 'onClick': {} },
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_170));
let __VLS_174;
const __VLS_175 = ({ click: {} },
    { onClick: (__VLS_ctx.confirmSelect) });
const { default: __VLS_176 } = __VLS_172.slots;
// @ts-ignore
[confirmSelect,];
var __VLS_172;
var __VLS_173;
// @ts-ignore
[];
var __VLS_57;
// @ts-ignore
[];
var __VLS_33;
if (__VLS_ctx.selectedUser) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4 p-4 border rounded-lg bg-muted/30" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-muted/30']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm font-medium mb-2" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid grid-cols-2 gap-2 text-sm" },
    });
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.selectedUser.username);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.selectedUser.nickname);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.selectedUser.deptName);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-muted-foreground" },
    });
    /** @type {__VLS_StyleScopedClasses['text-muted-foreground']} */ ;
    (__VLS_ctx.selectedUser.roleNames);
}
// @ts-ignore
[selectedUser, selectedUser, selectedUser, selectedUser, selectedUser,];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=index.vue.js.map