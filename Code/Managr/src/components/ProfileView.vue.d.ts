interface Profile {
    id: number;
    image: string;
    name: string;
    job: string;
}
declare const _default: import("vue").DefineComponent<{}, {}, {
    profiles: Profile[];
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    ProfileCard: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
        image: {
            type: import("vue").PropType<string>;
            required: true;
        };
        name: {
            type: import("vue").PropType<string>;
            required: true;
        };
        job: {
            type: import("vue").PropType<string>;
            required: true;
        };
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        image: {
            type: import("vue").PropType<string>;
            required: true;
        };
        name: {
            type: import("vue").PropType<string>;
            required: true;
        };
        job: {
            type: import("vue").PropType<string>;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
