import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolTrstComponent } from './sol-trst.component';

describe('SolTrstComponent', () => {
  let component: SolTrstComponent;
  let fixture: ComponentFixture<SolTrstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolTrstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolTrstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
