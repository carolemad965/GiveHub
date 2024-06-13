import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectService } from '../../Services/projectService/project.service';
enum ProjectState {
  Initiated,
  Completed,
  InProgress,
  Paused,
  Canceled
}
@Component({
  selector: 'app-charity',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './charity.component.html',
  styleUrl: './charity.component.css'
})
export class CharityComponent {
  projects: any[] = [];
  charityId: number | null = null;

  constructor(private _projectService:ProjectService, private _route:ActivatedRoute){}

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.charityId = Number(params.get('id')); 
      if (this.charityId !== null) {
        this.getProjects();
      }
    });
    
  }
  getProjects(): void {
    if (this.charityId !== null) {
      this._projectService.getAllprojectForCharityId(this.charityId).subscribe({
        next: (response) => {
         // console.log(response);
          this.projects = response.message;
        },
        error: (err) => {
         // console.log(err);
        }
      });
    }
  }
  convertBinaryToBase64(binary: string): string {
    return `data:image/png;base64,${binary}`;
  }
  getStatusString(state: ProjectState): string {
    switch (state) {
      case ProjectState.Initiated:
        return 'Initiated';
      case ProjectState.Completed:
        return 'Completed';
      case ProjectState.InProgress:
        return 'In Progress';
      case ProjectState.Paused:
        return 'Paused';
      case ProjectState.Canceled:
        return 'Canceled';
      default:
        return 'Unknown';
    }
  }
}
