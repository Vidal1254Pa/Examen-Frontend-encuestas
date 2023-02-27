export interface IPageInfo {
    title: string,
    breadcrums: IBreadcrum[]
}

export interface IBreadcrum {
    title: string;
    path: string;
    isActive: boolean;
    isSeparator?: boolean;
}