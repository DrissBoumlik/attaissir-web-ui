import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvoationListComponent } from './convoation-list.component';

describe('ConvoationListComponent', () => {
  let component: ConvoationListComponent;
  let fixture: ComponentFixture<ConvoationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvoationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvoationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
