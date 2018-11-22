import { TestBed } from '@angular/core/testing';

import { ArrachageService } from './arrachage.service';

describe('ArrachageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArrachageService = TestBed.get(ArrachageService);
    expect(service).toBeTruthy();
  });
});
