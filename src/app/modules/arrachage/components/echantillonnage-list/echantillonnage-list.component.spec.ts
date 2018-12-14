import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchantillonnageListComponent } from './echantillonnage-list.component';

describe('EchantillonnageListComponent', () => {
  let component: EchantillonnageListComponent;
  let fixture: ComponentFixture<EchantillonnageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EchantillonnageListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchantillonnageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
