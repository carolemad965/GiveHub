import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  constructor(private _httpclient:HttpClient) { }

getAccountID(name:string)
{
  let id=this._httpclient.get<string>(`https://localhost:44377/api/Donor/getAccountID/${name}`);
   console.log("the id is ",id)
    return id;

}

createDonor(donor:any){
  return this._httpclient.post(`https://localhost:44377/api/Donor`,donor);
}

getDonorID(id:string)
  {
    return this._httpclient.get<number>(`https://localhost:44377/api/Donor/getDonorId/${id}`);
  }
  
  getDonorDetails(userId:string):Observable<any>
  {
    return this._httpclient.get<string>(`https://localhost:44377/api/Donor/GetDonorDetails/${userId}`);
  }

}
