import { ListResponseModel } from "./list-response-model"

export interface ResponseModel<T>{
    data:T;
    succes:boolean;
    message:string;
}