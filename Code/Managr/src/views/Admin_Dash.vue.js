/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AdminDashboard',
    data() {
        return {
            freelancers: [],
            totalProjects: 0,
            pendingPayments: 0,
            pendingUsers: [
                { name: "Kagiso", role: "Freelancer" },
                { name: "Kgaugelo", role: "Client" },
                { name: "Lebo", role: "Freelancer" }
            ]
        };
    },
    mounted() {
        console.log("Admin Dashboard ready");
    },
    methods: {
        approve(name) {
            alert(`${name} has been approved.`);
        },
        reject(name) {
            alert(`${name} has been rejected.`);
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "admin-dashboard-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    ...{ class: "admin-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "logo" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../assets/managr_logo.jpg",
    alt: "Admin Logo",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "post-btn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "messages-btn" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "profile-picture" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: "../assets/profile.jpg",
    alt: "Admin Profile Picture",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
    ...{ class: "admin-main" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "search-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "freelancer-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "freelancer-scroll" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: "category-box" },
});
(__VLS_ctx.freelancers.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: "category-box" },
});
(__VLS_ctx.totalProjects);
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: "category-box" },
});
(__VLS_ctx.pendingPayments);
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "freelancer-section" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
    ...{ class: "freelancer-list" },
});
if (__VLS_ctx.freelancers.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "freelancer-section" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
    ...{ class: "approval-table" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
for (const [user] of __VLS_getVForSourceType((__VLS_ctx.pendingUsers))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (user.name),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (user.role);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.approve(user.name);
            } },
        ...{ class: "approve-btn" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.reject(user.name);
            } },
        ...{ class: "reject-btn" },
    });
}
/** @type {__VLS_StyleScopedClasses['admin-dashboard-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-header']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['post-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['messages-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['profile-picture']} */ ;
/** @type {__VLS_StyleScopedClasses['admin-main']} */ ;
/** @type {__VLS_StyleScopedClasses['search-container']} */ ;
/** @type {__VLS_StyleScopedClasses['freelancer-section']} */ ;
/** @type {__VLS_StyleScopedClasses['freelancer-scroll']} */ ;
/** @type {__VLS_StyleScopedClasses['category-box']} */ ;
/** @type {__VLS_StyleScopedClasses['category-box']} */ ;
/** @type {__VLS_StyleScopedClasses['category-box']} */ ;
/** @type {__VLS_StyleScopedClasses['freelancer-section']} */ ;
/** @type {__VLS_StyleScopedClasses['freelancer-list']} */ ;
/** @type {__VLS_StyleScopedClasses['freelancer-section']} */ ;
/** @type {__VLS_StyleScopedClasses['approval-table']} */ ;
/** @type {__VLS_StyleScopedClasses['approve-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['reject-btn']} */ ;
var __VLS_dollars;
let __VLS_self;
