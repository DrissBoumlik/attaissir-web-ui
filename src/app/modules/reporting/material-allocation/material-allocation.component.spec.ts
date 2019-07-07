import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAllocationComponent } from './material-allocation.component';

describe('MaterialAllocationComponent', () => {
  let component: MaterialAllocationComponent;
  let fixture: ComponentFixture<MaterialAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
