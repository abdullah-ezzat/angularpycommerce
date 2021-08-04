import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductSpecificationComponent } from './product-specification.component';

describe('SpecificationFormComponent', () => {
  let component: ProductSpecificationComponent;
  let fixture: ComponentFixture<ProductSpecificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductSpecificationComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
