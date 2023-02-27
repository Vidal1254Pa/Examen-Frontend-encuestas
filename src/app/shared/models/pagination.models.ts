export interface ResponsePagination<T> {
    records: T[];
    totalGlobal: number;
    totalFiltered: number;
}

export interface OptionsPagination {
    orderBy?: string;
    orderDir?: 'ASC' | 'DESC' | '';
    search?: string,
    size: number,
    page: number;
    previousPage: number;
}