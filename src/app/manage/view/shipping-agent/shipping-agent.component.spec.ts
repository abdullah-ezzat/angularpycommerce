import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAgentComponent } from './shipping-agent.component';

describe('ShippingAgentComponent', () => {
  let component: ShippingAgentComponent;
  let fixture: ComponentFixture<ShippingAgentComponent>;

  beforeEach(async(() => {
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
