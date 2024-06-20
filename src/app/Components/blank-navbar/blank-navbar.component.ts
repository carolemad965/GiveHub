import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-blank-navbar',
    templateUrl: './blank-navbar.component.html',
    styleUrl: './blank-navbar.component.css',
    standalone: true,
    imports: [RouterLinkActive, RouterModule, CommonModule, RouterLink]
})
export class BlankNavbarComponent implements OnInit {
  accountType: string | null = null;

  constructor(private _AuthService:AuthService){}

  ngOnInit() {
    this.accountType = this._AuthService.getUserAccountType();

  }
  logOutUser():void{
    this._AuthService.logOut();
  }

 
}

