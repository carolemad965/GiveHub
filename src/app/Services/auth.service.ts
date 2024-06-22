
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  setRegister(userData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:44377/api/Account/register`, userData);
  }

  setLogIn(userData: any): Observable<any> {
    return this._HttpClient.post(`https://localhost:44377/api/Account/log-in`, userData);
  }

  decodeUserData(): void {
    const token = localStorage.getItem('eToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userData = decodedToken;
        console.log('Decoded token:', decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.error('No token found in localStorage.');
    }
  }

  getUserId(): string | null {
    const token = localStorage.getItem('eToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    }
    return null;
  }

  getUserAccountType(): string | null {
    const token = localStorage.getItem('eToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken["AccountType"] || null;
    }
    return null;
  }

  logOut(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }
}