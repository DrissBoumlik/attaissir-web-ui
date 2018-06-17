import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurrentComponent } from './list-current.component';

describe('ListCurrentComponent', () => {
  let component: ListCurrentComponent;
  let fixture: ComponentFixture<ListCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListCurrentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
