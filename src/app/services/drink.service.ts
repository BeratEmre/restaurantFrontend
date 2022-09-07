import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DrinkModel } from '../models/drink-model';
import { FileUploadModal } from '../models/file-upload-model';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';

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
  addDrink(formData:FormData):Observable<ResponseModel<DrinkModel>> {
    let newPath=this.apiUrl+"Drinks/add";
    return this.httpClient.post<ResponseModel<DrinkModel>>(newPath,formData);     
  }

  updateDrink(formData:FormData):Observable<ResponseModel<DrinkModel>> {
    let newPath=this.apiUrl+"Drinks/update";
    return this.httpClient.post<ResponseModel<DrinkModel>>(newPath,formData);     
  }

  remove(id: number) {
    let newPath=this.apiUrl+"Drinks/Remove?id="+id;
    return this.httpClient.post<ResponseModel<DrinkModel>>(newPath,null);
  }
}
