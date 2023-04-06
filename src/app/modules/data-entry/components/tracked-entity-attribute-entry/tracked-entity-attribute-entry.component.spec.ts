import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedEntityAttributeEntryComponent } from './tracked-entity-attribute-entry.component';

describe('TrackedEntityAttributeEntryComponent', () => {
  let component: TrackedEntityAttributeEntryComponent;
  let fixture: ComponentFixture<TrackedEntityAttributeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackedEntityAttributeEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackedEntityAttributeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
