import { customerOrder } from './customerorder.interface';

export class CustOrderStatus{
    custOrder:customerOrder;
    status:String;
    orderDate:String;
    orderTime:String;
    orderNumber:Number;
}