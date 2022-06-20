import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DrinkModel } from '../models/drink-model';
import { ListResponseModel } from '../models/list-response-model';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getDrinks():Observable<ListResponseModel<DrinkModel>> {
    let newPath=this.apiUrl+"Drinks/getall"
    return this.httpClient.get<ListResponseModel<DrinkModel>>(newPath);     
  }
}
