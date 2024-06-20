import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-blank-navbar',
    templateUrl: './blank-navbar.component.html',
    styleUrl: './blank-navbar.component.css',
    standalone: true,
    imports: [RouterLinkActive]
})
export class BlankNavbarComponent {
  constructor(private _AuthService:AuthService)
  {
  }
  logOutUser():void{
    this._AuthService.logOut();
  }

  ngOnInit() {


  }
}

