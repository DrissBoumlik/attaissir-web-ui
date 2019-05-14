import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PulpDotationsComponent } from './pulp-dotations.component';

describe('PulpDotationsComponent', () => {
  let component: PulpDotationsComponent;
  let fixture: ComponentFixture<PulpDotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulpDotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PulpDotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
