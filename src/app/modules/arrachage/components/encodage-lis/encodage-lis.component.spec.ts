import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodageLisComponent } from './encodage-lis.component';

describe('EncodageLisComponent', () => {
  let component: EncodageLisComponent;
  let fixture: ComponentFixture<EncodageLisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EncodageLisComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncodageLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
