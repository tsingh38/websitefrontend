import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from '../customer-information/CustomerOrderService';


@Component({
  selector: 'app-ordersuccessful',
  templateUrl: './ordersuccessful.component.html',
  styleUrls: ['./ordersuccessful.component.scss']
})
export class OrdersuccessfulComponent implements OnInit {

  orderNumber:number;
  errorMode:boolean;
  error:string;
  constructor(private customerOrderService:CustomerOrderService) { }

  ngOnInit() {
    this.customerOrderService.orderSubmission.subscribe(res=>{
    this.errorMode=!res.isSuccessful;
    this.orderNumber=res.orderNumber;
    this.error=res.error;
    this.customerOrderService.resetOrderOnceSubmitted();
    })
  ;
  }

 

}
