import { ContractsModule } from './contracts.module';

describe('ContractsModule', () => {
    let contractsModule: ContractsModule;

    beforeEach(() => {
        contractsModule = new ContractsModule();
    });

    it('should create an instance', () => {
        expect(contractsModule).toBeTruthy();
    });
});
