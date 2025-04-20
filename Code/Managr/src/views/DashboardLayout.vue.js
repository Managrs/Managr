/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import DashNavbar from '../components/DashNavbar.vue';
import CategoryView from '../components/CategoryView.vue';
import ProfileView from '../components/ProfileView.vue';
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "dashboard" },
});
/** @type {[typeof DashNavbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(DashNavbar, new DashNavbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "dashboard-body" },
});
const __VLS_3 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {[typeof CategoryView, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(CategoryView, new CategoryView({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {[typeof ProfileView, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(ProfileView, new ProfileView({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
/** @type {__VLS_StyleScopedClasses['dashboard']} */ ;
/** @type {__VLS_StyleScopedClasses['dashboard-body']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DashNavbar: DashNavbar,
            CategoryView: CategoryView,
            ProfileView: ProfileView,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
