import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripDialogComponent } from './edit-trip-dialog.component';

describe('EditTripDialogComponent', () => {
  let component: EditTripDialogComponent;
  let fixture: ComponentFixture<EditTripDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTripDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
