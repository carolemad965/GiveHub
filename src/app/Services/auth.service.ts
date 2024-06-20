import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData:any;
  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  setRegister(userData:any):Observable<any>{
      return this._HttpClient.post(`https://localhost:44377/api/Account/register`,userData);
    
  }

  setLogIn(userData:any):Observable<any>
  {
    return this._HttpClient.post(`https://localhost:44377/api/Account/log-in`, userData)
  }

  decodeUserData()
  {
    if(localStorage.getItem('eToken') !=null)
      {
        let encodeToken:any = localStorage.getItem('eToken');
        let decodeToken= jwtDecode(encodeToken);
        this.userData=decodeToken;
console.log(decodeToken);

let userId=this.getUserId();
console.log(userId);
      }
  }




  getUserId(): string | null {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken: JwtPayload & { [key: string]: any } = jwtDecode(token);
      return decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    }
    return null;
  }

  logOut():void{
    localStorage.removeItem('eToken');
    //localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}


