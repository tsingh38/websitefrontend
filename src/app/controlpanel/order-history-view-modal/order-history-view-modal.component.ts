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
  this.totalBestellungSum+=item.totalPrice;
}
  }


  onClose(){
    this.close.emit();
  }

  productComment(){
    return this.custorder.comment;
  }

  wishDeliveryTime(){
    return this.custorder.wishDeliveryTime;
  }

  paymentMethod(){
    return this.custorder.paymentType;
  }



  /*
<th>Artikel</th>
                <th>Extras</th>
                <th>Anmerkungen</th>
                <th>Wünsch LieferZeit</th>
                <th>Zahlungs Methode</th>

  */
  getProductOptionDescription(orderItem:orderItem){
var OptionDesc="";
    if(orderItem.selectedOption){
      var OptionDesc=orderItem.selectedOption.productOptionDescription;

    }
return OptionDesc;
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

  
}
