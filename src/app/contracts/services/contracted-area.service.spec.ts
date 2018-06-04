import { TestBed, inject } from '@angular/core/testing';

import { ContractedAreaService } from './contracted-area.service';

describe('ContractedAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractedAreaService]
    });
  });

  it('should be created', inject([ContractedAreaService], (service: ContractedAreaService) => {
    expect(service).toBeTruthy();
  }));
});
