import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharityService } from '../../Services/charityService/charity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charity-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './charity-account.component.html',
  styleUrls: ['./charity-account.component.css']  // Changed to styleUrls
})
export class CharityAccountComponent {

  id: string = "";
  selectedFile: File | null = null;  // Changed type to File | null
  charityData = {
    name: '',
    description: '',
    websiteUrl: '',
    imgUrl: '',
  };
  isLoading = false;
  msgError = '';

  constructor(private _CharityService: CharityService,
              private _Router: Router,
              private authservice: AuthService) { }

  ngOnInit() {
    this._CharityService.getAccountID("sero").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.error);
      }
    });
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
      // Check if selectedFile is not null before accessing its name property
      if (this.selectedFile) {
        this.charityData.imgUrl = this.selectedFile.name;
      }
    }
  }

  onSubmit() {
    if (this.charityForm.valid && this.selectedFile) {
      const charityData = {
        name: this.charityForm.get('name')?.value,
        description: this.charityForm.get('description')?.value,
        websiteUrl: this.charityForm.get('websiteUrl')?.value,
        imgUrl: this.selectedFile.name
      };

      console.log("the charity form data", charityData);

      this._CharityService.addcharity(charityData).subscribe({
        next: (response) => {
          console.log(response.message);
          this._Router.navigate([`/charity/${response.message.charityId}`]);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
