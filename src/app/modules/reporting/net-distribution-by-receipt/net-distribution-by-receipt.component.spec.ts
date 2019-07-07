import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetDistributionByReceiptComponent } from './net-distribution-by-receipt.component';

describe('NetDistributionByReceiptComponent', () => {
  let component: NetDistributionByReceiptComponent;
  let fixture: ComponentFixture<NetDistributionByReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetDistributionByReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetDistributionByReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
