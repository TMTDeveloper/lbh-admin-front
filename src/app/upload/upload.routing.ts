import { Routes } from '@angular/router';


import { UploadDocumentComponent } from './upload/upload.document.component';
export const UploadRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UploadDocumentComponent,
        data: {
          title: 'Upload Document'
        }
      }
    ]
  }
];
