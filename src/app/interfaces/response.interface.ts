import { IPersona } from "./personas.interface";

export interface ResponseApi {
    status: boolean;
    msg: string;
    data: IPersona[];
}

