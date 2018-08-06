import { CardGeneratorModule } from './card-generator.module';

describe('CardGeneratorModule', () => {
  let cardGeneratorModule: CardGeneratorModule;

  beforeEach(() => {
    cardGeneratorModule = new CardGeneratorModule();
  });

  it('should create an instance', () => {
    expect(cardGeneratorModule).toBeTruthy();
  });
});
