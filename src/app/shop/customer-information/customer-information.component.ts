import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { CustomerInformationService } from './CustomerInformationService';
import { customerInformationAndOrderModel } from '../../models/customerInformation.model';
import { DeepcopyUtil } from '../../services/Deepcopy';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  customeraddress:string;
  customerpincode:string;
  customerCity:string;
  floor:number;
  customerName:string;
  customerEmail:string;
  phonenumber:string;
  companyname:string;
  comment:string;
  constructor( private router:Router, private customerInformationService:CustomerInformationService) { }
  @ViewChild('f', { static: false }) formRef: NgForm;
  allTimeSlots:string[]=[];
  defaultPaymentType='Bar';
  defaultWishDeliveryTime='So schnell wie möglich';
  
  ngOnInit() {
  this.allTimeSlots=this.customerInformationService.fetchCurrentTimeSlots();
  }

  fetchCurrentTimeSlots(){

  }

  onSubmit() {
    console.log(this.formRef);
    if(this.formRef.valid){
     var  customerInformation:customerInformationAndOrderModel =new customerInformationAndOrderModel(
       this.customeraddress,
      this.customerpincode,
      this.customerCity,
      this.floor,
      this.customerName,
      this.customerEmail,
      this.phonenumber,
      this.companyname,
       this.defaultWishDeliveryTime,
      this.comment,
      this.defaultPaymentType,this.customerInformationService.getCustomerOrder());
      this.customerInformationService.processCustomerOrder(DeepcopyUtil.deepCopy(customerInformation));
      this.router.navigate(['/completed']);
    }
  }

}
