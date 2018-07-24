import { TestBed, inject } from '@angular/core/testing';

import { SoilsService } from './soils.service';

describe('SoilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoilsService]
    });
  });

  it('should be created', inject([SoilsService], (service: SoilsService) => {
    expect(service).toBeTruthy();
  }));
});
