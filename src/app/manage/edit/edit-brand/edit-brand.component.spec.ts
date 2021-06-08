import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditBrandComponent } from './edit-brand.component';

describe('EditBrandComponent', () => {
  let component: EditBrandComponent;
  let fixture: ComponentFixture<EditBrandComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
