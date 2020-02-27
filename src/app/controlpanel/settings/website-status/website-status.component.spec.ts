import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteStatusComponent } from './website-status.component';

describe('WebsiteStatusComponent', () => {
  let component: WebsiteStatusComponent;
  let fixture: ComponentFixture<WebsiteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
