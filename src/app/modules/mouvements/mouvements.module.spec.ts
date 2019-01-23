import { MouvementsModule } from './mouvements.module';

describe('MouvementsModule', () => {
    let mouvementsModule: MouvementsModule;

    beforeEach(() => {
        mouvementsModule = new MouvementsModule();
    });

    it('should create an instance', () => {
        expect(mouvementsModule).toBeTruthy();
    });
});
