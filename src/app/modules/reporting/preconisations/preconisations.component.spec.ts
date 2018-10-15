import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreconisationsComponent } from './preconisations.component';

describe('PreconisationsComponent', () => {
  let component: PreconisationsComponent;
  let fixture: ComponentFixture<PreconisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreconisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreconisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
