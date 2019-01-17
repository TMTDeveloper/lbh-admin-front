import { Component, AfterViewInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {
  subtitle: string;
  constructor() {
    this.subtitle = 'This is some text within a card block.';
  }
  // This is for the dashboar line chart
  // lineChart
  public lineChartData: Array<any> = [
    { data: [50, 130, 80, 70, 180, 105, 250], label: 'iphone' },
    { data: [80, 100, 60, 200, 150, 100, 150], label: 'ipad' },
    { data: [20, 80, 70, 140, 140, 80, 200], label: 'itouch' }
  ];

  public lineChartLabels: Array<any> = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016'
  ];
  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    {
      // dark grey
      backgroundColor: 'rgba(251,150,120,0.0)',
      borderColor: 'rgba(251,150,120,1)',
      pointBackgroundColor: 'rgba(234,237,242,1)',
      pointBorderColor: 'rgba(251,150,120,1)',
      pointHoverBackgroundColor: 'rgba(251,150,120,1)',
      pointHoverBorderColor: 'rgba(251,150,120,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(171,140,228,0.0)',
      borderColor: 'rgba(171,140,228,1)',
      pointBackgroundColor: 'rgba(171,140,228,1)',
      pointBorderColor: 'rgba(171,140,228,1)',
      pointHoverBackgroundColor: 'rgba(171,140,228,1)',
      pointHoverBorderColor: 'rgba(171,140,228,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(1,192,200,0.0)',
      borderColor: 'rgba(1,192,200,1)',
      pointBackgroundColor: 'rgba(1,192,200,1)',
      pointBorderColor: 'rgba(1,192,200,1)',
      pointHoverBackgroundColor: 'rgba(1,192,200,1)',
      pointHoverBorderColor: 'rgba(1,192,200,1)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // lineChart
  public lineChartData1: Array<any> = [
    { data: [0, 130, 80, 70, 180, 105, 250], label: 'site A' },
    { data: [0, 100, 60, 200, 150, 100, 150], label: 'site B' }
  ];

  public lineChartLabels1: Array<any> = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016'
  ];
  public lineChartOptions1: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      ]
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0 } }
  };
  public lineChartColors1: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(3,169,243,0.1)',
      borderColor: 'rgba(3,169,243,0.1)',
      pointBackgroundColor: 'rgba(3,169,243,0)',
      pointBorderColor: 'rgba(3,169,243,0)',
      pointHoverBackgroundColor: 'rgba(3,169,243,1)',
      pointHoverBorderColor: 'rgba(3,169,243,1)'
    },
    {
      // grey
      backgroundColor: 'rgba(171,140,228,0.1)',
      borderColor: 'rgba(171,140,228,0.1)',
      pointBackgroundColor: 'rgba(171,140,228,0)',
      pointBorderColor: 'rgba(171,140,228,0)',
      pointHoverBackgroundColor: 'rgba(171,140,228,1)',
      pointHoverBorderColor: 'rgba(171,140,228,1)'
    }
  ];
  public lineChartLegend1 = false;
  public lineChartType1 = 'line';

  // Sales Analytics Pie chart
  public pieChartLabels: string[] = ['Sales', 'Earning', 'Cost'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';

  ngAfterViewInit() {
    const sparklineLogin = function() {
      (<any>$('#sparkline3dash')).sparkline([6, 10, 9, 11, 9, 10, 12], {
        type: 'bar',
        height: '144',
        barWidth: '4',
        resize: true,
        barSpacing: '10',
        barColor: 'rgba(255, 255, 255, 0.5)'
      });
      (<any>$('#sparkline2dash')).sparkline([6, 10, 9, 11, 9, 10, 12], {
        type: 'bar',
        height: '154',
        barWidth: '4',
        resize: true,
        barSpacing: '10',
        barColor: '#03a9f3'
      });
    };
    // const sparkResize;

    sparklineLogin();
  }
}
