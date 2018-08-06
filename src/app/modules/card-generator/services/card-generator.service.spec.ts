import { TestBed, inject } from '@angular/core/testing';

import { CardGeneratorService } from './card-generator.service';

describe('CardGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardGeneratorService]
    });
  });

  it('should be created', inject([CardGeneratorService], (service: CardGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
