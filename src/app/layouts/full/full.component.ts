import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  color = 'default';
  showSettings = false;
  showMinisidebar = false;
  showDarktheme = false;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(public router: Router) {}

  ngOnInit() {
    console.log(this.router.url)
    if (this.router.url === '/home') {
      this.router.navigate(['/home/dashboard']);
    }
  }
}