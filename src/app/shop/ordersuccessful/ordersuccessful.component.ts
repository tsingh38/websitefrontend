import { Component, OnInit } from '@angular/core';
import { CustomerInformationService } from '../customer-information/CustomerInformationService';

@Component({
  selector: 'app-ordersuccessful',
  templateUrl: './ordersuccessful.component.html',
  styleUrls: ['./ordersuccessful.component.scss']
})
export class OrdersuccessfulComponent implements OnInit {

  orderNumber:string;
  constructor(private customerOrderInformation:CustomerInformationService) { }

  ngOnInit() {
    this.orderNumber=this.customerOrderInformation.fetchCompletedOrderNumber();
  }

}
