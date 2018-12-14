import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargementAffectationListComponent } from './chargement-affectation-list.component';

describe('ChargementAffectationListComponent', () => {
  let component: ChargementAffectationListComponent;
  let fixture: ComponentFixture<ChargementAffectationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChargementAffectationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargementAffectationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
