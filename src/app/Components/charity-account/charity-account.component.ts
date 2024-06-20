import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharityService } from '../../Services/charityService/charity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charity-account',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './charity-account.component.html',
  styleUrl: './charity-account.component.css'
})
export class CharityAccountComponent {

 
    selectedFile: any;
    charityData = {  // Change to charityData
      name: '',
      description: '',
      websiteUrl: '',
      imgUrl: '',
    };
    isLoading = false;
    msgError = '';
  
    constructor(private _CharityService: CharityService,  // Use CharityService
                private _Router: Router,
                private authservice: AuthService) {}
  
    ngOnInit() {
      const userId = this.authservice.getUserId();
      console.log(userId);
    
    }
  
    charityForm: FormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      websiteUrl: new FormControl('', [Validators.required]),
      imgUrl: new FormControl('', [Validators.required]),
    });
  
    onFileChange(event: any): void {
      if (event.target.files.length > 0) {
        this.selectedFile = event.target.files[0];
        this.charityForm.patchValue({ imgUrl: this.selectedFile.name });
      }
    }
  

  
    onSubmit() {
      if (this.charityForm.valid && this.selectedFile) {
        const charityData = {
          name: this.charityForm.get('name')?.value,
          description: this.charityForm.get('description')?.value,
          websiteUrl: this.charityForm.get('websiteUrl')?.value,
          imgUrl: this.selectedFile.name,
          applicationUserId:this._CharityService.getAccountID(this.charityForm.get('name')?.value)

        };
  
        console.log("the charity form data", charityData);
  
        this._CharityService.addcharity(charityData).subscribe({  // Use CharityService method
          next: (response) => {
            console.log(response.message);
            this._Router.navigate([`/charity/${response.message.charityId}`]);  // Assuming route structure
          },
          
        });
      }}
    }