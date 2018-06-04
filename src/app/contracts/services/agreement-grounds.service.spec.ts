import { TestBed, inject } from '@angular/core/testing';

import { AgreementGroundsService } from './agreement-grounds.service';

describe('AgreementGroundsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgreementGroundsService]
    });
  });

  it('should be created', inject([AgreementGroundsService], (service: AgreementGroundsService) => {
    expect(service).toBeTruthy();
  }));
});
