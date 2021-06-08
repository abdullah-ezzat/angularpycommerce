import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShippingAgentComponent } from './shipping-agent.component';

describe('ShippingAgentComponent', () => {
  let component: ShippingAgentComponent;
  let fixture: ComponentFixture<ShippingAgentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
