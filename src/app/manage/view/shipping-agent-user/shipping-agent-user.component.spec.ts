import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShippingAgentUserComponent } from './shipping-agent-user.component';

describe('ShippingAgentUserComponent', () => {
  let component: ShippingAgentUserComponent;
  let fixture: ComponentFixture<ShippingAgentUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAgentUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAgentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
