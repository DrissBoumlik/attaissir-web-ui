import { Component, OnInit } from '@angular/core';
import { Third } from '../../../../shared/classes/third';
import { Structure } from '../../../../shared/classes/structure';
import { Contract } from '../../../../shared/classes/contract';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  groundsList?: any[];
  campaigns?: any[];
  helper: any;

  constructor(
    public contract: Contract,
    public currentThird: Third,
    public structure: Structure) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.groundsList = [];
    this.campaigns = [];

    this.currentThird.type = 'natural';
    this.currentThird.morale = false;
  }

}
