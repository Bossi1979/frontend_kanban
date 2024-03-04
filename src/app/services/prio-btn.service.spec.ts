import { TestBed } from '@angular/core/testing';

import { PrioBtnService } from './prio-btn.service';

describe('PrioBtnService', () => {
  let service: PrioBtnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrioBtnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
