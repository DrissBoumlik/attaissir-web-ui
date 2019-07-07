import { InterventionsModule } from './interventions.module';

describe('InterventionsModule', () => {
    let interventionsModule: InterventionsModule;

    beforeEach(() => {
        interventionsModule = new InterventionsModule();
    });

    it('should create an instance', () => {
        expect(interventionsModule).toBeTruthy();
    });
});
