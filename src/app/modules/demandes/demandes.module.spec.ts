import { DemandesModule } from './demandes.module';

describe('DemandesModule', () => {
  let DemandesModule: DemandesModule;

  beforeEach(() => {
    DemandesModule = new DemandesModule();
  });

  it('should create an instance', () => {
    expect(DemandesModule).toBeTruthy();
  });
});
