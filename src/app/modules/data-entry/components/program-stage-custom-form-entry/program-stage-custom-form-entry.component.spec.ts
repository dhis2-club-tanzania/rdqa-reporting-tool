import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageCustomFormEntryComponent } from './program-stage-custom-form-entry.component';

describe('ProgramStageCustomFormEntryComponent', () => {
  let component: ProgramStageCustomFormEntryComponent;
  let fixture: ComponentFixture<ProgramStageCustomFormEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramStageCustomFormEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageCustomFormEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
