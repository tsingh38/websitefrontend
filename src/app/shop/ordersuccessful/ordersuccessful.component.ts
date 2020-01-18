import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from '../customer-information/CustomerOrderService';


@Component({
  selector: 'app-ordersuccessful',
  templateUrl: './ordersuccessful.component.html',
  styleUrls: ['./ordersuccessful.component.scss']
})
export class OrdersuccessfulComponent implements OnInit {

  orderNumber:number;
  constructor(private customerOrderService:CustomerOrderService) { }

  ngOnInit() {
    this.orderNumber=this.customerOrderService.fetchCompletedOrderNumber();
  }

}
