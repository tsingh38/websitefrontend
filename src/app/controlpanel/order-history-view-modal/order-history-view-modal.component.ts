import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { customerOrder } from 'src/app/models/customerorder.interface';
import { ControlPanelService } from 'src/app/services/controlpanel.service';

@Component({
  selector: 'app-order-history-view-modal',
  templateUrl: './order-history-view-modal.component.html',
  styleUrls: ['./order-history-view-modal.component.scss']
})
export class OrderHistoryViewModalComponent implements OnInit {
@Input()custorder:customerOrder;
@Output()close=new EventEmitter<void>();
isOpen:boolean=false;
  constructor(private controlPanelService:ControlPanelService) { }

  ngOnInit() { 
    
  }


  onClose(){
    this.close.emit();
  }
}
