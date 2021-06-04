import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditComponent as EditCategoryComponent } from './edit-category.component';

describe('EditComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
