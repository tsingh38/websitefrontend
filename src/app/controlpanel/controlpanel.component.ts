import { Component, OnInit } from '@angular/core';
import { ControlPanelService } from '../services/controlpanel.service';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {


  step:string;
  constructor(private controlPanelService:ControlPanelService) { }

  ngOnInit()  {
    this.step='step1';
 
  }

  doLogout(){
    this.controlPanelService.processLogout().subscribe(res=>{
    },error=>{

    },()=>{
      console.log('user loggedout');
    localStorage.setItem('token',null);
    });
  }

}
