import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingUserEditComponent } from './shipping-user-edit.component';

describe('ShippingUserEditComponent', () => {
  let component: ShippingUserEditComponent;
  let fixture: ComponentFixture<ShippingUserEditComponent>;

  beforeEach(async(() => {
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
