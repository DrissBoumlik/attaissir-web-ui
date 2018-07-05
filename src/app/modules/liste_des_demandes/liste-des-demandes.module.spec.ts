import { ListeDesDemandesModule } from './liste-des-demandes.module';

describe('ListeDesDemandesModule', () => {
  let listeDesDemandesModule: ListeDesDemandesModule;

  beforeEach(() => {
    listeDesDemandesModule = new ListeDesDemandesModule();
  });

  it('should create an instance', () => {
    expect(listeDesDemandesModule).toBeTruthy();
  });
});
