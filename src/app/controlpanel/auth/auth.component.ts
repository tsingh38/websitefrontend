import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { ControlPanelService } from 'src/app/services/controlpanel.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private controlPanelService:ControlPanelService) { }

  ngOnInit() {
  }

  onSubmit(authForm:NgForm){
    if(!authForm.valid){
      return;
    }
   this.controlPanelService.loginUser(authForm.value.username,authForm.value.password).subscribe(response=>{
     console.log(response);
   },error =>{
     console.log(error);
   });
    
    

  }

}
