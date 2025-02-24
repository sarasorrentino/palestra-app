import { TestBed } from '@angular/core/testing';

import { StatsStorageService } from './stats-storage.service';

describe('StatsStorageService', () => {
  let service: StatsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});