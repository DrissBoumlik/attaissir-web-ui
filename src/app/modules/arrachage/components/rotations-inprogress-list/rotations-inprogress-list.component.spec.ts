import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationsInprogressListComponent } from './rotations-inprogress-list.component';

describe('RotationsInprogressListComponent', () => {
  let component: RotationsInprogressListComponent;
  let fixture: ComponentFixture<RotationsInprogressListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationsInprogressListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationsInprogressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
