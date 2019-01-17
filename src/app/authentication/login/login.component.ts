import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  registerCredentials = { email: "", password: "" };
  hasLogging: boolean = false;
  wrongCred: boolean = false;
  constructor(public router: Router, private auth: AuthService) {}

  ngOnInit() {
    // console.log(window.location.hostname+":"+window.location.port)
  }

  ngAfterViewInit() {
    /* $('#to-recover').on("click", function() {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });*/
  }

  public login() {
    this.auth.login(this.registerCredentials).subscribe(
      allowed => {
        console.log(allowed);
        if (allowed) {
          // this.nav.setRoot(TabsPage);
          this.router.navigate(["home"]);
        } else {
          console.log("masuk ke eror");
          // this.showError("Wrong Username or Password");
          console.log("wrong credentials");
          this.wrongCred = true;
          this.hasLogging = true;
        }
      },
      error => {
        this.wrongCred = true;
        this.hasLogging = true;
      }
    );
  }

  onLoggedin() {
    localStorage.setItem("isLoggedin", "true");
  }
}
