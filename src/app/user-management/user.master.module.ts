import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormsModule } from '@angular/forms';

import { MyDatePickerModule } from "mydatepicker";
import { UserMasterRoutes } from "./user.master.routing";
import {
  UserMasterComponent,
  ButtonViewComponent
} from "./user/user.master.component";
import { CustomEditorComponent } from "./user/CustomEditorComponents";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserMasterRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    FormsModule
  ],
  declarations: [
    UserMasterComponent,
    ButtonViewComponent,
    CustomEditorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ButtonViewComponent, CustomEditorComponent]
})
export class UserMasterModule {}
