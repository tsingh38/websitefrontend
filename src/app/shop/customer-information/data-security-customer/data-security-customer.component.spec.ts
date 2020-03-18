import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSecurityCustomerComponent } from './data-security-customer.component';

describe('DataSecurityCustomerComponent', () => {
  let component: DataSecurityCustomerComponent;
  let fixture: ComponentFixture<DataSecurityCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSecurityCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSecurityCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
