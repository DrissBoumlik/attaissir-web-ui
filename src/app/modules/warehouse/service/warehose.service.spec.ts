import { TestBed, inject } from '@angular/core/testing';

import { WarehoseService } from './warehose.service';

describe('CommandeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehoseService]
    });
  });

  it('should be created', inject([WarehoseService], (service: WarehoseService) => {
    expect(service).toBeTruthy();
  }));
});
