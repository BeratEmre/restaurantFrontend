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
}
