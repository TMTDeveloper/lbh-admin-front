
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { local } from "d3";
// import { AuthService } from "./auth.service";
@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    let cred = JSON.parse(window.localStorage.getItem("cred"));

    if (cred.role==3) {
      this.router.navigate(["/home/dashboard"]);
      return false;
    }
    return true;
  }

}
