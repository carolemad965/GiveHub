import { Component } from '@angular/core';
import { CharityService } from '../../Services/charityService/charity.service';
import { ProjectService } from '../../Services/projectService/project.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartModule, Chart } from 'angular-highcharts';
import { CategoryService } from '../../Services/categoryService/category.service';
import { InkindDonationService } from '../../Services/inkind-donationService/inkind-donation.service';
import { MoneyDonationService } from '../../Services/moneyDonationSevice/money-donation.service';
import { BlankNavbarComponent } from '../blank-navbar/blank-navbar.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [RouterModule, CommonModule, ChartModule, BlankNavbarComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  charityId: number | null = null;
  charity: any = null;
  charityName: string = "";
  charityDescription: string = "";
  projects: any[] = [];
  numberOfProjects: number | null = null;
  categories: any[] = [];


  projectsByCategoryChart = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Number of Projects by Category'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Categories'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Projects'
      }
    },
    series: [{
      type: 'bar',
      name: 'Projects',
      data: []
    }]
  });



  fundingVsAmountRaisedChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Funding Goal vs Amount Raised'
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Projects'
      }
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: [{
      type: 'column',
      name: 'Funding Goal',
      data: []
    }, {
      type: 'column',
      name: 'Amount Raised',
      data: []
    }]
  });

  kindDonationChart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Kind Donations'
    },
    series: [{
      type: 'pie',
      name: 'Kind Donations',
      data: []
    }]
  });

  moneyDonationChart = new Chart({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Money Donations'
    },
    series: [{
      type: 'pie',
      name: 'Money Donations',
      data: []
    }]
  });

  constructor(
    private charityService: CharityService,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private inkindDonationService: InkindDonationService,
    private moneyDonationService: MoneyDonationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.charityId = Number(params.get('id'));
      console.log('charity id is ==>', this.charityId);

      this.charityService.getcharityById(this.charityId).subscribe({
        next: (res: any) => {
          this.charityName = res.message.name;
          this.charityDescription = res.message.description;
        },
        error: (err) => {
          console.error('Error fetching charity:', err);
        }
      });

      this.projectService.getAllprojectForCharityId(this.charityId).subscribe({
        next: (res: any) => {
          this.projects = res.message;
          this.numberOfProjects = res.message.length;
          console.log('number of projects is ==>', this.numberOfProjects);

          this.updateProjectsByCategoryChart();
          this.updateFundingVsAmountRaisedChart();
          this.updateKindDonationChart();
          this.updateMoneyDonationChart();
        },
        error: (err) => {
          console.error('Error fetching projects:', err);
        }
      });
    });
  }

  updateProjectsByCategoryChart() {

    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.message;

        const categoryNames: any = [];
        const projectCounts: any = [];

        this.categories.forEach(category => {
          const projectsForCategory = this.projects.filter(project => project.categoryId === category.id);
          categoryNames.push(category.name);
          projectCounts.push(projectsForCategory.length);
        });


        this.projectsByCategoryChart = new Chart({
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Number of Projects by Category'
          },
          xAxis: {
            categories: categoryNames,
            title: {
              text: 'Categories'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of Projects'
            }
          },
          series: [{
            type: 'bar',
            name: 'Projects',
            data: projectCounts,
            color: '#50B848'
          }]
        });
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }


  updateFundingVsAmountRaisedChart() {
    const projectTitles = this.projects.map(project => project.title);
    const fundingGoals = this.projects.map(project => project.fundingGoal);
    const amountsRaised = this.projects.map(project => project.amountRaised);

    this.fundingVsAmountRaisedChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Funding Goal vs Amount Raised'
      },
      xAxis: {
        categories: projectTitles,
        title: {
          text: 'Projects'
        }
      },
      yAxis: {
        title: {
          text: 'Amount'
        }
      },
      series: [{
        type: 'column',
        name: 'Funding Goal',
        data: fundingGoals,
        color: '#008500'
      }, {
        type: 'column',
        name: 'Amount Raised',
        data: amountsRaised,
        color: '#50B848'
      }]
    });
  }

  updateKindDonationChart() {
    if (this.charityId !== null) {
      this.inkindDonationService.getIKindDonationWithCharityId(this.charityId).subscribe({
        next: (res: any) => {
          const inkindDonations = res.message;


          const donationData = inkindDonations.map((donation: any) => ({
            name: donation.projectName,
            value: donation.quantity,
            description: donation.itemDescription
          }));

          console.log('inkinddonation', inkindDonations);

          this.kindDonationChart = new Chart({
            chart: {
              type: 'pie'
            },
            title: {
              text: 'In-Kind Donations Distribution'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.name}</b><br>Quantity: <b>{point.y}</b><br>Description: <b>{point.description}</b>'
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b><br>Quantity: {point.y}<br>Description: {point.description}'
                }
              }
            },
            series: [{
              type: 'pie',
              name: 'Donations',
              data: donationData.map((data: any, index: number) => ({
                name: data.name,
                y: data.value,
                description: data.description,
                color: index % 2 === 0 ? '#50B848' : '#008000'
              }))
            }]

          });
        },
        error: (err) => {
          console.error('Error fetching in-kind donations:', err);
        }
      });
    }
  }


  updateMoneyDonationChart() {
    if (this.charityId !== null) {
      this.moneyDonationService.getMoneyDonationWithCharityId(this.charityId).subscribe({
        next: (res: any) => {
          const moneyDonations = res.message;


          const donationData = moneyDonations.map((donation: any) => ({
            name: donation.projectName,
            y: donation.amount
          }));

          console.log('moneyDonations', moneyDonations);

          this.moneyDonationChart = new Chart({
            chart: {
              type: 'pie'
            },
            title: {
              text: 'Money Donations Distribution'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.name}</b><br>Amount: <b>{point.y}</b>'
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y}'
                }
              }
            },
            series: [{
              type: 'pie',
              name: 'Donations',
              data: donationData.map((data: any, index: number) => ({
                name: data.name,
                y: data.y,
                color: index % 2 === 0 ? '#50B848' : '#008000'
              }))
            }]

          });
        },
        error: (err) => {
          console.error('Error fetching money donations:', err);
        }
      });
    }
  }


  printReport() {
    window.print();
  }

}
