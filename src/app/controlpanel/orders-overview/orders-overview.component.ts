import { Component, OnInit } from '@angular/core';
import { ControlPanelService } from 'src/app/services/controlpanel.service';
import { CustOrderStatus } from 'src/app/models/custOrderStatus.interface';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent implements OnInit {

  private customerOrders:CustOrderStatus[]=[];
  private alive: boolean;
  private interval: number;


  constructor(private controlPanelService:ControlPanelService) {
    this.alive = true;
    this.interval = 20000;
   }

  ngOnInit() {
    this.customerOrders=this.controlPanelService.getAllTheOrders();
    interval( this.interval)
    .subscribe(() => {
    this.customerOrders=this.controlPanelService.getAllTheOrders();
    }); 
  }

  ngOnDestroy(){
    this.alive = false; // switches your TimerObservable off
  }


}
