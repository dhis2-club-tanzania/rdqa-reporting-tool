import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregateCustomFormEntryComponent } from './aggregate-custom-form-entry.component';

describe('AggregateCustomFormEntryComponent', () => {
  let component: AggregateCustomFormEntryComponent;
  let fixture: ComponentFixture<AggregateCustomFormEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregateCustomFormEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregateCustomFormEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
