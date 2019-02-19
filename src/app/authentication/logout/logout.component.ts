import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-logout",
  template: ""
})
export class LogoutComponent implements OnInit {
  constructor(public router: Router, private auth: AuthService) {}
  ngOnInit() {
 
    localStorage.clear();
    this.router.navigate([""]);
  }
}
