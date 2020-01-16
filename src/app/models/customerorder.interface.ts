import { orderItem } from './orderItem.interface';

export class customerOrder{
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
    order:orderItem[];
}