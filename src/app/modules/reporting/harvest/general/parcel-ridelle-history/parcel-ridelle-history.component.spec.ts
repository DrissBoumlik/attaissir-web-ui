import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelRidelleHistoryComponent } from './parcel-ridelle-history.component';

describe('ParcelRidelleHistoryComponent', () => {
  let component: ParcelRidelleHistoryComponent;
  let fixture: ComponentFixture<ParcelRidelleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelRidelleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelRidelleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
