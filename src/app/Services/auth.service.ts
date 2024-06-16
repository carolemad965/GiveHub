import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
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
      }
  }

  logOut():void{
    localStorage.removeItem('eToken');
    //localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}


