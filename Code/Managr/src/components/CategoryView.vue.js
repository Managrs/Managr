/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { defineComponent } from 'vue';
import CategoryCard from './CategoryCard.vue';
export default defineComponent({
    name: 'CategoryView',
    components: {
        CategoryCard,
    },
    data() {
        return {
            showAll: false,
            initialLimit: 8,
            categories: [
                {
                    id: 1,
                    image: '/favicom.ico',
                    title: 'Favicom Inc',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 2,
                    image: '/favicom.ico',
                    title: 'Summer Collection',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 3,
                    image: '/favicom.ico',
                    title: 'Summer Collection',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 4,
                    image: '/favicom.ico',
                    title: 'Summer Collection',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 5,
                    image: '/favicom.ico',
                    title: 'Summer Collection',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 6,
                    image: '/favicom.ico',
                    title: 'Summer Collection',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 7,
                    image: '/favicom.ico',
                    title: 'Summer Collection',
                    description: 'Discover our new summer arrivals',
                    category: 'Fashion',
                },
                {
                    id: 8,
                    image: '/favicom.ico',
                    title: 'Latest Gadgets',
                    description: 'Cutting-edge technology for your home',
                    category: 'Electronics',
                },
                {
                    id: 9,
                    image: '/favicom.ico',
                    title: 'Home Essentials',
                    description: 'Everything to make your home cozy',
                    category: 'Home Decor',
                },
                {
                    id: 10,
                    image: '/favicom.ico',
                    title: 'Sports Gear',
                    description: 'Equipment for your active lifestyle',
                    category: 'Sports',
                },
                {
                    id: 11,
                    image: '/favicom.ico',
                    title: 'Sports Gear',
                    description: 'Equipment for your active lifestyle',
                    category: 'Sports',
                },
                {
                    id: 12,
                    image: '/favicom.ico',
                    title: 'Sports Gear',
                    description: 'Equipment for your active lifestyle',
                    category: 'Sports',
                },
            ],
        };
    },
    computed: {
        visibleCategories() {
            if (!Array.isArray(this.categories))
                return [];
            return this.showAll
                ? this.categories
                : this.categories.slice(0, this.initialLimit);
        }
    },
    methods: {
        toggleShowAll() {
            this.showAll = !this.showAll;
        }
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
const __VLS_componentsOption = {
    CategoryCard,
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['toggle-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "category-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "view-title" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "cards-container" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.visibleCategories))) {
    const __VLS_0 = {}.CategoryCard;
    /** @type {[typeof __VLS_components.CategoryCard, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        key: (item.id),
        image: (item.image),
        title: (item.title),
        description: (item.description),
        category: (item.category),
    }));
    const __VLS_2 = __VLS_1({
        key: (item.id),
        image: (item.image),
        title: (item.title),
        description: (item.description),
        category: (item.category),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleShowAll) },
    ...{ class: "toggle-button" },
});
(__VLS_ctx.showAll ? 'Show Less' : `Show All (${__VLS_ctx.categories.length})`);
/** @type {__VLS_StyleScopedClasses['category-view']} */ ;
/** @type {__VLS_StyleScopedClasses['view-title']} */ ;
/** @type {__VLS_StyleScopedClasses['cards-container']} */ ;
/** @type {__VLS_StyleScopedClasses['toggle-button']} */ ;
var __VLS_dollars;
let __VLS_self;
