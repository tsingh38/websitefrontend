import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { DeepcopyUtil } from '../../services/Deepcopy';
import { Router } from '@angular/router';
import { customerOrder } from 'src/app/models/customerorder.interface';
import { CustomerOrderService } from './CustomerOrderService';


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
  constructor( private router:Router, private customerOrderService:CustomerOrderService) { }
  @ViewChild('f', { static: false }) formRef: NgForm;
  allTimeSlots:string[]=[];
  defaultPaymentType='Bar';
  defaultWishDeliveryTime='So schnell wie möglich';
  
  ngOnInit() {
  this.allTimeSlots=this.customerOrderService.fetchCurrentTimeSlots();
  }

  fetchCurrentTimeSlots(){

  }

  async onSubmit() {
    console.log(this.formRef);
    if(this.formRef.valid){
     var  customerInformation:customerOrder ={
      address: this.customeraddress,
      pincode:this.customerpincode,
      city:this.customerCity,
      floor:this.floor,
      customerName:this.customerName,
      email:this.customerEmail,
      telefonnummer:this.phonenumber,
      companyname:this.companyname,
      wishDeliveryTime:this.defaultWishDeliveryTime,
      comment:this.comment,
      paymentType:this.defaultPaymentType,
      order:this.customerOrderService.getCustomerOrder()}
      console.log("customer order ->"+ customerInformation);
      this.customerOrderService.processCustomerOrder(DeepcopyUtil.deepCopy(customerInformation));
      await this.customerOrderService.delay(500);
      this.router.navigate(['/completed']);
    }
    }
  }


