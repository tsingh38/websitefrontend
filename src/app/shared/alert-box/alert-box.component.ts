import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  @Input('messageHeader') headerMessage:string;
  @Input('message') message:string;
  @Output()close=new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  doClose(){
    this.close.emit();
  }
}
