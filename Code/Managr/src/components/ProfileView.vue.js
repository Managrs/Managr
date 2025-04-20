/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent } from 'vue';
import ProfileCard from './ProfileCard.vue';
export default defineComponent({
    name: 'ProfileView',
    components: { ProfileCard },
    data() {
        return {
            profiles: [
                {
                    id: 1,
                    image: '/images/fashion.jpg',
                    name: 'Alex Johnson',
                    job: 'UX Designer',
                },
                {
                    id: 2,
                    image: '/images/fashion.jpg',
                    name: 'Sarah Williams',
                    job: 'Frontend Developer',
                },
                {
                    id: 3,
                    image: '/images/fashion.jpg',
                    name: 'Sarah Williams',
                    job: 'Frontend Developer',
                },
                {
                    id: 4,
                    image: '/images/fashion.jpg',
                    name: 'Sarah Williams',
                    job: 'Frontend Developer',
                },
                {
                    id: 5,
                    image: '/images/fashion.jpg',
                    name: 'Sarah Williams',
                    job: 'Frontend Developer',
                },
                {
                    id: 6,
                    image: '/images/fashion.jpg',
                    name: 'Sarah Williams',
                    job: 'Frontend Developer',
                },
                {
                    id: 7,
                    image: '/images/fashion.jpg',
                    name: 'Sarah Williams',
                    job: 'Frontend Developer',
                },
                // Add more profiles...
            ]
        };
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = { ProfileCard };
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['profiles-container']} */ ;
/** @type {__VLS_StyleScopedClasses['profiles-container']} */ ;
/** @type {__VLS_StyleScopedClasses['profiles-container']} */ ;
/** @type {__VLS_StyleScopedClasses['profiles-container']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "profiles-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "section-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "profiles-container" },
});
for (const [profile] of __VLS_getVForSourceType((__VLS_ctx.profiles))) {
    const __VLS_0 = {}.ProfileCard;
    /** @type {[typeof __VLS_components.ProfileCard, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (profile.id),
        image: (profile.image),
        name: (profile.name),
        job: (profile.job),
    }));
    const __VLS_2 = __VLS_1({
        key: (profile.id),
        image: (profile.image),
        name: (profile.name),
        job: (profile.job),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
/** @type {__VLS_StyleScopedClasses['profiles-view']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['profiles-container']} */ ;
var __VLS_dollars;
let __VLS_self;
