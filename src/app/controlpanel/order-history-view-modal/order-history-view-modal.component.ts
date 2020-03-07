import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { customerOrder } from 'src/app/models/customerorder.interface';
import { ControlPanelService } from 'src/app/services/controlpanel.service';
import { orderItem } from 'src/app/models/orderItem.interface';

@Component({
  selector: 'app-order-history-view-modal',
  templateUrl: './order-history-view-modal.component.html',
  styleUrls: ['./order-history-view-modal.component.scss']
})
export class OrderHistoryViewModalComponent implements OnInit {
@Input()custorder:customerOrder;
@Output()close=new EventEmitter<void>();
totalBestellungSum:number=0;
isOpen:boolean=false;
  constructor(private controlPanelService:ControlPanelService) { }

  ngOnInit() { 
    this.totalBestellungSum=0;
for(let item of this.custorder.order){
  this.totalBestellungSum+=Number(item.totalPrice.toFixed(2));
}
this.totalBestellungSum = Number(this.totalBestellungSum.toFixed(2));
  }


  onClose(){
    this.close.emit();
  }





  getProductOptionDescription(orderItem:orderItem){

      return orderItem.selectedOptionStr;

  }

  getProductAdditionDescription(orderItem:orderItem){
    var additionsDescription="";
  

          if(orderItem.listOfAdditions){
          var counter:number=0;
          additionsDescription="";
            for(let currentAddition of orderItem.listOfAdditions){
              additionsDescription+=currentAddition.additionDescription ;
                if(counter <  orderItem.listOfAdditions.length - 1){
                  additionsDescription+=","
                }
                counter++;
             }
          }
        
      
      return additionsDescription;
  }

  getDecimalFormattedItemPrice(price:number){
    return parseFloat(price + "").toFixed(2);
  }
  
}
