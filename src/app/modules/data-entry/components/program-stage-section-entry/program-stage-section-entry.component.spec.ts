import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageSectionEntryComponent } from './program-stage-section-entry.component';

describe('ProgramStageSectionEntryComponent', () => {
  let component: ProgramStageSectionEntryComponent;
  let fixture: ComponentFixture<ProgramStageSectionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramStageSectionEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageSectionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
