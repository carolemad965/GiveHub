import { Component } from '@angular/core';
import { DonorService } from '../../Services/donorService/donor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../Services/donationService/donation.service';
import { error } from 'console';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] 
})
export class ProfileComponent {

  donor:any=null;
  donorName:string=""

  moneyDonation:any=null;
  constructor(private donorService:DonorService,private route:ActivatedRoute,private DonationService:DonationService)
  {

  }




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.donorService.getdonorByID(id).subscribe(
        (res: any) => {
          this.donor = res.message; // Assuming res is of type Donor
         this.donorName=res.message.name;
          console.log(res);
        },
        (error) => {
          console.error('Error fetching donor:', error);
          // Handle the error gracefully (e.g., display an error message)
        }
      );


      
    this.DonationService.getmoneyDonationByDonorID(id).subscribe(

(res:any)=>{
  this.moneyDonation=res.message;
},
(error)=>{
  console.error('Error fetching donor:', error);
         
}


    );



    this.DonationService.getInkindDonationByDonorID(id).subscribe(

      (res:any)=>{
        this.moneyDonation=res.message;
      },
      (error)=>{
        console.error('Error fetching donor:', error);
               
      }
      
      
          );

    });




  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

}