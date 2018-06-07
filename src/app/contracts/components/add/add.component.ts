import { Component, OnInit } from '@angular/core';
import { Third } from '../../../classes/third';
import { Structure } from '../../../classes/structure';
import { Contract } from '../../../classes/contract';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  groundsList?: any[];
  campaigns?: any[];

  constructor(
    public contract: Contract,
    public currentThird: Third,
    public structure: Structure) { }

  ngOnInit() {
    this.groundsList = [];
    this.campaigns = [];
  }
}
