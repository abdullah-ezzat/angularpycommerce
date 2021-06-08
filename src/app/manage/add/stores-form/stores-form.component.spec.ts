import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StoresFormComponent } from './stores-form.component';

describe('StoresFormComponent', () => {
  let component: StoresFormComponent;
  let fixture: ComponentFixture<StoresFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
