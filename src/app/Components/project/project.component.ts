

import { Component } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CharityService } from '../../Services/charityService/charity.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,BlankNavbarComponent,ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  selectedFile: any;
  nweProj: any = {
    title: '',
    description: '',
    fundingGoal: '',
    amountRaised:'0',
    imgPath :'',
    state:'Initiated',
    charityId:'',
    location:'',
    category:''
  };
  id:number=0
  constructor(private _ProjectService: ProjectService, private _Router: Router,private charitySerice:CharityService,private authservice:AuthService) {}
  
 
  ngOnInit() {
    const userId = this.authservice.getUserId();
    console.log(userId);
    if (userId) {
      this.charitySerice.getCharityID(userId).subscribe({
        next: (id: number) => { // Cast the data to number explicitly
          this.nweProj.charityId = id;
         // console.log("Charity ID:", this.nweProj.charityId);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to get charity ID:', err);
        }
      });
    }
  }

  projectStates = [];

  projectForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fundingGoal: new FormControl('', [Validators.required]),
    amountRaised: new FormControl(0, [Validators.required]),
    location: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imgPath: new FormControl('', [Validators.required]),
    state: new FormControl(0, [Validators.required]),
     charityId: new FormControl('')
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.projectForm.patchValue({ imgPath: this.selectedFile.name });
    }

  }

  range(size: number) {
    return Array.from({ length: size }, (_, i) => i);
  }

   getStateLabel(value: number): string {
    switch (value) {
      case 0:
        return 'Initiated';
      case 1:
        return 'Completed';
      case 2:
        return 'InProgress';
      case 3:
        return 'Paused';
      case 4:
        return 'Canceled';
      default:
        return 'Unknown';
    }
  }

  onSubmit() {
    if (this.projectForm.valid && this.selectedFile) {
      const formData = new FormData();
    formData.append('title', this.projectForm.get('title')?.value);
    formData.append('description', this.projectForm.get('description')?.value);
    formData.append('fundingGoal', this.projectForm.get('fundingGoal')?.value);
    formData.append('amountRaised', this.projectForm.get('amountRaised')?.value);
    formData.append('location', this.projectForm.get('location')?.value);
    formData.append('category', this.projectForm.get('category')?.value);
    formData.append('imgPath', this.selectedFile); // Append the actual file
    formData.append('state', this.projectForm.get('state')?.value);
    formData.append('charityId', this.nweProj.charityId); // Include charityId

    console.log("the project form data", formData);
   

  
      this._ProjectService.postProject(formData).subscribe({

        next: (response) => {
          console.log(response.message);
          this._Router.navigate([`/charity/${response.message.charityId}`]);
          
        },
        error: (err: HttpErrorResponse) => {
          if(err.status==400)
            {
              console.log(err);
            }
        }
      });
    }
  }

}
