import { CommandeModule } from './commande.module';

describe('CommandeModule', () => {
  let commandeModule: CommandeModule;

  beforeEach(() => {
    commandeModule = new CommandeModule();
  });

  it('should create an instance', () => {
    expect(commandeModule).toBeTruthy();
  });
});
