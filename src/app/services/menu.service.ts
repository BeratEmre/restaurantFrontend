import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/list-response-model';
import { MenuModel } from '../models/menu-model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getMenus():Observable<ListResponseModel<MenuModel>> {
    let newPath=this.apiUrl+"Menus/getMenus"
    return this.httpClient.get<ListResponseModel<MenuModel>>(newPath);     
  }
}
