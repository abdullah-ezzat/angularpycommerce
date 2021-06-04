import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BsSidebarComponent } from './bs-sidebar.component';

describe('BsSidebarComponent', () => {
  let component: BsSidebarComponent;
  let fixture: ComponentFixture<BsSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
