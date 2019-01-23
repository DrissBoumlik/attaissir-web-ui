import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchantillonnageShowComponent } from './echantillonnage-show.component';

describe('EchantillonnageShowComponent', () => {
    let component: EchantillonnageShowComponent;
    let fixture: ComponentFixture<EchantillonnageShowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EchantillonnageShowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EchantillonnageShowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
