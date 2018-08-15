import { ParcelsModule } from './parcels.module';

describe('ParcelsModule', () => {
  let parcelsModule: ParcelsModule;

  beforeEach(() => {
    parcelsModule = new ParcelsModule();
  });

  it('should create an instance', () => {
    expect(parcelsModule).toBeTruthy();
  });
});
