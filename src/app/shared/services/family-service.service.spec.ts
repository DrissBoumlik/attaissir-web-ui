import { TestBed, inject } from '@angular/core/testing';

import { FamilyServiceService } from './family-service.service';

describe('FamilyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamilyServiceService]
    });
  });

  it('should be created', inject([FamilyServiceService], (service: FamilyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
