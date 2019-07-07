import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-truck-svg',
    templateUrl: './truck-svg.component.html',
    styleUrls: ['./truck-svg.component.scss']
})
export class TruckSvgComponent implements OnInit {
    @Input('v_ridelle_code') v_ridelle_code: string;

    constructor() {
    }

    ngOnInit() {
    }

}
