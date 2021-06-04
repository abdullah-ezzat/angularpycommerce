import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShippingUserEditComponent } from './shipping-user-edit.component';

describe('ShippingUserEditComponent', () => {
  let component: ShippingUserEditComponent;
  let fixture: ComponentFixture<ShippingUserEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
