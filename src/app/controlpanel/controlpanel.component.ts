import { Component, OnInit } from '@angular/core';
import { ControlPanelService } from '../services/controlpanel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {


  step:string;
  constructor(private controlPanelService:ControlPanelService,private router:Router) { }

  ngOnInit()  {
    console.log( this.router.url);
    if(this.router.url=='/control/catalog'){
      this.step='step2';
    }else if(this.router.url=='/control/orders'){
      this.step='step1';
    }
    else if(this.router.url=='/control/websiteStatus' || this.router.url=='/control/orderNotification' ||this.router.url=='/control/changeCredentials'){
      this.step='step3';
    }
 
  }

  doLogout(){
    this.controlPanelService.processLogout().subscribe(res=>{
      this.controlPanelService.isUserLoggedIn=false;
      localStorage.removeItem('token');
      localStorage.clear();
    },error=>{
      this.controlPanelService.isUserLoggedIn=false;
      localStorage.removeItem('token');
      localStorage.clear();
    },()=>{
      localStorage.removeItem('token');
      localStorage.clear();
    });
  }

}
