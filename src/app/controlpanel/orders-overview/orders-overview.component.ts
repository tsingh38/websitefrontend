import { Component, OnInit } from '@angular/core';
import { ControlPanelService } from 'src/app/services/controlpanel.service';
import { CustOrderStatus } from 'src/app/models/custOrderStatus.interface';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { StaticDataService } from 'src/app/models/StaticDataService';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {

  private customerOrders:CustOrderStatus[]=[];
  private alive: boolean;
  private interval: number;
  private orderViewCategory:string[];
  private selectedOrderViewCategory:string;


  constructor(private controlPanelService:ControlPanelService,private staticDataService: StaticDataService) {
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
    this.alive = false; // switches your TimerObservable off
  }

  setCustOrderStatus(selectedValue:string, currentOrder:CustOrderStatus){
    console.log(selectedValue);
   
    currentOrder.status=selectedValue;
    this.controlPanelService.updateOrderStatus(currentOrder,selectedValue);
  }

  eventOrderViewOptionTrigger(event:Event){

    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    this.selectedOrderViewCategory=selectedCategory;
    this.customerOrders=this.controlPanelService.getAllTheOrders(this.selectedOrderViewCategory);
  }


}
