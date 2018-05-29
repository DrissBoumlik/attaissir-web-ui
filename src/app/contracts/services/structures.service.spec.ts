import { TestBed, inject } from '@angular/core/testing';

import { StructuresService } from './structures.service';

describe('StructuresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StructuresService]
    });
  });

  it('should be created', inject([StructuresService], (service: StructuresService) => {
    expect(service).toBeTruthy();
  }));
});
