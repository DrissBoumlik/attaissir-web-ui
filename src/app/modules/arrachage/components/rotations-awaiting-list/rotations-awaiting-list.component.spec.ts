import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationsAwaitingListComponent } from './rotations-awaiting-list.component';

describe('RotationsAwaitingListComponent', () => {
  let component: RotationsAwaitingListComponent;
  let fixture: ComponentFixture<RotationsAwaitingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationsAwaitingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationsAwaitingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
