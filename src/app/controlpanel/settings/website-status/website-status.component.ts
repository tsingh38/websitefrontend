import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { WebsiteStatusInterface } from 'src/app/models/websiteStatus.interface';

@Component({
  selector: 'app-website-status',
  templateUrl: './website-status.component.html',
  styleUrls: ['./website-status.component.scss']
})


export class WebsiteStatusComponent implements OnInit {
  @ViewChild('f', { static: false }) formRef: NgForm;
  status: string = 'online';
  showInfotext: boolean = false;
  message: string;
  success: boolean;
  srvMessage: string;
  statusUpdatingInProgress = false;
  constructor(private httpService: HttpUtil) { }

  ngOnInit() {
    this.httpService.getWebsiteStatus().subscribe(res => {
      this.status = res.status ? 'online' : 'offline';
      this.message = res.message;
    }, error => {
      console.log("if error");
    })
  }


  onSubmit() {
    if (this.formRef.valid) {
      this.statusUpdatingInProgress = true;
      console.log(this.status);
      var statusObj: WebsiteStatusInterface = {

        status: this.status === 'Online'?true : false,
        message: this.message,
      }
      this.httpService.updateWebsiteStatus(statusObj).subscribe((res) => {
        this.success = true;
        this.srvMessage = "Webseite Status wurde erfolgreich upgedated";
        setTimeout(function () {
          this.showInfotext = true;
        }.bind(this), 3000);
        this.showInfotext = false;
      }, error => {
        this.success = false;
        this.srvMessage = "website status konnte nicht gespeichert werden";
        setTimeout(function () {
          this.showInfotext = true;
        }.bind(this), 3000);
        setTimeout(function () {
          this.edited = false;
          console.log(this.edited);
        }.bind(this), 3000);
      }, () => {
        this.statusUpdatingInProgress = false;
      })
    }
  }
}
