import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPriceComponent } from './edit-price.component';

describe('EditPriceComponent', () => {
  let component: EditPriceComponent;
  let fixture: ComponentFixture<EditPriceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
