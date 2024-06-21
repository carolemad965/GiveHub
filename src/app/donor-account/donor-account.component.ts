import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './donor-account.component.html',
  styleUrl: './donor-account.component.css'
})
export class DonorAccountComponent {


  selectedFile: File | null = null;
  charityData = {
    name: '',
    imgUrl: '',
  };
  isLoading = false;
  msgError = '';

  donorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
  });

  constructor( private _Router: Router) {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.charityData.imgUrl = this.selectedFile.name;
      }
    }
  }

  onSubmit() {
    if (this.donorForm.valid && this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('name', this.donorForm.get('name')?.value);
      formData.append('img', this.selectedFile);

      this.isLoading = true;

      
    }

}}
