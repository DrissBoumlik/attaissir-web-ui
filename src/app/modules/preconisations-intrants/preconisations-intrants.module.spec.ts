import { PreconisationsIntrantsModule } from './preconisations-intrants.module';

describe('PreconisationsIntrantsModule', () => {
    let preconisationsIntrantsModule: PreconisationsIntrantsModule;

    beforeEach(() => {
        preconisationsIntrantsModule = new PreconisationsIntrantsModule();
    });

    it('should create an instance', () => {
        expect(preconisationsIntrantsModule).toBeTruthy();
    });
});
