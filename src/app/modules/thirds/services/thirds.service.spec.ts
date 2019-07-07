import { TestBed, inject } from '@angular/core/testing';

import { ThirdsService } from './thirds.service';

describe('ThirdsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThirdsService]
        });
    });

    it('should be created', inject([ThirdsService], (service: ThirdsService) => {
        expect(service).toBeTruthy();
    }));
});
