import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { BasketModel } from '../models/basket-model';
import { ListResponseModel } from '../models/list-response-model';
import { OrderModel } from '../models/order';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  addBasket(order:OrderModel):Observable<ResponseModel<OrderModel>> {
    let newPath=this.apiUrl+"OrderDetail/addToBasket"
    return this.httpClient.post<ResponseModel<OrderModel>>(newPath,order);     
  }

  getBasket():Observable<ListResponseModel<OrderModel>> {
    let newPath=this.apiUrl+"OrderDetail/getBasket"
    return this.httpClient.get<ListResponseModel<OrderModel>>(newPath);     
  }

  getBasketWithUserId(userId:number):Observable<ListResponseModel<BasketModel>> {
    let newPath=this.apiUrl+"OrderDetail/GetBasketWithUserId?userId="+userId;
    return this.httpClient.get<ListResponseModel<BasketModel>>(newPath);     
  }
  
  deleteBasket(order:OrderModel):Observable<ResponseModel<number>> {
    let newPath=this.apiUrl+"OrderDetail/Delete";
    return this.httpClient.post<ResponseModel<number>>(newPath,order); //Bu üründen spette kalan sayısını dönüyor
  }
}
