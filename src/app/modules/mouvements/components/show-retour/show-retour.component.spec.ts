import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRetourComponent } from './show-retour.component';

describe('ShowRetourComponent', () => {
  let component: ShowRetourComponent;
  let fixture: ComponentFixture<ShowRetourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRetourComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
