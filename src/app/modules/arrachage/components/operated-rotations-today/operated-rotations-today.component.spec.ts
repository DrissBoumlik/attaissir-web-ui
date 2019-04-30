import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatedRotationsTodayComponent } from './operated-rotations-today.component';

describe('OperatedRotationsTodayComponent', () => {
  let component: OperatedRotationsTodayComponent;
  let fixture: ComponentFixture<OperatedRotationsTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatedRotationsTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatedRotationsTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
