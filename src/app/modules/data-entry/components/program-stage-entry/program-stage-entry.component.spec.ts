import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageEntryComponent } from './program-stage-entry.component';

describe('ProgramStageEntryComponent', () => {
  let component: ProgramStageEntryComponent;
  let fixture: ComponentFixture<ProgramStageEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramStageEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
