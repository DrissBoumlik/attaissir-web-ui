import { TestBed, inject } from '@angular/core/testing';

import { InterventionService } from './intervention.service';

describe('InterventionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [InterventionService]
        });
    });

    it('should be created', inject([InterventionService], (service: InterventionService) => {
        expect(service).toBeTruthy();
    }));
});
