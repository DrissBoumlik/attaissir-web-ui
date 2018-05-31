import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepeaterComponent } from './form-repeater.component';

describe('FormRepeaterComponent', () => {
  let component: FormRepeaterComponent;
  let fixture: ComponentFixture<FormRepeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormRepeaterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRepeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
