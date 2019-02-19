import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { local } from "d3";
// import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    let validate = localStorage.getItem("validate");

    if (validate == null) {
      console.log(validate);
      this.router.navigate([""]);
      return false;
    }
    return true;
  }

}
