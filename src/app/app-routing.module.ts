import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";
import { AuthGuardService as AuthGuard } from "./services/authguard";
import { AdminGuardService as AdminGuard } from "./services/adminguard";
export const Approutes: Routes = [
  {
    path: "",
    component: BlankComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./authentication/authentication.module#AuthenticationModule"
      },
      {
        path: "404",
        loadChildren:
          "./authentication/authentication.module#AuthenticationModule"
      }
    ]
  },
  {
    path: "home",
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "./dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadChildren: "./dashboards/dashboard.module#DashboardModule"
      },
      {
        path: "user-management",
        loadChildren: "./user-management/user.master.module#UserMasterModule"
      },
      { path: "upload", loadChildren: "./upload/upload.module#UploadModule" },
      {
        path: "utility",
        loadChildren: "./utility/utility.module#UtilityModule"
      }
    ]
  },
  {
    path: "logout",
    redirectTo: ""
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];
