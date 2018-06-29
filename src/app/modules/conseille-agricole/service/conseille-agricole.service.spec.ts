import { TestBed, inject } from '@angular/core/testing';

import { ConseilleAgricoleService } from './conseille-agricole.service';

describe('ConseilleAgricoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConseilleAgricoleService]
    });
  });

  it('should be created', inject([ConseilleAgricoleService], (service: ConseilleAgricoleService) => {
    expect(service).toBeTruthy();
  }));
});
