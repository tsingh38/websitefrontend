import { ItemOfOrder } from './itemorder.model';

export class customerInformationAndOrderModel{
    address:string;
    pincode:string;
    city:string;
    floor:number;
    customerName:string;
    email:string;
    telefonnummer:string;
    companyname:string;
    wishDeliveryTime:string;
    comment:string;
    paymentType:string;
    order:ItemOfOrder[];

    constructor(address:string,pincode:string,city:string,floor:number,customerName:string,email:string,telefonnummer:string,companyname:string,wishDeliveryTime:string,comment:string,paymentType:string,order:ItemOfOrder[]){
this.address=address;
this.pincode=pincode;
this.city=city;
this.floor=floor;
this.customerName=customerName;
this.email=email;
this.telefonnummer=telefonnummer;
this.companyname=companyname;
this.wishDeliveryTime=wishDeliveryTime;
this.comment=comment;
this.paymentType=paymentType;
this.order=order;
    }
  
  }