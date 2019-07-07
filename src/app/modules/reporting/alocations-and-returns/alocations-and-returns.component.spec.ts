import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocationsAndReturnsComponent } from './alocations-and-returns.component';

describe('AlocationsAndReturnsComponent', () => {
  let component: AlocationsAndReturnsComponent;
  let fixture: ComponentFixture<AlocationsAndReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocationsAndReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocationsAndReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
