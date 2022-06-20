import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { FoodModel } from "../models/food-model";
import { ListResponseModel } from "../models/list-response-model";

@Injectable({
    providedIn: 'root'
  })
  export class FoodService {
  
    apiUrl = environment.apiUrl;
    constructor(private httpClient:HttpClient) { }
  
    getFoods():Observable<ListResponseModel<FoodModel>> {
      let newPath=this.apiUrl+"Drinks/getall"
      return this.httpClient.get<ListResponseModel<FoodModel>>(newPath);     
    }
  }