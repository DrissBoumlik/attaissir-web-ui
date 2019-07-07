import { TestBed, inject } from '@angular/core/testing';

import { FamilyService } from './family-service.service';

describe('FamilyServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FamilyService]
        });
    });

    it('should be created', inject([FamilyService], (service: FamilyService) => {
        expect(service).toBeTruthy();
    }));
});
