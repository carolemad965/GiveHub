import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Services/projectService/project.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';
import { SharedService } from '../../Services/sharedService/shared.service';
import { CategoryService } from '../../Services/categoryService/category.service';
import { NavWithSearchComponent } from '../nav-with-search/nav-with-search.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';

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
  imports: [
    CommonModule,
    RouterModule,
    BlankNavbarComponent,
    RouterOutlet,
    NavWithSearchComponent,
    FormsModule,
    SearchPipe
  ],
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  projects: any[] = [];
  categories: any[] = [];
  selectedCategoryName: string = '';
  searchTerm: string = '';

  constructor(
    private _projectService: ProjectService,
    private sharedService: SharedService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.message;
      },
      error: (error) => {
        console.error('Failed to fetch categories:', error);
      }
    });
  }

  getProjects(): void {
    if (this.selectedCategoryName) {
      this._projectService.getProjectsByCategory(this.selectedCategoryName).subscribe({
        next: (response) => {
          this.projects = response.message;
        },
        error: (err) => {
          console.error('Error fetching projects:', err);
        }
      });
    } else {
      this._projectService.getAllProjects().subscribe({
        next: (response) => {
          this.projects = response.message;
        },
        error: (err) => {
          console.error('Error fetching projects:', err);
        }
      });
    }
  }

  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }

  onCategoryChange(event: Event): void {
    this.selectedCategoryName = (event.target as HTMLSelectElement).value;
    this.getProjects();
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

  onMoneyDonate(projectId: number, projectTitle: string, charityId: number): void {
    this.sharedService.setProjectId(projectId);
    this.sharedService.setProjectName(projectTitle);
    this.sharedService.setCharityId(charityId);
    this.router.navigate(['/moneyDonation']);
  }

  onInKindDonate(projectId: number, charityId: number, projectName: string): void {
    this.sharedService.setProjectId(projectId);
    this.sharedService.setCharityId(charityId);
    this.sharedService.setProjectName(projectName);
    this.router.navigate(['/inkindDonation']);
  }
}
