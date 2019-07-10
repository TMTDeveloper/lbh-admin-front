import { Component, ElementRef, ViewChild } from "@angular/core";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { HttpServ } from "../../services/httpreq";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { data } from "../../table/smart-table/smart-data-table";

@Component({
  templateUrl: "./generals.component.html"
})
export class GeneralsComponent {
  source: LocalDataSource = new LocalDataSource();
  cred: any;
  settings = {
    edit: {
      editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
      saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
      cancelButtonContent: '<i class="ti-close text-danger"></i>',
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    },
    mode: "inline",
    sort: true,

    hideSubHeader: false,
    actions: {
      add: true,
      edit: true,
      delete: false,
      position: "left",
      columnTitle: "Modify"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      keyword: {
        title: "Keyword",
        type: "string",
        filter: true,
        editable: true
      },
      value_keyword: {
        title: "Value ",
        type: "string",
        filter: false,
        editable: true
      },
      active: {
        title: "Flag Active",
        type: "html",
        filter: false,
        valuePrepareFunction: value => {
          switch (value) {
            case "Y":
              return "Yes";
            default:
              return "No";
          }
        },
        editor: {
          type: "list",
          config: {
            list: [{ value: "Y", title: "Yes" }, { value: "N", title: "No" }]
          }
        }
      }
    }
  };

  loading: boolean = false;
  data: any;

  constructor(public httpserv: HttpServ, public toastr: ToastrService) {
    this.cred = JSON.parse(window.localStorage.getItem("cred"));
    console.log(this.cred)
  }

  ngAfterViewInit() {
    this.getDataBeginning();
  }

  getDataBeginning() {
    this.httpserv
      .getreq("generals", localStorage.getItem("token"))
      .subscribe(response => {
        if (response) {
          console.log(response);

          this.data = response;
          // this.typeDocumentList = arr;
          this.source.load(this.data);
          this.settings = Object.assign({}, this.settings);
          this.source.reset();
        }
      });
  }

  editConfirm(event) {
    console.log("here");
    console.log(event);

    let dataToPatch = event.newData;
    dataToPatch.date_modified = moment().format();
    let filter = {
      "where[and][0][keyword]": dataToPatch.keyword,
      "where[and][1][id_keyword]": dataToPatch.id_keyword
    };

    this.patchData("generals?", dataToPatch, filter).subscribe(response => {
      if (response) {
        this.toastr.success("Pengubahan Data Berhasil");
        event.confirm.resolve(event.newData);
        this.getDataBeginning();
      } else {
        this.toastr.error("Pengubahan Data Gagal");
        event.confirm.reject();
      }
    });
  }

  createConfirm(event) {
    console.log(event);

    let dataToPost = event.newData;
    dataToPost.date_created = moment().format();
    dataToPost.date_modified = moment().format();
    dataToPost.id_keyword = this.countIdKeyword(dataToPost.keyword);
    this.postData("generals", dataToPost).subscribe((response, data) => {
      if (response.status) {
        this.toastr.success("Penambahan Data Berhasil");
        this.getDataBeginning();
        event.confirm.resolve(event.newData);
      } else {
        this.toastr.error("Penambahan Data Gagal");
        event.confirm.reject();
      }
    });
  }

  countIdKeyword(keyword) {
    let arr: any[] = this.data;
    arr.filter(element => {
      return element.keyword == keyword;
    });

    if (arr != null) {
      return arr.length;
    } else {
      return 1;
    }
  }

  patchData(url, data, filter) {
    return Observable.create(observer => {
      this.httpserv
        .patchreq(url, data, localStorage.getItem("token"), filter)
        .subscribe(
          response => {
            console.log(response);
            if (response != null) {
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

  getData(url) {
    return Observable.create(observer => {
      this.httpserv
        .getreq(url, localStorage.getItem("token"))
        .subscribe(response => {
          if (response != null) {
            let arr: any = response;
            arr.forEach(element => {
              element.role = element.role.toString();
              element.organisasi = element.organisasi.toString();
            });
            console.log(response);
            this.data = arr;
            observer.next(true);
            observer.complete();
          }
        });
    });
  }

  postData(url, data) {
    return Observable.create(observer => {
      this.httpserv
        .postuploadreq(url, data, localStorage.getItem("token"))
        .subscribe(
          response => {
            if (response != null) {
              observer.next({ status: true, resp: response });
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
}
