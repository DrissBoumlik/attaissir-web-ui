import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyReceptionComponent } from './hourly-reception.component';

describe('HourlyReceptionComponent', () => {
  let component: HourlyReceptionComponent;
  let fixture: ComponentFixture<HourlyReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
