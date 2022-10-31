import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramEventsDataComponent } from './program-events-data.component';

describe('ProgramEventsDataComponent', () => {
  let component: ProgramEventsDataComponent;
  let fixture: ComponentFixture<ProgramEventsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramEventsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramEventsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
