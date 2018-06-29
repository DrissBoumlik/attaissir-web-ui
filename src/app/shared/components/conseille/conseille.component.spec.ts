import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConseilleComponent } from './conseille.component';

describe('ConseilleComponent', () => {
  let component: ConseilleComponent;
  let fixture: ComponentFixture<ConseilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConseilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConseilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
