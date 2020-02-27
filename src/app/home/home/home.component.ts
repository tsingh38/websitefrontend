import { Component, OnInit } from '@angular/core';
import { HttpUtil } from 'src/app/services/httpUtil.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isWebsiteOnline:boolean=false;
  message:string; // in case website ist offline
  constructor(private httpService:HttpUtil) { }

  ngOnInit() {
    this.httpService.getWebsiteStatus().subscribe(res => {
      this.isWebsiteOnline = res.status;
      this.message = res.message;
    }, error => {
      console.log("if error");
    })
  }

 
}
