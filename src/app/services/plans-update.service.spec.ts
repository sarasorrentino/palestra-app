import { TestBed } from '@angular/core/testing';

import { PlansUpdateService } from './plans-update.service';

describe('PlansUpdateService', () => {
  let service: PlansUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
