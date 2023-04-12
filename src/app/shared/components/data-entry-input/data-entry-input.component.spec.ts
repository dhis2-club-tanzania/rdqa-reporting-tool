import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryInputComponent } from './data-entry-input.component';

describe('DataEntryInputComponent', () => {
  let component: DataEntryInputComponent;
  let fixture: ComponentFixture<DataEntryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
