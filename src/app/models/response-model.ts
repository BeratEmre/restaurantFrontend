import { ListResponseModel } from "./list-response-model"

export interface ResponseModel<T>{
    data:T;
    success:boolean;
    message:string;
}