import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReactiveFormsModule } from "@angular/forms";

import { UtilityRoutes } from "./utility.routing";
import { GeneralsComponent } from "./generals/generals.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UtilityRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    ReactiveFormsModule
  ],
  declarations: [GeneralsComponent]
})
export class UtilityModule {}
