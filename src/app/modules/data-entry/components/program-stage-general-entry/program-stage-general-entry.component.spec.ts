import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageGeneralEntryComponent } from './program-stage-general-entry.component';

describe('ProgramStageGeneralEntryComponent', () => {
  let component: ProgramStageGeneralEntryComponent;
  let fixture: ComponentFixture<ProgramStageGeneralEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramStageGeneralEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageGeneralEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
