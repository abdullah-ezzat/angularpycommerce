import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShippingAgentsEditComponent } from './shipping-agents-edit.component';

describe('ShippingAgentsEditComponent', () => {
  let component: ShippingAgentsEditComponent;
  let fixture: ComponentFixture<ShippingAgentsEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingAgentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAgentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
