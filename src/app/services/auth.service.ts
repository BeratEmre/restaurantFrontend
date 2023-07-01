import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessTokenModel } from '../models/access-token-model';
import { LoginModel } from '../models/login-model';
import { ResponseModel } from '../models/response-model';

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  

  apiUrl=environment.apiUrl+"Auth/";
  constructor(private httpClient:HttpClient) { }

  getAuthStatus():boolean {
    var token=localStorage.getItem('token');
    if (token==null||token=='') 
      return false;
    console.log(token)
    var url=this.apiUrl+'bringauthority';
     this.httpClient.post<ResponseModel<any>>(url,token).subscribe(r=>{
      console.log(r)  
      console.log(r.success)  
     });
    return true;    
  }
  isThisAdmin(token:string):Observable<ResponseModel<null>>{
    var url=this.apiUrl+'bringauthority?token='+token;
    return this.httpClient.post<ResponseModel<null>>(url,null);
  }

  login(loginModel:LoginModel):Observable<ResponseModel<AccessTokenModel>>{
    var url=this.apiUrl+'login';
    return this.httpClient.post<ResponseModel<AccessTokenModel>>(url,loginModel);
  }
}
