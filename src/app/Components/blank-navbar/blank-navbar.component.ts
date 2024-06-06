import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrl: './blank-navbar.component.css'
})
export class BlankNavbarComponent {
  constructor(private _AuthService:AuthService)
  {
  }
  logOutUser():void{
    this._AuthService.logOut();
  }
}

