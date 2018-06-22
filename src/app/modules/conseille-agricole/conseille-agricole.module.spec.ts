import { ConseilleAgricoleModule } from './conseille-agricole.module';

describe('ConseilleAgricoleModule', () => {
  let conseilleAgricoleModule: ConseilleAgricoleModule;

  beforeEach(() => {
    conseilleAgricoleModule = new ConseilleAgricoleModule();
  });

  it('should create an instance', () => {
    expect(conseilleAgricoleModule).toBeTruthy();
  });
});
