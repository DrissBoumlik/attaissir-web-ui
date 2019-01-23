import { ArrachageModule } from './arrachage.module';

describe('ArrachageModule', () => {
    let arrachageModule: ArrachageModule;

    beforeEach(() => {
        arrachageModule = new ArrachageModule();
    });

    it('should create an instance', () => {
        expect(arrachageModule).toBeTruthy();
    });
});
