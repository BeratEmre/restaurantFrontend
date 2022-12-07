import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { BasketModel } from "../models/basket-model";
import { ListResponseModel } from "../models/list-response-model";
import { OrderDtoModel } from "../models/orderDto-model";
import { ResponseModel } from "../models/response-model";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    addOrder(userId: number): Observable<ResponseModel<any>> {
        let newPath = this.apiUrl + "Order/Add?userId=" + userId;
        return this.httpClient.post<ResponseModel<any>>(newPath, null);
    }

    getBasketWithUserId(userId: number): Observable<ListResponseModel<BasketModel>> {
        let newPath = this.apiUrl + "Order/GetActiveOrdersWithUserId?userId=" + userId;
        return this.httpClient.post<ListResponseModel<BasketModel>>(newPath,null);
    }

    getOrderDtos(): Observable<ListResponseModel<OrderDtoModel>> {
        let newPath = this.apiUrl + "Order/GetOrderDtos";
        return this.httpClient.get<ListResponseModel<OrderDtoModel>>(newPath);
    }
    getFilterOrder(form:any):Observable<ListResponseModel<OrderDtoModel>>{
        let newPath = this.apiUrl + "Order/GetFilterOrderDtos";
        return this.httpClient.post<ListResponseModel<OrderDtoModel>>(newPath,form);
    }
}  