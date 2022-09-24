import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { FoodModel } from "../models/food-model";
import { KeyValue } from "../models/key-value";
import { ListResponseModel } from "../models/list-response-model";
import { ResponseModel } from "../models/response-model";

@Injectable({
    providedIn: 'root'
  })
  export class FoodService {

    apiUrl = environment.apiUrl;
    constructor(private httpClient:HttpClient) { }
  
    getFoods():Observable<ListResponseModel<FoodModel>> {
      let newPath=this.apiUrl+"Foods/getall"
      return this.httpClient.get<ListResponseModel<FoodModel>>(newPath);     
    }

    getKeyValue():Observable<ListResponseModel<KeyValue>> {
      let newPath=this.apiUrl+"Foods/GetKeyValue"
      return this.httpClient.get<ListResponseModel<KeyValue>>(newPath);     
    }
    
    addFood(formData:FormData):Observable<ResponseModel<FoodModel>> {
      let newPath=this.apiUrl+"Foods/add";
      return this.httpClient.post<ResponseModel<FoodModel>>(newPath,formData);     
    }
  
    updateFood(formData:FormData):Observable<ResponseModel<FoodModel>> {
      let newPath=this.apiUrl+"Foods/update";
      return this.httpClient.post<ResponseModel<FoodModel>>(newPath,formData);     
    }
  
    remove(id: number) {
      let newPath=this.apiUrl+"Foods/Remove?id="+id;
      return this.httpClient.post<ResponseModel<FoodModel>>(newPath,null);
    }
  }