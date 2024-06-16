import { Component } from '@angular/core';
import { AuthNavbarComponent } from '../auth-navbar/auth-navbar.component';

@Component({
  selector: 'app-home-auth',
  standalone: true,
  imports: [AuthNavbarComponent],
  templateUrl: './home-auth.component.html',
  styleUrl: './home-auth.component.css'
})
export class HomeAuthComponent {

}
