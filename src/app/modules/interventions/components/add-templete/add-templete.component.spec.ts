import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTempleteComponent } from './add-templete.component';

describe('AddTempleteComponent', () => {
  let component: AddTempleteComponent;
  let fixture: ComponentFixture<AddTempleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTempleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTempleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
