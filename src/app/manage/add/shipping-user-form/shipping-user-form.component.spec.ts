import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShippingUserFormComponent } from './shipping-user-form.component';

describe('ShippingUserFormComponent', () => {
  let component: ShippingUserFormComponent;
  let fixture: ComponentFixture<ShippingUserFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
