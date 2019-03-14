import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyReceptionCdaComponent } from './hourly-reception-cda.component';

describe('HourlyReceptionCdaComponent', () => {
  let component: HourlyReceptionCdaComponent;
  let fixture: ComponentFixture<HourlyReceptionCdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyReceptionCdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyReceptionCdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
