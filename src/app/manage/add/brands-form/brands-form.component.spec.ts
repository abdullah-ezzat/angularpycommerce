import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrandsFormComponent } from './brands-form.component';

describe('BrandsFormComponent', () => {
  let component: BrandsFormComponent;
  let fixture: ComponentFixture<BrandsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
