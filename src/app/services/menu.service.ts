import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/list-response-model';
import { MenuModel } from '../models/menu-model';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getMenus():Observable<ListResponseModel<MenuModel>> {
    let newPath=this.apiUrl+"Menus/getall"
    return this.httpClient.get<ListResponseModel<MenuModel>>(newPath);     
  }
  addMenu(formData:FormData):Observable<ResponseModel<MenuModel>> {
    let newPath=this.apiUrl+"Menus/add";
    return this.httpClient.post<ResponseModel<MenuModel>>(newPath,formData);     
  }

  updateMenu(formData:FormData):Observable<ResponseModel<MenuModel>> {
    let newPath=this.apiUrl+"Menus/update";
    return this.httpClient.post<ResponseModel<MenuModel>>(newPath,formData);     
  }

  remove(id: number) {
    let newPath=this.apiUrl+"Menus/Remove?id="+id;
    return this.httpClient.post<ResponseModel<MenuModel>>(newPath,null);
  }

  addStar(menuId:number):Observable<boolean> {
    let newPath=this.apiUrl+"Menus/AddStar?menuId="+menuId;
    return this.httpClient.post<boolean>(newPath,null);     
  }

  getStarMenus():Observable<ListResponseModel<MenuModel>> {
    let newPath=this.apiUrl+"Menus/GetStarMenus"
    return this.httpClient.get<ListResponseModel<MenuModel>>(newPath);     
  }
}