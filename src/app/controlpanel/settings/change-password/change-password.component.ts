import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CredentialsChangeInterface } from 'src/app/models/CredentialsChange.interface';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('f', { static: false }) formRef: NgForm;
  username: string;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  srvMessage: string;
  passwordChangeSuccessfully: boolean;
  showInfotext: boolean;
  success: boolean;
  passwordChangeInProgress: boolean = false;


  passwordDoNotMatch: boolean;
  constructor(private httpService: HttpUtil, private router: Router) { }

  ngOnInit() {
  }


  onSubmit() {
    if (this.formRef.valid) {
      if (this.newPassword !== this.repeatNewPassword) {
        this.passwordDoNotMatch = true;
        this.formRef.resetForm;
        setTimeout(function () {
          this.passwordDoNotMatch = false;
          this.username = "";
          this.password = "";
          this.newPassword = "";
          this.repeatNewPassword = "";
        }.bind(this), 3000);
        return;
      } else {
        this.passwordChangeInProgress = true;
        var credentialsObj: CredentialsChangeInterface = {
          username: this.username,
          password: this.oldPassword,
          newPassword: this.newPassword,
          repeatNewPassword: this.repeatNewPassword
        }
        this.httpService.changeCredentials(credentialsObj).subscribe((res) => {
          this.passwordChangeInProgress = false;
          this.success = true;
          this.showInfotext = true;
          this.srvMessage = "Passwort wurde erfolgreich geändert";
          setTimeout(function () {
            this.showInfotext = false;
          }.bind(this), 3000);
        }, error => {
          this.passwordChangeInProgress = false;
          this.success = false;
          this.showInfotext = true;
          this.srvMessage = "Passwort konnte nicht geändert werden";
          setTimeout(function () {
            this.showInfotext = false;
          }.bind(this), 3000);
        }, () => {
          setTimeout(function () {
            this.router.navigate(['/login']);
          }.bind(this), 5000);
       
        })
      }
    }
  }
}
