import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckLineupComponent } from './truck-lineup.component';

describe('TruckLineupComponent', () => {
  let component: TruckLineupComponent;
  let fixture: ComponentFixture<TruckLineupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckLineupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckLineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
