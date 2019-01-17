import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as tableData from './smart-data-table';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
@Component({
  selector: 'button-view',
  template: `
    <button class="btn btn-rounded btn-danger" (click)="onClick()">Reset</button>
  `,
})

@Component({
  templateUrl: './smart-table.component.html'
})
export class SmarttableComponent {
  source: LocalDataSource;
 
  constructor() {
    this.source = new LocalDataSource(tableData.data); // create the source
  }

}
