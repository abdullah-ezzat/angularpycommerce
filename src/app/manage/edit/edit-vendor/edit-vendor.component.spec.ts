import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditVendorComponent } from './edit-vendor.component';

describe('EditVendorComponent', () => {
  let component: EditVendorComponent;
  let fixture: ComponentFixture<EditVendorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
