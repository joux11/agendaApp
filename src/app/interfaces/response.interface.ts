export interface ResponseApi<T> {
    status: boolean;
    errors?: boolean;
    validation?: boolean;
    msg: string;
    data: T[];
}


