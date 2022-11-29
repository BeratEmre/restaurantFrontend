import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { ResponseModel } from "../models/response-model";

@Injectable({
    providedIn: 'root'
})

export class OrderService {
    apiUrl = environment.apiUrl;
    constructor(private httpClient:HttpClient) { }

    addOrder(userId:number):Observable<ResponseModel<any>> {
        let newPath=this.apiUrl+"Order/Add?userId="+userId;
        return this.httpClient.post<ResponseModel<any>>(newPath,null);     
      }
}  