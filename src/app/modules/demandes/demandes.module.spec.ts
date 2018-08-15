import { DemandesModule } from './demandes.module';


describe('DemandesModule', () => {
  let demandesModule: DemandesModule;

  beforeEach(() => {
    demandesModule = new DemandesModule();
  });

  it('should create an instance', () => {
    expect(demandesModule).toBeTruthy();
  });
});
