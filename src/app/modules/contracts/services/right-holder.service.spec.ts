import { TestBed, inject } from '@angular/core/testing';

import { RightHolderService } from './right-holder.service';

describe('RightHolderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RightHolderService]
    });
  });

  it('should be created', inject([RightHolderService], (service: RightHolderService) => {
    expect(service).toBeTruthy();
  }));
});
