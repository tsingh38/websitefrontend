import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { ControlPanelService } from 'src/app/services/controlpanel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoading=false;
  error:string=null;
  constructor(private controlPanelService:ControlPanelService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(authForm:NgForm){
    if(!authForm.valid){
      return;
    }
    this.isLoading=true;
   this.controlPanelService.loginUser(authForm.value.username,authForm.value.password).subscribe(response=>{
     console.log(response);
     this.isLoading=false;
   },error =>{
     this.error="Falsche Benutzer Name oder Passwort!";
     this.isLoading=false;
   },
   () => {
     this.router.navigate(['/control']);
   });
    
    

  }

}