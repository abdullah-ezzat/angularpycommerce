import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingProcessComponent } from './shipping-process.component';

describe('ShippingProcessComponent', () => {
  let component: ShippingProcessComponent;
  let fixture: ComponentFixture<ShippingProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
