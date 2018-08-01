import { TestBed, inject } from '@angular/core/testing';

import { WarehouseService } from './warehose.service';

describe('CommandeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseService]
    });
  });

  it('should be created', inject([WarehouseService], (service: WarehouseService) => {
    expect(service).toBeTruthy();
  }));
});
