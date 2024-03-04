import { TestBed } from '@angular/core/testing';

import { AssignedToService } from './assigned-to.service';

describe('AssignedToService', () => {
  let service: AssignedToService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedToService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
