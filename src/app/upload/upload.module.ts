import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReactiveFormsModule } from "@angular/forms";

import { UploadRoutes } from "./upload.routing";
import { UploadDocumentComponent } from "./upload/upload.document.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UploadRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule,
    ReactiveFormsModule
  ],
  declarations: [UploadDocumentComponent]
})
export class UploadModule {}
