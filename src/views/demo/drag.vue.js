import { ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { GripVerticalIcon } from "@lucide/vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
const crew = [
    { name: "路飞", role: "船长·格斗家" },
    { name: "索隆", role: "剑豪·战斗员·三刀流" },
    { name: "娜美", role: "航海士·气象学家·财务官" },
    { name: "山治", role: "厨师·格斗家·黑足" },
    { name: "罗宾", role: "考古学家·历史学家" },
];
const list1 = ref([...crew]);
const list2 = ref([...crew]);
const list3 = ref([...crew]);
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['fade-leave-active']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "p-5 space-y-5" },
});
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid grid-cols-1 lg:grid-cols-2 gap-5" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
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
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({}));
const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_23 } = __VLS_21.slots;
let __VLS_24;
/** @ts-ignore @type { | typeof __VLS_components.VueDraggable | typeof __VLS_components.VueDraggable} */
VueDraggable;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({
    modelValue: (__VLS_ctx.list1),
    ...{ class: "space-y-2 min-h-[200px]" },
}));
const __VLS_26 = __VLS_25({
    modelValue: (__VLS_ctx.list1),
    ...{ class: "space-y-2 min-h-[200px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[200px]']} */ ;
const { default: __VLS_29 } = __VLS_27.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.list1))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (item.name),
        ...{ class: "px-4 py-3 bg-muted/50 rounded-lg text-sm font-medium text-center cursor-grab active:cursor-grabbing active:scale-[1.02] transition-transform" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-muted/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-grab']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:cursor-grabbing']} */ ;
    /** @type {__VLS_StyleScopedClasses['active:scale-[1.02]']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
    (item.name);
    (item.role);
    // @ts-ignore
    [list1, list1,];
}
// @ts-ignore
[];
var __VLS_27;
// @ts-ignore
[];
var __VLS_21;
// @ts-ignore
[];
var __VLS_3;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ class: "text-sm" },
}));
const __VLS_44 = __VLS_43({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_47 } = __VLS_45.slots;
// @ts-ignore
[];
var __VLS_45;
// @ts-ignore
[];
var __VLS_39;
let __VLS_48;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({}));
const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
const { default: __VLS_53 } = __VLS_51.slots;
let __VLS_54;
/** @ts-ignore @type { | typeof __VLS_components.VueDraggable | typeof __VLS_components.VueDraggable} */
VueDraggable;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
    modelValue: (__VLS_ctx.list1),
    target: ".sort-target",
    scroll: (true),
    ...{ class: "min-h-[200px]" },
}));
const __VLS_56 = __VLS_55({
    modelValue: (__VLS_ctx.list1),
    target: ".sort-target",
    scroll: (true),
    ...{ class: "min-h-[200px]" },
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
/** @type {__VLS_StyleScopedClasses['min-h-[200px]']} */ ;
const { default: __VLS_59 } = __VLS_57.slots;
let __VLS_60;
/** @ts-ignore @type { | typeof __VLS_components.TransitionGroup | typeof __VLS_components.TransitionGroup} */
TransitionGroup;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent1(__VLS_60, new __VLS_60({
    tag: "ul",
    name: "fade",
    ...{ class: "sort-target space-y-2" },
}));
const __VLS_62 = __VLS_61({
    tag: "ul",
    name: "fade",
    ...{ class: "sort-target space-y-2" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
/** @type {__VLS_StyleScopedClasses['sort-target']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
const { default: __VLS_65 } = __VLS_63.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.list1))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (item.name),
        ...{ class: "px-4 py-3 bg-muted/50 rounded-lg text-sm font-medium text-center cursor-grab list-none" },
    });
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-muted/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-grab']} */ ;
    /** @type {__VLS_StyleScopedClasses['list-none']} */ ;
    (item.name);
    (item.role);
    // @ts-ignore
    [list1, list1,];
}
// @ts-ignore
[];
var __VLS_63;
// @ts-ignore
[];
var __VLS_57;
// @ts-ignore
[];
var __VLS_51;
// @ts-ignore
[];
var __VLS_33;
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({}));
const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
const { default: __VLS_71 } = __VLS_69.slots;
let __VLS_72;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent1(__VLS_72, new __VLS_72({}));
const __VLS_74 = __VLS_73({}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_77 } = __VLS_75.slots;
let __VLS_78;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent1(__VLS_78, new __VLS_78({
    ...{ class: "text-sm" },
}));
const __VLS_80 = __VLS_79({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_83 } = __VLS_81.slots;
// @ts-ignore
[];
var __VLS_81;
// @ts-ignore
[];
var __VLS_75;
let __VLS_84;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent1(__VLS_84, new __VLS_84({}));
const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
const { default: __VLS_89 } = __VLS_87.slots;
let __VLS_90;
/** @ts-ignore @type { | typeof __VLS_components.VueDraggable | typeof __VLS_components.VueDraggable} */
VueDraggable;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent1(__VLS_90, new __VLS_90({
    modelValue: (__VLS_ctx.list2),
    target: "tbody",
    animation: (150),
}));
const __VLS_92 = __VLS_91({
    modelValue: (__VLS_ctx.list2),
    target: "tbody",
    animation: (150),
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
const { default: __VLS_95 } = __VLS_93.slots;
let __VLS_96;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_97 = __VLS_asFunctionalComponent1(__VLS_96, new __VLS_96({}));
const __VLS_98 = __VLS_97({}, ...__VLS_functionalComponentArgsRest(__VLS_97));
const { default: __VLS_101 } = __VLS_99.slots;
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({}));
const __VLS_104 = __VLS_103({}, ...__VLS_functionalComponentArgsRest(__VLS_103));
const { default: __VLS_107 } = __VLS_105.slots;
let __VLS_108;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_109 = __VLS_asFunctionalComponent1(__VLS_108, new __VLS_108({}));
const __VLS_110 = __VLS_109({}, ...__VLS_functionalComponentArgsRest(__VLS_109));
const { default: __VLS_113 } = __VLS_111.slots;
let __VLS_114;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent1(__VLS_114, new __VLS_114({}));
const __VLS_116 = __VLS_115({}, ...__VLS_functionalComponentArgsRest(__VLS_115));
const { default: __VLS_119 } = __VLS_117.slots;
// @ts-ignore
[list2,];
var __VLS_117;
let __VLS_120;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_121 = __VLS_asFunctionalComponent1(__VLS_120, new __VLS_120({}));
const __VLS_122 = __VLS_121({}, ...__VLS_functionalComponentArgsRest(__VLS_121));
const { default: __VLS_125 } = __VLS_123.slots;
// @ts-ignore
[];
var __VLS_123;
// @ts-ignore
[];
var __VLS_111;
// @ts-ignore
[];
var __VLS_105;
let __VLS_126;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent1(__VLS_126, new __VLS_126({}));
const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
const { default: __VLS_131 } = __VLS_129.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.list2))) {
    let __VLS_132;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_133 = __VLS_asFunctionalComponent1(__VLS_132, new __VLS_132({
        key: (item.name),
    }));
    const __VLS_134 = __VLS_133({
        key: (item.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_133));
    const { default: __VLS_137 } = __VLS_135.slots;
    let __VLS_138;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent1(__VLS_138, new __VLS_138({
        ...{ class: "font-medium" },
    }));
    const __VLS_140 = __VLS_139({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_139));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_143 } = __VLS_141.slots;
    (item.name);
    // @ts-ignore
    [list2,];
    var __VLS_141;
    let __VLS_144;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_145 = __VLS_asFunctionalComponent1(__VLS_144, new __VLS_144({}));
    const __VLS_146 = __VLS_145({}, ...__VLS_functionalComponentArgsRest(__VLS_145));
    const { default: __VLS_149 } = __VLS_147.slots;
    (item.role);
    // @ts-ignore
    [];
    var __VLS_147;
    // @ts-ignore
    [];
    var __VLS_135;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_129;
// @ts-ignore
[];
var __VLS_99;
// @ts-ignore
[];
var __VLS_93;
// @ts-ignore
[];
var __VLS_87;
// @ts-ignore
[];
var __VLS_69;
let __VLS_150;
/** @ts-ignore @type { | typeof __VLS_components.Card | typeof __VLS_components.Card} */
Card;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({}));
const __VLS_152 = __VLS_151({}, ...__VLS_functionalComponentArgsRest(__VLS_151));
const { default: __VLS_155 } = __VLS_153.slots;
let __VLS_156;
/** @ts-ignore @type { | typeof __VLS_components.CardHeader | typeof __VLS_components.CardHeader} */
CardHeader;
// @ts-ignore
const __VLS_157 = __VLS_asFunctionalComponent1(__VLS_156, new __VLS_156({}));
const __VLS_158 = __VLS_157({}, ...__VLS_functionalComponentArgsRest(__VLS_157));
const { default: __VLS_161 } = __VLS_159.slots;
let __VLS_162;
/** @ts-ignore @type { | typeof __VLS_components.CardTitle | typeof __VLS_components.CardTitle} */
CardTitle;
// @ts-ignore
const __VLS_163 = __VLS_asFunctionalComponent1(__VLS_162, new __VLS_162({
    ...{ class: "text-sm" },
}));
const __VLS_164 = __VLS_163({
    ...{ class: "text-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_163));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
const { default: __VLS_167 } = __VLS_165.slots;
// @ts-ignore
[];
var __VLS_165;
// @ts-ignore
[];
var __VLS_159;
let __VLS_168;
/** @ts-ignore @type { | typeof __VLS_components.CardContent | typeof __VLS_components.CardContent} */
CardContent;
// @ts-ignore
const __VLS_169 = __VLS_asFunctionalComponent1(__VLS_168, new __VLS_168({}));
const __VLS_170 = __VLS_169({}, ...__VLS_functionalComponentArgsRest(__VLS_169));
const { default: __VLS_173 } = __VLS_171.slots;
let __VLS_174;
/** @ts-ignore @type { | typeof __VLS_components.VueDraggable | typeof __VLS_components.VueDraggable} */
VueDraggable;
// @ts-ignore
const __VLS_175 = __VLS_asFunctionalComponent1(__VLS_174, new __VLS_174({
    modelValue: (__VLS_ctx.list3),
    target: "tbody",
    handle: ".drag-handle",
    animation: (150),
}));
const __VLS_176 = __VLS_175({
    modelValue: (__VLS_ctx.list3),
    target: "tbody",
    handle: ".drag-handle",
    animation: (150),
}, ...__VLS_functionalComponentArgsRest(__VLS_175));
const { default: __VLS_179 } = __VLS_177.slots;
let __VLS_180;
/** @ts-ignore @type { | typeof __VLS_components.Table | typeof __VLS_components.Table} */
Table;
// @ts-ignore
const __VLS_181 = __VLS_asFunctionalComponent1(__VLS_180, new __VLS_180({}));
const __VLS_182 = __VLS_181({}, ...__VLS_functionalComponentArgsRest(__VLS_181));
const { default: __VLS_185 } = __VLS_183.slots;
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.TableHeader | typeof __VLS_components.TableHeader} */
TableHeader;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({}));
const __VLS_188 = __VLS_187({}, ...__VLS_functionalComponentArgsRest(__VLS_187));
const { default: __VLS_191 } = __VLS_189.slots;
let __VLS_192;
/** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
TableRow;
// @ts-ignore
const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({}));
const __VLS_194 = __VLS_193({}, ...__VLS_functionalComponentArgsRest(__VLS_193));
const { default: __VLS_197 } = __VLS_195.slots;
let __VLS_198;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent1(__VLS_198, new __VLS_198({}));
const __VLS_200 = __VLS_199({}, ...__VLS_functionalComponentArgsRest(__VLS_199));
const { default: __VLS_203 } = __VLS_201.slots;
// @ts-ignore
[list3,];
var __VLS_201;
let __VLS_204;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_205 = __VLS_asFunctionalComponent1(__VLS_204, new __VLS_204({}));
const __VLS_206 = __VLS_205({}, ...__VLS_functionalComponentArgsRest(__VLS_205));
const { default: __VLS_209 } = __VLS_207.slots;
// @ts-ignore
[];
var __VLS_207;
let __VLS_210;
/** @ts-ignore @type { | typeof __VLS_components.TableHead | typeof __VLS_components.TableHead} */
TableHead;
// @ts-ignore
const __VLS_211 = __VLS_asFunctionalComponent1(__VLS_210, new __VLS_210({
    ...{ class: "w-20" },
}));
const __VLS_212 = __VLS_211({
    ...{ class: "w-20" },
}, ...__VLS_functionalComponentArgsRest(__VLS_211));
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
const { default: __VLS_215 } = __VLS_213.slots;
// @ts-ignore
[];
var __VLS_213;
// @ts-ignore
[];
var __VLS_195;
// @ts-ignore
[];
var __VLS_189;
let __VLS_216;
/** @ts-ignore @type { | typeof __VLS_components.TableBody | typeof __VLS_components.TableBody} */
TableBody;
// @ts-ignore
const __VLS_217 = __VLS_asFunctionalComponent1(__VLS_216, new __VLS_216({}));
const __VLS_218 = __VLS_217({}, ...__VLS_functionalComponentArgsRest(__VLS_217));
const { default: __VLS_221 } = __VLS_219.slots;
for (const [item] of __VLS_vFor((__VLS_ctx.list3))) {
    let __VLS_222;
    /** @ts-ignore @type { | typeof __VLS_components.TableRow | typeof __VLS_components.TableRow} */
    TableRow;
    // @ts-ignore
    const __VLS_223 = __VLS_asFunctionalComponent1(__VLS_222, new __VLS_222({
        key: (item.name),
    }));
    const __VLS_224 = __VLS_223({
        key: (item.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_223));
    const { default: __VLS_227 } = __VLS_225.slots;
    let __VLS_228;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_229 = __VLS_asFunctionalComponent1(__VLS_228, new __VLS_228({
        ...{ class: "font-medium" },
    }));
    const __VLS_230 = __VLS_229({
        ...{ class: "font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_229));
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    const { default: __VLS_233 } = __VLS_231.slots;
    (item.name);
    // @ts-ignore
    [list3,];
    var __VLS_231;
    let __VLS_234;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_235 = __VLS_asFunctionalComponent1(__VLS_234, new __VLS_234({}));
    const __VLS_236 = __VLS_235({}, ...__VLS_functionalComponentArgsRest(__VLS_235));
    const { default: __VLS_239 } = __VLS_237.slots;
    (item.role);
    // @ts-ignore
    [];
    var __VLS_237;
    let __VLS_240;
    /** @ts-ignore @type { | typeof __VLS_components.TableCell | typeof __VLS_components.TableCell} */
    TableCell;
    // @ts-ignore
    const __VLS_241 = __VLS_asFunctionalComponent1(__VLS_240, new __VLS_240({}));
    const __VLS_242 = __VLS_241({}, ...__VLS_functionalComponentArgsRest(__VLS_241));
    const { default: __VLS_245 } = __VLS_243.slots;
    let __VLS_246;
    /** @ts-ignore @type { | typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_247 = __VLS_asFunctionalComponent1(__VLS_246, new __VLS_246({
        variant: "ghost",
        size: "sm",
        ...{ class: "drag-handle cursor-grab" },
    }));
    const __VLS_248 = __VLS_247({
        variant: "ghost",
        size: "sm",
        ...{ class: "drag-handle cursor-grab" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_247));
    /** @type {__VLS_StyleScopedClasses['drag-handle']} */ ;
    /** @type {__VLS_StyleScopedClasses['cursor-grab']} */ ;
    const { default: __VLS_251 } = __VLS_249.slots;
    let __VLS_252;
    /** @ts-ignore @type { | typeof __VLS_components.GripVerticalIcon} */
    GripVerticalIcon;
    // @ts-ignore
    const __VLS_253 = __VLS_asFunctionalComponent1(__VLS_252, new __VLS_252({
        ...{ class: "size-4" },
    }));
    const __VLS_254 = __VLS_253({
        ...{ class: "size-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_253));
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    // @ts-ignore
    [];
    var __VLS_249;
    // @ts-ignore
    [];
    var __VLS_243;
    // @ts-ignore
    [];
    var __VLS_225;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_219;
// @ts-ignore
[];
var __VLS_183;
// @ts-ignore
[];
var __VLS_177;
// @ts-ignore
[];
var __VLS_171;
// @ts-ignore
[];
var __VLS_153;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=drag.vue.js.map