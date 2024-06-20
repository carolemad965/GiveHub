import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';

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
  imports: [CommonModule, RouterModule,BlankNavbarComponent, RouterOutlet],
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  projects: any[] = [];
  currentPage: number = 1;
  PagesAvailable: boolean = true;

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects(this.currentPage);
  }

  getProjects(page: number): void {
    this._projectService.getProjectsByPage(page).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message.length > 0) {
          this.projects = response.message;
        
          this.PagesAvailable = response.message.length === 3; 
        } else {
          this.PagesAvailable = false;
        }
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

  onPageChange(page: number): void {
    if (page > 0) {
      this.currentPage = page;
      this.getProjects(page);
    }
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
}
