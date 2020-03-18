import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-security-customer',
  templateUrl: './data-security-customer.component.html',
  styleUrls: ['./data-security-customer.component.scss']
})
export class DataSecurityCustomerComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  
  }

  onButtonClick(){
    this.close.emit(null);
  }
}
