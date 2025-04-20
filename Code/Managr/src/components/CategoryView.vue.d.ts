interface CategoryItem {
    id: number;
    image: string;
    title: string;
    description: string;
    category: string;
}
declare const _default: import("vue").DefineComponent<{}, {}, {
    showAll: boolean;
    initialLimit: number;
    categories: CategoryItem[];
}, {
    visibleCategories(): CategoryItem[];
}, {
    toggleShowAll(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    CategoryCard: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
        image: {
            type: StringConstructor;
            required: true;
        };
        title: {
            type: StringConstructor;
            required: true;
        };
        description: {
            type: StringConstructor;
            required: true;
        };
        category: {
            type: StringConstructor;
            required: true;
        };
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        image: {
            type: StringConstructor;
            required: true;
        };
        title: {
            type: StringConstructor;
            required: true;
        };
        description: {
            type: StringConstructor;
            required: true;
        };
        category: {
            type: StringConstructor;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
