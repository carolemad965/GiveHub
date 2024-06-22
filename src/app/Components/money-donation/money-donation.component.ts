import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoneyDonationService } from '../../Services/moneyDonationSevice/money-donation.service';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { SharedService } from '../../Services/sharedService/shared.service';
import { DonorService } from '../../Services/donorService/donor.service';

@Component({
  selector: 'app-money-donation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, BlankNavbarComponent],
  templateUrl: './money-donation.component.html',
  styleUrls: ['./money-donation.component.css']
})
export class MoneyDonationComponent implements OnInit {
  moneyDonation: any = {
    donationDate: '',
    donorId: '',
    
    projectId: '',
    charityId: '',
    amount: '',
    paymentMethod: ''
  };

  constructor(
    private donorService: DonorService,
    private authService: AuthService,
    private moneyDonationService: MoneyDonationService,
    private sharedService: SharedService,
    
  ) {}

  donationForm: FormGroup = new FormGroup({
    donationDate: new FormControl('', [Validators.required]),
    donorId: new FormControl(0, [Validators.required]),
   
    projectId: new FormControl(''),
    charityId: new FormControl(''),
    amount: new FormControl(0, [Validators.required]),
    paymentMethod: new FormControl('')
  });

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    console.log(' donor id:', userId);
    
    if (userId) {
      this.donorService.getDonorID(userId).subscribe({
        next: (id: number) => {
          this.moneyDonation.donorId = id;
          this.donationForm.get('donorId')?.setValue(id); // Set donor ID in form control
          console.log("donor id:", id);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to get donor ID:', err);
        }
      });
    }

    const projectId = this.sharedService.getProjectId();
    if (projectId !== null) {
      this.moneyDonation.projectId = projectId;
      this.donationForm.get('projectId')?.setValue(projectId); 
      console.log('project iiid here:', projectId);
    }

    const charityId = this.sharedService.getCharityId();
    if (charityId !== null) {
      this.moneyDonation.charityId = charityId;
      this.donationForm.get('charityId')?.setValue(charityId); 
      console.log('charity iiid here:', charityId);
    }

   
  }



  onSubmit() {
    if (this.donationForm.valid) {
      const donationData = {
        donationDate: this.donationForm.get('donationDate')?.value,
        donorId: this.donationForm.get('donorId')?.value,
        projectId: this.donationForm.get('projectId')?.value,
        charityId: this.donationForm.get('charityId')?.value,
        amount: this.donationForm.get('amount')?.value,
        paymentMethod: this.donationForm.get('paymentMethod')?.value
      };
  
      
  
      this.moneyDonationService.postMoneyDonation(donationData).subscribe({
        next: (response) => {
          console.log('Done', response.message);
          console.log("donation data is ", donationData);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 400) {
            console.log('Error:', err.error);
          }
        }
      });
    }
  }
  

//  => this part if we want to pass form data but in back end json return  (unsupported media type error)



  // onSubmit() {
  //   if (this.donationForm.valid) {
  //     const formData = new FormData();
  //     formData.append('donationDate', this.donationForm.get('donationDate')?.value);
  //     formData.append('amount', this.donationForm.get('amount')?.value);
  //     formData.append('paymentMethod', this.donationForm.get('paymentMethod')?.value);
  //     formData.append('charityId', this.donationForm.get('charityId')?.value);
  //     formData.append('projectId', this.donationForm.get('projectId')?.value);

  //     console.log("Form Data:", formData);

  //     this.moneyDonationService.postMoneyDonation(formData).subscribe({
  //       next: (response) => {
  //         console.log('Donation successful:', response.message);
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         if (err.status == 400) {
  //           console.log('error iiiis',err.error);
  //         }
  //       }
  //     });
  //   }
  // }

  
}