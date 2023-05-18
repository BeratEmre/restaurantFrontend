import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel } from '../models/list-response-model';
import { ResponseModel } from '../models/response-model';
import { environment } from 'src/environments/environment';
import { FavoriteProductModel } from '../models/favorite-product-model';
import { ProductCard } from '../models/product-card';

@Injectable({
  providedIn: 'root'
})
export class FavoriteProductService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getFavoriteProducts():Observable<ListResponseModel<FavoriteProductModel>> {
    let newPath=this.apiUrl+"FavoriteProducts/getall"
    return this.httpClient.get<ListResponseModel<FavoriteProductModel>>(newPath);     
  }

  getFavoriteProductsTopx(x:number):Observable<ListResponseModel<ProductCard>> {
    let newPath=this.apiUrl+"FavoriteProducts/GetTopx?x="+x;
    return this.httpClient.get<ListResponseModel<ProductCard>>(newPath);     
  }

  getFavoriteProductsRandomx(x:number):Observable<ListResponseModel<ProductCard>> {
    let newPath=this.apiUrl+"FavoriteProducts/GetRandomx?x="+x;
    return this.httpClient.get<ListResponseModel<ProductCard>>(newPath);     
  }
  addFavoriteProduct(formData:FormData):Observable<ResponseModel<FavoriteProductModel>> {
    let newPath=this.apiUrl+"FavoriteProducts/add";
    return this.httpClient.post<ResponseModel<FavoriteProductModel>>(newPath,formData);     
  }

  delete(formData:FormData):Observable<ResponseModel<FavoriteProductModel>> {
    let newPath=this.apiUrl+"FavoriteProducts/Delete";
    return this.httpClient.post<ResponseModel<FavoriteProductModel>>(newPath,formData);     
  }

  updateFavoriteProduct(formData:FormData):Observable<ResponseModel<FavoriteProductModel>> {
    let newPath=this.apiUrl+"FavoriteProducts/update";
    return this.httpClient.post<ResponseModel<FavoriteProductModel>>(newPath,formData);     
  }
}
