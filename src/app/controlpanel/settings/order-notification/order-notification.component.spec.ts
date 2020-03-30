import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotificationComponent } from './order-notification.component';

describe('OrderNotificationComponent', () => {
  let component: OrderNotificationComponent;
  let fixture: ComponentFixture<OrderNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
