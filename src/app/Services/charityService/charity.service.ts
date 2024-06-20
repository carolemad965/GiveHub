import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private _httpClient:HttpClient) { }
  getAllCharities():Observable<any>
  {
    return this._httpClient.get(`https://localhost:44377/api/charity`);

  }

<<<<<<< HEAD
  getCharityByID(IdInt:Number):Observable<any>
  {
    return this._httpClient.get(`https://localhost:44377/api/charity/getByCharityId/${IdInt}`);

=======

  getcharityById(id:number){
    return this._httpClient.get(`https://localhost:44377/api/charity/getByCharityId/${id}`)
 
  }



  getCharityID(id:string)
  {
    return this._httpClient.get<number>(`https://localhost:44377/api/charity/getCharityID/${id}`);
>>>>>>> 70dfbacb8f946d71367914895d4a58b84b401b93
  }
}
