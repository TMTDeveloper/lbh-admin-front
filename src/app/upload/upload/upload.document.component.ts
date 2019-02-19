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
  templateUrl: "./upload.document.component.html"
})
export class UploadDocumentComponent {
  @ViewChild("fileInput") fileInput: ElementRef;
  source: LocalDataSource = new LocalDataSource();
  form: FormGroup;
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
      add: false,
      edit: false,
      delete: true,
      position: "left",
      columnTitle: "Modify"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      originalfilename: {
        title: "File Name ",
        type: "string",
        filter: true,
        editable: true
      },
      size: {
        title: "Size ",
        type: "string",
        filter: false,
        editable: false,
        valuePrepareFunction: value => {
          return (value / 1000000).toFixed(2) + "MB";
        }
      },
      type: {
        title: "Type ",
        type: "string",
        filter: false,
        editable: false,
        valuePrepareFunction: value => {
          return this.getTypeDokumen(value);
        }
      },
      date_upload: {
        title: "Date Upload ",
        type: "string",
        filter: false,
        editable: false,
        valuePrepareFunction: value => {
          return moment(value).format("DD-MM-YYYY hh:mm");
        }
      }
    }
  };

  loading: boolean = false;
  readyToUpload: boolean = false;
  data: any;
  isPDF: boolean = true;
  typeDocumentList = [];
  constructor(
    public httpserv: HttpServ,
    public toastr: ToastrService,
    private fb: FormBuilder
  ) {
    // this.source = new LocalDataSource(tableData.data); // create the source
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      upload: null,
      jenis: [1, Validators.required]
    });
  }

  onFileChange(event) {
    console.log(this.form.get("jenis").value);
    if (
      !event.target.files[0].name.includes(".pdf") &&
      this.form.get("jenis").value == 0
    ) {
      console.log("gagal");
      this.readyToUpload = false;
      this.isPDF = false;
      return;
    } else if (event.target.files.length > 0) {
      this.readyToUpload = true;
      this.isPDF = true;
      let file = event.target.files[0];
      this.form.get("upload").setValue(file);
    }
  }
  clearFile() {
    this.form.get("upload").setValue(null);
    this.fileInput.nativeElement.value = "";
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append("no_post", "document");
    input.append("file", this.form.get("upload").value);
    input.append("type", this.form.get("jenis").value);
    console.log(this.form.get("upload").value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    console.log(this.form.get("jenis").value);
    this.toastr.info("Uploading");
    this.postData("uploadpost", formModel).subscribe(response => {
      let body = {
        where: {
          no_post: "document"
        }
      };

      this.getDataBeginning();
      this.toastr.success("Upload Success");
      this.loading = false;
    });
  }

  deleteConfirm(event) {
    this.toastr.info("Deleting File");
    this.postData("filedelete", event.data).subscribe(
      response => {
        this.toastr.success("File Deleted");
        event.confirm.resolve();
        let body = {
          where: {
            no_post: "document"
          }
        };
        this.postData("findupload", body).subscribe(response => {
          console.log(response);
          if (response) {
            this.data = response.resp;
            this.data.forEach((element, ind) => {
              element.no = ind + 1;
            });
            console.log(this.data);
            this.source.load(this.data);
          }
        });
      },
      error => {
        this.toastr.error("Process Failed");
        event.confirm.reject();
      }
    );
  }

  ngAfterViewInit() {
    this.getDataBeginning();
  }

  getDataBeginning() {
    let body = {
      where: {
        no_post: "document"
      }
    };
    this.postData("findupload", body).subscribe(response => {
      console.log(response);
      if (response) {
        this.data = response.resp;
        this.data.forEach((element, ind) => {
          element.no = ind + 1;
        });
        console.log(this.data);
        this.source.load(this.data);
      }
    });
    this.httpserv
      .getreq(
        "generals?filter[where][keyword]=jenis_dokumen&filter[where][active]=Y",
        localStorage.getItem("token")
      )
      .subscribe(response => {
        if (response) {
          let arr: any;
          arr = response;
          arr.forEach(element => {
            element.value = element.id_keyword;
            element.title = element.value_keyword;
          });
          this.typeDocumentList = arr;
          console.log(this.typeDocumentList);
          this.source.reset();
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
  postDataUpload(url, data) {
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

  getTypeDokumen(value) {
    console.log(value);
    console.log(this.typeDocumentList);
    if (this.typeDocumentList.length == 0) {
      return "";
    } else {
      for (const key in this.typeDocumentList) {
        if (this.typeDocumentList[key].id_keyword == value) {
          return this.typeDocumentList[key].value_keyword;
        }
      }
    }
  }
}
