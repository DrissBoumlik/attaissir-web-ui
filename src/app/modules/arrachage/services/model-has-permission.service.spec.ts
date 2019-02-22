import { TestBed } from '@angular/core/testing';

import { ModelHasPermissionService } from './model-has-permission.service';

describe('ModelHasPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelHasPermissionService = TestBed.get(ModelHasPermissionService);
    expect(service).toBeTruthy();
  });
});
