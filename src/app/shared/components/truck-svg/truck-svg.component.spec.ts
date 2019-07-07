import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckSvgComponent } from './truck-svg.component';

describe('TruckSvgComponent', () => {
  let component: TruckSvgComponent;
  let fixture: ComponentFixture<TruckSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
