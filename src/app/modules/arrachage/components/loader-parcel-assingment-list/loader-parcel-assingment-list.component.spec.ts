import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderParcelAssingmentListComponent } from './loader-parcel-assingment-list.component';

describe('LoaderParcelAssingmentListComponent', () => {
  let component: LoaderParcelAssingmentListComponent;
  let fixture: ComponentFixture<LoaderParcelAssingmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderParcelAssingmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderParcelAssingmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
