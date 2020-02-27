import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { ControlPanelService } from 'src/app/services/controlpanel.service';
import { CustOrderStatus } from 'src/app/models/custOrderStatus.interface';
import { interval,Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { StaticDataService } from 'src/app/models/StaticDataService';
import { OrderHistoryViewModalComponent } from '../order-history-view-modal/order-history-view-modal.component';
import { AppViewContainerDirective } from 'src/app/directives/app-view-container.directive';
import { customerOrder } from 'src/app/models/customerorder.interface';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit,OnDestroy {

  @ViewChild(AppViewContainerDirective,{static:false}) viewContainerRef:AppViewContainerDirective;

  private customerOrders:CustOrderStatus[]=[];
  private alive: boolean;
  private interval: number;
  private orderViewCategory:string[];
  private selectedOrderViewCategory:string;
  openHistory=false;
  private closeSub:Subscription;


  constructor(private controlPanelService:ControlPanelService,private staticDataService: StaticDataService,private componentFactoryResolver:ComponentFactoryResolver) {
    this.alive = true;
    this.interval = staticDataService.getIntervalTimeBetweenTheGetOrderRequests();
    this.orderViewCategory=staticDataService.getOrdersViewCategory();
    this.selectedOrderViewCategory='Alle';
   }


  ngOnInit() {
    this.customerOrders=this.controlPanelService.getAllTheOrders(this.selectedOrderViewCategory);
    interval( this.interval)
    .subscribe(() => {
    this.customerOrders=this.controlPanelService.getAllTheOrders(this.selectedOrderViewCategory);
    }); 
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  
  }

  
  setCustOrderStatus(selectedValue:string, currentOrder:CustOrderStatus){   
    currentOrder.status=selectedValue;
    this.controlPanelService.updateOrderStatus(currentOrder,selectedValue);
  }

  eventOrderViewOptionTrigger(event:Event){

    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    this.selectedOrderViewCategory=selectedCategory;
    this.customerOrders=this.controlPanelService.getAllTheOrders(this.selectedOrderViewCategory);
  }


  openProductHistory(currentOrder:CustOrderStatus){
   const orderHistoryView=this.componentFactoryResolver.resolveComponentFactory(OrderHistoryViewModalComponent);
   const viewContainerReff= this.viewContainerRef.viewContainerRef;
   viewContainerReff.clear();
   const compRef= viewContainerReff.createComponent(orderHistoryView);
   compRef.instance.custorder=currentOrder.custOrder;
   this.closeSub= compRef.instance.close.subscribe(()=>{
    this.closeSub.unsubscribe;
    viewContainerReff.clear(); 
  });


  }

  productComment(customerOrder : customerOrder){
    return customerOrder.comment;
  }

  wishDeliveryTime(customerOrder : customerOrder){
    return customerOrder.wishDeliveryTime;
  }

  paymentMethod(customerOrder : customerOrder){
    return customerOrder.paymentType;
  }

}
