import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-auth-navbar',
    templateUrl: './auth-navbar.component.html',
    styleUrl: './auth-navbar.component.css',
    standalone: true,
    imports: [RouterLink, RouterLinkActive]
})
export class AuthNavbarComponent {

}
