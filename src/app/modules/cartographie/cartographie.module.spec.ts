import { CartographieModule } from './cartographie.module';

describe('CartographieModule', () => {
  let cartographieModule: CartographieModule;

  beforeEach(() => {
    cartographieModule = new CartographieModule();
  });

  it('should create an instance', () => {
    expect(cartographieModule).toBeTruthy();
  });
});
