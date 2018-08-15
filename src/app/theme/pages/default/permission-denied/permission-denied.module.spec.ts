import { PermissionDeniedModule } from './permission-denied.module';

describe('PermissionDeniedModule', () => {
  let permissionDeniedModule: PermissionDeniedModule;

  beforeEach(() => {
    permissionDeniedModule = new PermissionDeniedModule();
  });

  it('should create an instance', () => {
    expect(permissionDeniedModule).toBeTruthy();
  });
});
