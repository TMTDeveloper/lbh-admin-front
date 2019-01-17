import { Component, AfterViewInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.css']
})
export class Dashboard3Component implements AfterViewInit {
  subtitle: string;

  // lineChart
  public lineChartData1: Array<any> = [
    {
      data: [10, 1667, 4912, 3767, 6810, 5670, 4820, 15073, 8087, 10],
      label: 'Iphone'
    }
  ];

  public lineChartLabels1: Array<any> = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019'
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
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors1: Array<any> = [
    {
      backgroundColor: 'rgba(165,217,199,1)',
      borderColor: 'rgba(165,217,199,1)',
      pointBackgroundColor: 'rgba(165,217,199,0)',
      pointBorderColor: 'rgba(165,217,199,1)',
      pointHoverBackgroundColor: 'rgba(165,217,199,1)',
      pointHoverBorderColor: 'rgba(165,217,199,1)'
    }
  ];
  public lineChartLegend1 = false;
  public lineChartType1 = 'line';

  ngAfterViewInit() {
    const sparklineLogin = function() {
      (<any>$('#sparklinedash')).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '30',
        barWidth: '4',
        resize: true,
        barSpacing: '5',
        barColor: '#00c292'
      });
      (<any>$('#sparklinedash2')).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '30',
        barWidth: '4',
        resize: true,
        barSpacing: '5',
        barColor: '#ab8ce4'
      });
      (<any>$('#sparklinedash3')).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '30',
        barWidth: '4',
        resize: true,
        barSpacing: '5',
        barColor: '#03a9f3'
      });
      (<any>$('#sparklinedash4')).sparkline([0, 5, 6, 10, 9, 12, 4, 9], {
        type: 'bar',
        height: '30',
        barWidth: '4',
        resize: true,
        barSpacing: '5',
        barColor: '#fb9678'
      });
    };

    let sparkResize;

    $(window).resize(function(e) {
      clearTimeout(sparkResize);
      sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();
  }
}
