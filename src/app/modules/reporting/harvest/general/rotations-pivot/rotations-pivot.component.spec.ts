import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationsPivotComponent } from './rotations-pivot.component';

describe('RotationsPivotComponent', () => {
  let component: RotationsPivotComponent;
  let fixture: ComponentFixture<RotationsPivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationsPivotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationsPivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
