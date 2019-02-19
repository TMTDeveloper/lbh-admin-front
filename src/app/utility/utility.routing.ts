import { Routes } from '@angular/router';


import { GeneralsComponent } from './generals/generals.component';
export const UtilityRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GeneralsComponent,
        data: {
          title: 'General Data'
        }
      }
    ]
  }
];
