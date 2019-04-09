import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-truck-svgs-green',
  templateUrl: './truck-svgs-green.component.html',
  styleUrls: ['./truck-svgs-green.component.scss']
})
export class TruckSvgsGreenComponent implements OnInit {
    @Input('v_ridelle_code') v_ridelle_code: string;

  constructor() { }

  ngOnInit() {
  }

}
