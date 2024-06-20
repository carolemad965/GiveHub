import { Component, OnInit } from '@angular/core';
import { CharityService } from '../../Services/charityService/charity.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-donor-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './donor-profile.component.html',
  styleUrls: ['./donor-profile.component.css'] // Use styleUrls for CSS
})
export class DonorProfileComponent implements OnInit {

  charity: any; // Maintain flexibility for initial value
charityName:string=""
imageUrl: string | null = null; 
  constructor(private charityService: CharityService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.charityService.getcharityById(id)
        .subscribe(res => {
          this.charity = res;
          console.log(this.charity.message.imageUrl);
          this.imageUrl=this.getFullImageUrl(this.charity.message.imgurl);
          console.log(this.imageUrl);
          this.charityName=this.charity.message.name;
         
        },
        error => {
          console.error('Error fetching charity:', error);
        
        });
    });
  }


  getFullImageUrl(relativePath: string): string {
    return `https://localhost:44377${relativePath}`;
  }
}
