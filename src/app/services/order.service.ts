import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/list-response-model';
import { OrderModel } from '../models/order';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }
  addBasket(order:OrderModel):Observable<ResponseModel<OrderModel>> {
    let newPath=this.apiUrl+"Orders/addToBasket"
    return this.httpClient.post<ResponseModel<OrderModel>>(newPath,order);     
  }

  getBasket():Observable<ListResponseModel<OrderModel>> {
    let newPath=this.apiUrl+"Orders/getBasket"
    return this.httpClient.get<ListResponseModel<OrderModel>>(newPath);     
  }
}
