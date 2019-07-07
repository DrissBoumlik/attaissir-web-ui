import { ThirdsModule } from './thirds.module';

describe('ThirdsModule', () => {
    let thirthsModule: ThirdsModule;

    beforeEach(() => {
        thirthsModule = new ThirdsModule();
    });

    it('should create an instance', () => {
        expect(thirthsModule).toBeTruthy();
    });
});
