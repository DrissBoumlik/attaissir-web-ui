import { TestBed, inject } from '@angular/core/testing';

import { MouvementsService } from './mouvements.service';

describe('MouvementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MouvementsService]
    });
  });

  it('should be created', inject([MouvementsService], (service: MouvementsService) => {
    expect(service).toBeTruthy();
  }));
});
