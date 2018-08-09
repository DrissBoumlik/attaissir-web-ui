import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelGridComponent } from './parcel-grid.component';

describe('ParcelGridComponent', () => {
  let component: ParcelGridComponent;
  let fixture: ComponentFixture<ParcelGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
