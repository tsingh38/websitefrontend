import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryViewModalComponent } from './order-history-view-modal.component';

describe('OrderHistoryViewModalComponent', () => {
  let component: OrderHistoryViewModalComponent;
  let fixture: ComponentFixture<OrderHistoryViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHistoryViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
