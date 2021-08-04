import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificationsComponent } from './view-specifications.component';

describe('ViewSpecificationsComponent', () => {
  let component: ViewSpecificationsComponent;
  let fixture: ComponentFixture<ViewSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
