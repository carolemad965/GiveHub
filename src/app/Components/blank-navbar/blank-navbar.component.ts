import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonorService } from '../../Services/donorService/donor.service';

@Component({
    selector: 'app-blank-navbar',
    templateUrl: './blank-navbar.component.html',
    styleUrl: './blank-navbar.component.css',
    standalone: true,
    imports: [RouterLinkActive, RouterModule, CommonModule, RouterLink]
})
export class BlankNavbarComponent implements OnInit {
  accountType: string | null = null;
  accountId: number | null = null;


  constructor(private _AuthService:AuthService, private donorService:DonorService){}

  ngOnInit() {
    this.accountType = this._AuthService.getUserAccountType();
    console.log('accccount type is', this.accountType);

    const userId = this._AuthService.getUserId();
    console.log("user id in string is => ",userId);

    if(userId){
      this.donorService.getDonorID(userId).subscribe({
        next: (response) => {
          console.log('response is =>>',response);
          this.accountId = response
         
        },
        error: (err) => {
          console.error('Error fetching projects:', err);
        }
      
      })

      }


  }
  logOutUser():void{
    this._AuthService.logOut();
  }

 
}

