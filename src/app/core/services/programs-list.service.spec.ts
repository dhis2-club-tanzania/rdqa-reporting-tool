import { TestBed } from '@angular/core/testing';

import { ProgramsListService } from './programs-list.service';

describe('ProgramsListService', () => {
  let service: ProgramsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
