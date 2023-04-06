import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryFormContainerComponent } from './data-entry-form-container.component';

describe('DataEntryFormContainerComponent', () => {
  let component: DataEntryFormContainerComponent;
  let fixture: ComponentFixture<DataEntryFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
