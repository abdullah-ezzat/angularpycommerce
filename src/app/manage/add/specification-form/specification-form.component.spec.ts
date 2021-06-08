import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpecificationFormComponent } from './specification-form.component';

describe('SpecificationFormComponent', () => {
  let component: SpecificationFormComponent;
  let fixture: ComponentFixture<SpecificationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
