import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/list-response-model';
import { SweetModel } from '../models/sweet-model';
import { ResponseModel } from '../models/response-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SweetService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getSweets():Observable<ListResponseModel<SweetModel>> {
    let newPath=this.apiUrl+"Sweets/getall"
    return this.httpClient.get<ListResponseModel<SweetModel>>(newPath);     
  }
  addSweet(formData:FormData):Observable<ResponseModel<SweetModel>> {
    let newPath=this.apiUrl+"Sweets/add";
    return this.httpClient.post<ResponseModel<SweetModel>>(newPath,formData);     
  }

  updateSweet(formData:FormData):Observable<ResponseModel<SweetModel>> {
    let newPath=this.apiUrl+"Sweets/update";
    return this.httpClient.post<ResponseModel<SweetModel>>(newPath,formData);     
  }

  remove(id: number) {
    let newPath=this.apiUrl+"Sweets/Remove?id="+id;
    return this.httpClient.post<ResponseModel<SweetModel>>(newPath,null);
  }
}
