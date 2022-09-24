import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenModel } from "../models/token.model";

export default class DecodeToken {

    static decode():TokenModel {
        var tokenModel=new TokenModel();
        var jwtHelper=new JwtHelperService();
        var token=localStorage.getItem('token');
        if (token!=null) {
            var decodeToken=JSON.parse(token as string)
            var decodedToken = jwtHelper.decodeToken(decodeToken.token);
            if (decodedToken!=null&&decodedToken!=undefined&& decodedToken!="") {
                tokenModel.email=decodedToken.email;
                tokenModel.firstName=decodedToken.firstName;
                tokenModel.id=decodedToken.id;
            }
        }
         return tokenModel; 
        }
}