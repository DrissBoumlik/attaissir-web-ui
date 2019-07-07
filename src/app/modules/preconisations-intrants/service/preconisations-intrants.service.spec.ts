import { TestBed, inject } from '@angular/core/testing';

import { PreconisationsIntrantsService } from './preconisations-intrants.service';

describe('PreconisationsServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PreconisationsIntrantsService]
        });
    });

    it('should be created', inject([PreconisationsIntrantsService], (service: PreconisationsIntrantsService) => {
        expect(service).toBeTruthy();
    }));
});
