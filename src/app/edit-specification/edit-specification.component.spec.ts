import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecificationComponent } from './edit-specification.component';

describe('EditSpecificationComponent', () => {
  let component: EditSpecificationComponent;
  let fixture: ComponentFixture<EditSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
