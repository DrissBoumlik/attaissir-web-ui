import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrossTonnageReceivedComponent } from './gross-tonnage-received.component';

describe('GrossTonnageReceivedComponent', () => {
  let component: GrossTonnageReceivedComponent;
  let fixture: ComponentFixture<GrossTonnageReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrossTonnageReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrossTonnageReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
