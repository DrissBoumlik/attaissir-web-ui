import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidCardReaderComponent } from './rfid-card-reader.component';

describe('RfidCardReaderComponent', () => {
  let component: RfidCardReaderComponent;
  let fixture: ComponentFixture<RfidCardReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RfidCardReaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidCardReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
