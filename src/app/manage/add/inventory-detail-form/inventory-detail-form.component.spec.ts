import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryDetailFormComponent } from './inventory-detail-form.component';

describe('InventoryDetailFormComponent', () => {
  let component: InventoryDetailFormComponent;
  let fixture: ComponentFixture<InventoryDetailFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
