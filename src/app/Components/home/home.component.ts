import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CharityComponent } from '../charity/charity.component';
import { DonorComponent } from '../donor/donor.component';
import { CharitiesComponent } from '../charities/charities.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterLink, RouterLinkActive,CharityComponent,DonorComponent,CharitiesComponent],
    standalone: true
})
export class HomeComponent {

}
