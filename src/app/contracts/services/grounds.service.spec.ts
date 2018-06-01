import { TestBed, inject } from '@angular/core/testing';

import { GroundsService } from './grounds.service';

describe('GroundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroundsService]
    });
  });

  it('should be created', inject([GroundsService], (service: GroundsService) => {
    expect(service).toBeTruthy();
  }));
});
