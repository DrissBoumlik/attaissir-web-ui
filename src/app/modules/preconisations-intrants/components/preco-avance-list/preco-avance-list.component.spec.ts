import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoAvanceListComponent } from './preco-avance-list.component';

describe('PrecoAvanceListComponent', () => {
  let component: PrecoAvanceListComponent;
  let fixture: ComponentFixture<PrecoAvanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrecoAvanceListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecoAvanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
