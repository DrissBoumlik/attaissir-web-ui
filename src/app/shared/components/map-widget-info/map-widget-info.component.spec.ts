import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWidgetInfoComponent } from './map-widget-info.component';

describe('MapWidgetInfoComponent', () => {
  let component: MapWidgetInfoComponent;
  let fixture: ComponentFixture<MapWidgetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapWidgetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapWidgetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
