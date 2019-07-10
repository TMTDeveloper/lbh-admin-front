import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import * as moment from "moment";
import { Cell, DefaultEditor, Editor } from "ng2-smart-table";
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from "mydatepicker";

@Component({
  selector: "date-picker",
  template: `
    <my-date-picker
      name="mydate"
      [(ngModel)]="dateAssignment"
      [options]="myDatePickerOptions"
      (inputFieldChanged)="onInputFieldChanged($event)"
    ></my-date-picker>
  `
})
export class CustomEditorComponent extends DefaultEditor
  implements AfterViewInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: "dd/mm/yyyy"
  };

  public dateAssignment: any = { date: { year: 2009, month: 10, day: 9 } };
  constructor() {
    super();
  }
  onInputFieldChanged(event: IMyInputFieldChanged) {
    this.updateValue(event);
  }
  ngAfterViewInit() {
    if (this.cell.newValue == "") {
      let dateInit = this.cell.getValue();
      console.log(this.cell.newValue)
      console.log(this.cell.getValue());
      this.dateAssignment = {
        date: {
          year: parseInt(dateInit.substring(6, 10)),
          month: parseInt(dateInit.substring(3, 5)),
          day: parseInt(dateInit.substring(0, 2))
        }
      };
    }
  }
  pad(n) {
    return ("00" + n).slice(-2);
  }
  updateValue(event) {
    this.cell.newValue = event.value;
  }
}
