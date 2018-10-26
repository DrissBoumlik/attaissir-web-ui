import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdaSigaaComponent } from './cda-sigaa.component';

describe('CdaSigaaComponent', () => {
  let component: CdaSigaaComponent;
  let fixture: ComponentFixture<CdaSigaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CdaSigaaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdaSigaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
