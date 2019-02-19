import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { HttpServ } from "../../services/httpreq";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { data } from "../../table/smart-table/smart-data-table";
import { CustomEditorComponent } from "./CustomEditorComponents";
@Component({
  selector: "button-view",
  template: `
    <button
      type="button"
      class="btn btn-rounded btn-outline-danger"
      (click)="onClick()"
    >
      Reset
    </button>
  `
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}
@Component({
  templateUrl: "./user.master.component.html"
})
export class UserMasterComponent {
  typeDocumentList = [];
  source: LocalDataSource = new LocalDataSource();
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
      cancelButtonContent: '<i class="ti-close text-danger"></i>'
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
      name: {
        title: "Nama",
        type: "string",
        filter: true,
        editable: true
      },
      email_login: {
        title: "Email ",
        type: "number",
        filter: true,
        editable: true
      },
      role: {
        title: "Role",
        type: "number",
        filter: false,
        editable: true,
        valuePrepareFunction: value => {
          switch (value) {
            case "1":
              return "Pengacara";
            case "2":
              return "Paralegal";
            case "3":
              return "Admin";
          }
        },
        editor: {
          type: "list",
          config: {
            list: [
              { value: "1", title: "Pengacara" },
              { value: "2", title: "Paralegal" },
              { value: "3", title: "Admin" }
            ]
          }
        }
      },
      password: {
        title: "Password",
        type: "custom",
        editable: false,
        filter: false,
        renderComponent: ButtonViewComponent,
        onComponentInitFunction: instance => {
          instance.save.subscribe(row => {
            let data = row;
            data.password = "password";
            data.role = parseInt(data.role);
            data.organisasi = parseInt(data.organisasi);
            this.patchData("users/reset", row, {
              "where[email_login]": row.email_login
            }).subscribe(response => {
              if (response) {
                this.toastr.success("Password Berhasil di Reset");
              } else {
                this.toastr.error("Password Gagal di Reset");
              }
            });
          });
        }
      },

      sex: {
        title: "Jenis Kelamin",
        type: "number",
        filter: false,
        editable: true,
        valuePrepareFunction: value => {
          switch (value) {
            case 1:
              return "Laki-laki";
            case 2:
              return "Perempuan";
            case 3:
              return "Lainnya";
          }
        },
        editor: {
          type: "list",
          config: {
            list: [
              { value: 1, title: "Laki-laki" },
              { value: 2, title: "Perempuan" },
              { value: 3, title: "Lainnya" }
            ]
          }
        }
      },
      organisasi: {
        title: "Organisasi",
        type: "number",
        filter: false,
        editable: true,
        valuePrepareFunction: value => {
          for (const key in this.typeDocumentList) {
            if (this.typeDocumentList[key].value == value) {
              return this.typeDocumentList[key].title;
            }
          }
        },
        editor: {
          type: "list",
          config: {
            list: this.typeDocumentList
          }
        }
      },

      date_of_birth: {
        title: "Tanggal Lahir",
        type: "string",
        filter: false,
        editable: true,
        valuePrepareFunction: value => {
          return moment(value).format("DD-MM-YYYY");
        },
        editor: {
          type: "custom",
          component: CustomEditorComponent
        }
        //renderComponent: MokaRealisasiDatePicker
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

  data: any;
  constructor(public httpserv: HttpServ, public toastr: ToastrService) {
    // this.source = new LocalDataSource(tableData.data); // create the source
  }
  ngAfterViewInit() {
    this.getUserDataAndGenerals();
  }

  getUserDataAndGenerals() {
    this.getData("users").subscribe(response => {
      console.log(response);
      if (response) {
        console.log(this.data);
        this.source.load(this.data);
        this.httpserv
          .getreq(
            "generals?filter[where][keyword]=organisasi&filter[where][active]=Y",
            localStorage.getItem("token")
          )
          .subscribe(response => {
            if (response) {
              let arr: any;
              arr = response;

              arr.forEach(element => {
                let a = {
                  value: element.id_keyword,
                  title: element.value_keyword
                };
                this.typeDocumentList.push(a);
              });
              // this.typeDocumentList = arr;
              console.log(this.typeDocumentList);
              this.settings = Object.assign({}, this.settings);
              this.source.reset();
            }
          });
      }
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
      this.httpserv.postreq(url, data, localStorage.getItem("token")).subscribe(
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

  editConfirm(event) {
    console.log("here");
    console.log(event);
    if (
      this.checkId(event.newData.email_login) &&
      event.data.email_login != event.newData.email_login
    ) {
      event.confirm.reject();
      return;
    }
    let dataToPatch = event.newData;
    dataToPatch.organisasi = parseInt(dataToPatch.organisasi);
    dataToPatch.role = parseInt(dataToPatch.role);
    console.log(event.newData);
    dataToPatch.date_modified = moment().format();
    dataToPatch.date_of_birth = moment(
      dataToPatch.date_of_birth,
      "DD/MM/YYYY"
    ).format();
    dataToPatch.sex = parseInt(dataToPatch.sex);
    let filter = {
      "where[email]": event.newData.email
    };

    this.patchData("users?", dataToPatch, filter).subscribe(response => {
      if (response) {
        this.toastr.success("Pengubahan Data Berhasil");
        event.confirm.resolve(event.newData);
        this.getUserDataAndGenerals();
      } else {
        this.toastr.error("Pengubahan Data Gagal");
        event.confirm.reject();
      }
    });
  }

  createConfirm(event) {
    console.log(event);
    if (this.checkId(event.newData.email_login)) {
      event.confirm.reject();
      return;
    }
    let dataToPost = event.newData;
    dataToPost.email = dataToPost.email_login;
    dataToPost.organisasi = parseInt(dataToPost.organisasi);
    dataToPost.role = parseInt(dataToPost.role);
    dataToPost.date_created = moment().format();
    dataToPost.date_modified = moment().format();
    dataToPost.session_end = moment().format();
    dataToPost.last_access = moment().format();
    dataToPost.date_of_birth = moment(
      dataToPost.date_of_birth,
      "DD/MM/YYYY"
    ).format();
    dataToPost.sex = parseInt(dataToPost.sex);

    this.postData("users", dataToPost).subscribe((response, data) => {
      if (response.status) {
        console.log(response);
        event.newData.password = response.resp.password;
        this.toastr.success("Penambahan Data Berhasil");
        event.confirm.resolve(event.newData);
        this.getUserDataAndGenerals();
      } else {
        this.toastr.error("Penambahan Data Gagal");
        event.confirm.reject();
      }
    });
  }

  checkId(email: string): boolean {
    let res = false;
    this.data.forEach(element => {
      if (email == element.email_login) {
        this.toastr.warning("Email sudah ada yang sama");
        res = true;
      }
    });
    return res;
  }
  dateReformat(value) {
    let str = value.split("/");
    return str[2] + "-" + str[1] + "-" + str[0];
  }
}
