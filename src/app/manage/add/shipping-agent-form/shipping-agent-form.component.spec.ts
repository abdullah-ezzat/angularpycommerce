import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShippingAgentFormComponent } from './shipping-agent-form.component';

describe('ShippingAgentFormComponent', () => {
  let component: ShippingAgentFormComponent;
  let fixture: ComponentFixture<ShippingAgentFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAgentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
