import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersuccessfulComponent } from './ordersuccessful.component';

describe('OrdersuccessfulComponent', () => {
  let component: OrdersuccessfulComponent;
  let fixture: ComponentFixture<OrdersuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
