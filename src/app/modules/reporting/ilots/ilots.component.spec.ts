import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlotsComponent } from './ilots.component';

describe('IlotsComponent', () => {
    let component: IlotsComponent;
    let fixture: ComponentFixture<IlotsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IlotsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IlotsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
