import { Routes } from '@angular/router';


import { UserMasterComponent } from './user/user.master.component';
export const UserMasterRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserMasterComponent,
        data: {
          title: 'User Management'
        }
      }
    ]
  }
];
