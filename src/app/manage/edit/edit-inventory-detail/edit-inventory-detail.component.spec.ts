import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInventoryDetailComponent } from './edit-inventory-detail.component';

describe('EditInventoryDetailComponent', () => {
  let component: EditInventoryDetailComponent;
  let fixture: ComponentFixture<EditInventoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInventoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInventoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
