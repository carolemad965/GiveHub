import { Component } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
enum ProjectState {
  Initiated,
  Completed,
  InProgress,
  Paused,
  Canceled
}

@Component({
  selector: 'app-donor',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css'
  
})
export class DonorComponent {
  projects: any[] = [];

  constructor(private _projectService:ProjectService){}

  ngOnInit(): void {
    this.getProjects();
    
  }

  getProjects(): void {
    this._projectService.getAllProjects().subscribe({
      next: (response) => {
        //console.log(response);
        this.projects = response.message;
      },
      error: (err) => {
        //console.log(err);
      }
    });
  }

  getStateString(state: ProjectState): string {
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

  convertBinaryToBase64(binary: string): string {
    return `data:image/png;base64,${binary}`;
  }
}


