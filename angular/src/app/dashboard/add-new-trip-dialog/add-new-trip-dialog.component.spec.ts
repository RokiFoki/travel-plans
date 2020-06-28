import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTripDialogComponent } from './add-new-trip-dialog.component';

describe('AddNewTripDialogComponent', () => {
  let component: AddNewTripDialogComponent;
  let fixture: ComponentFixture<AddNewTripDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTripDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
