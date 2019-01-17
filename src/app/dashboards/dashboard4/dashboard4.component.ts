import { Component, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  templateUrl: './dashboard4.component.html',
  styleUrls: ['./dashboard4.component.css']
})
export class Dashboard4Component implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() {
    const chart = c3.generate({
      bindto: '#load',
      data: {
        columns: [
          ['Usage', 45],
          ['Space', 15],
          ['CPU', 27]
        ],
        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        title: 'CPU',
        width: 35
      },
      legend: {
        hide: true
      },
      color: {
        pattern: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb']
      }
    });
  }
}
