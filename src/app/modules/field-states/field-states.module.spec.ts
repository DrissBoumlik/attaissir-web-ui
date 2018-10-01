import { FieldStatesModule } from './field-states.module';

describe('FieldStatesModule', () => {
  let fieldStatesModule: FieldStatesModule;

  beforeEach(() => {
    fieldStatesModule = new FieldStatesModule();
  });

  it('should create an instance', () => {
    expect(fieldStatesModule).toBeTruthy();
  });
});
