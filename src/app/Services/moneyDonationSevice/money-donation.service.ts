import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyDonationService {

  constructor(private _httpClient:HttpClient) { }

  postMoneyDonation(moneyDonation: FormData): Observable<any> {
    return this._httpClient.post(`https://localhost:44377/api/MoneyDonation`, moneyDonation);
  }
}
