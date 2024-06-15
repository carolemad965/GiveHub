import { Component } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,BlankNavbarComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  selectedFile: any;
  
  constructor(private _ProjectService: ProjectService, private _Router: Router) {}
  
  projectStates = [];
  
  projectForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fundingGoal: new FormControl('', [Validators.required]),
    amountRaised: new FormControl('', [Validators.required]),
    imgPath: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    charityId: new FormControl('', [Validators.required])
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.projectForm.patchValue({ imgPath: this.selectedFile.name });
    }
    console.log(this.selectedFile);
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
      formData.append('imgPath', this.selectedFile); // Append the actual file
      formData.append('state', this.projectForm.get('state')?.value);
      formData.append('charityId', this.projectForm.get('charityId')?.value);
  
      console.log(this.projectForm);
      this._ProjectService.postProject(formData).subscribe({
        next: (response) => {
          console.log(response);
          this._Router.navigate([`/charity/${response.message.charityId}`]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
