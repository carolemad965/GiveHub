import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';

@Component({
    selector: 'app-blank-layout',
    templateUrl: './blank-layout.component.html',
    styleUrl: './blank-layout.component.css',
    standalone: true,
    imports: [BlankNavbarComponent, RouterOutlet, FooterComponent]
})
export class BlankLayoutComponent {

}
