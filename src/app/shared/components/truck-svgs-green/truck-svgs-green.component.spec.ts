import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckSvgsGreenComponent } from './truck-svgs-green.component';

describe('TruckSvgsGreenComponent', () => {
  let component: TruckSvgsGreenComponent;
  let fixture: ComponentFixture<TruckSvgsGreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckSvgsGreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckSvgsGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
