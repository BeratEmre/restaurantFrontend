import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';
import { environment } from 'src/environments/environment';
import { KeyValue } from '../models/key-value';
import { ProductBaseModel } from '../models/product-base-model';
import { CommentModel } from '../models/commentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getComments(model:ProductBaseModel):Observable<ListResponseModel<CommentModel>> {
    let newPath=this.apiUrl+"Comments/ListByProdut"
    return this.httpClient.post<ListResponseModel<CommentModel>>(newPath,model);     
  }

  getKeyValue():Observable<ListResponseModel<KeyValue>> {
    let newPath=this.apiUrl+"Comments/GetKeyValue"
    return this.httpClient.get<ListResponseModel<KeyValue>>(newPath);     
  }

  addComment(formData:any):Observable<ResponseModel<CommentModel>> {
    let newPath=this.apiUrl+"Comments/Add";
    return this.httpClient.post<ResponseModel<CommentModel>>(newPath,formData);     
  }

  updateComment(formData:FormData):Observable<ResponseModel<ProductBaseModel>> {
    let newPath=this.apiUrl+"Comments/update";
    return this.httpClient.post<ResponseModel<ProductBaseModel>>(newPath,formData);     
  }

  remove(id: number) {
    let newPath=this.apiUrl+"Comments/Remove?id="+id;
    return this.httpClient.post<ResponseModel<ProductBaseModel>>(newPath,null);
  }
}
