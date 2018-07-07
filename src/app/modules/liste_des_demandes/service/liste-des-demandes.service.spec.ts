import { TestBed, inject } from '@angular/core/testing';

import { ListeDesDemandesService } from './liste-des-demandes.service';

describe('ListeDesDemandesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListeDesDemandesService]
    });
  });

  it('should be created', inject([ListeDesDemandesService], (service: ListeDesDemandesService) => {
    expect(service).toBeTruthy();
  }));
});
