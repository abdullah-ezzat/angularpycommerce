import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditProductSpecificationComponent } from './edit-product-specification.component';

describe('EditSpecificationComponent', () => {
  let component: EditProductSpecificationComponent;
  let fixture: ComponentFixture<EditProductSpecificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditProductSpecificationComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
