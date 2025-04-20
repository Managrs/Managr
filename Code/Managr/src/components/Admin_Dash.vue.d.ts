interface User {
    name: string;
    role: 'Freelancer' | 'Client' | 'Admin';
}
declare const _default: import("vue").DefineComponent<{}, {}, {
    freelancers: User[];
    totalProjects: number;
    pendingPayments: number;
    pendingUsers: User[];
}, {}, {
    approve(name: string): void;
    reject(name: string): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
