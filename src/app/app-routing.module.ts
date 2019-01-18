import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";

export const Approutes: Routes = [
  {
    path: "",
    component: BlankComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./authentication/authentication.module#AuthenticationModule"
      }
    ]
  },
  {
    path: "home",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "./dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: "./dashboards/dashboard.module#DashboardModule"
      },
      {
        path: "starter",
        loadChildren: "./starter/starter.module#StarterModule"
      },
      {
        path: "component",
        loadChildren: "./component/component.module#ComponentsModule"
      },
      { path: "icons", loadChildren: "./icons/icons.module#IconsModule" },
      { path: "forms", loadChildren: "./form/forms.module#FormModule" },
      { path: "tables", loadChildren: "./table/tables.module#TablesModule" },
      { path: "charts", loadChildren: "./charts/charts.module#ChartModule" },
      { path: "user-management", loadChildren: "./user-management/user.master.module#UserMasterModule" },
      { path: "upload", loadChildren: "./upload/upload.module#UploadModule" },
      {
        path: "widgets",
        loadChildren: "./widgets/widgets.module#WidgetsModule"
      },
      {
        path: "extra-component",
        loadChildren:
          "./extra-component/extra-component.module#ExtraComponentsModule"
      },
      { path: "apps", loadChildren: "./apps/apps.module#AppsModule" },
      {
        path: "sample-pages",
        loadChildren: "./sample-pages/sample-pages.module#SamplePagesModule"
      }
    ]
  },

  {
    path: "**",
    redirectTo: "/authentication/404"
  }
];