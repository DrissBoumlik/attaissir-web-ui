import { DistributionCenterModule } from './distribution-center.module';

describe('DistributionCenterModule', () => {
  let distributionCenterModule: DistributionCenterModule;

  beforeEach(() => {
    distributionCenterModule = new DistributionCenterModule();
  });

  it('should create an instance', () => {
    expect(distributionCenterModule).toBeTruthy();
  });
});
