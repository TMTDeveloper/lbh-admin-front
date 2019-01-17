import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UserMasterRoutes } from './user.master.routing';
import { UserMasterComponent,ButtonViewComponent } from './user/user.master.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserMasterRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  declarations: [UserMasterComponent,ButtonViewComponent],
  entryComponents:[ButtonViewComponent]
})
export class UserMasterModule {}
