import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpUrlEncodingCodec
} from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable, Subscriber } from "rxjs/Rx";
import { User } from "./auth.service";
import { Credentials } from "./credential";
import { subscribeTo, rxSubscriber } from "rxjs/internal-compatibility";
export class MyCustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeKey(k: string): string {
    return super
      .encodeKey(k)
      .replace(new RegExp("%5B", "g"), "[")
      .replace(new RegExp("%5D", "g"), "]");
  }
}
@Injectable()
export class HttpServ {
  // baseurlxpay:string='http://202.158.20.141:5001/xpay-service/api/'

  baseurl: string = "http://178.128.212.2:3003/";
  currentUser: User;
  //178.128.212.2:3003

  constructor(public http: HttpClient, public creds: Credentials) {}

  public getreq(url: string, auth: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Basic " + auth
    });

    return this.http.get(this.baseurl + url, { headers: headers });
  }

  public postreq(url: string, body: any, auth: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Basic " + auth
    });

    return this.http.post(this.baseurl + url, body, { headers: headers });
  }

  public postuploadreq(url: string, body: any, auth: string) {
    const headers = new HttpHeaders({
      Authorization: "Basic " + auth
    });

    return this.http.post(this.baseurl + url, body, { headers: headers });
  }
  public patchreq(url: string, body: any, auth: string, param?: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Basic " + auth
    });
    console.log(param);
    let params = new HttpParams({
      encoder: new MyCustomHttpUrlEncodingCodec(),
      fromObject: param
    });
    console.log(params.toString());
    return this.http.patch(this.baseurl + url, body, {
      headers: headers,
      params: params
    });
  }

  public validateAuth(credentials) {
    return Observable.create(observer => {
      // At this point make a request to your backend to make a real check!
      let encrypt = btoa(credentials.email + ":" + credentials.password);
      //console.log("enctyption: " + encrypt.toString());
      console.log(encrypt);
      // GET from server
      this.getreqAuth("loginadmin", encrypt).subscribe(
        response => {
          console.log(response);
          if (response != null) {
            console.log("got response");
            //console.log(this.posts);
            let resp: any = response;
            localStorage.setItem("cred", JSON.stringify(resp));
            localStorage.setItem("token", encrypt);
            //   let access = this.validateCredentials(credentials, resp);
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        },
        error => {
          console.log(error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  validateCredentials(credentials, posts: any[]) {
    let name = posts[0];
    let email = posts[1];
    let role = posts[2];
    let password = posts[3];

    this.creds.set(posts);
    this.creds.log();

    return credentials.password === password && credentials.email === email;
  }

  private getreqAuth(url: string, auth: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Basic " + auth
    });

    return this.http.get(this.baseurl + url, { headers: headers });
  }
}
