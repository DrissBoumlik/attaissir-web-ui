import { Component, OnInit } from '@angular/core';
import {Third} from '../../../thirds/classes/third';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  campaigns: any;
  campaign: string;
  superficies: any;
  buttonOptions: any;

  constructor(public tier: Third) {
  }

  ngOnInit() {
    this.campaigns = ['2019'];
    this.buttonOptions = {
      text: '',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      onClick: (e) => {
        console.log(this.campaigns);
        const campaign = this.campaigns[this.campaigns.length - 1];
        this.campaigns.push(campaign + 1);
        console.log(this.campaigns);
      }
    };
  }

  campaignProps(campaign) {
    return `${campaign} - ${Number(campaign) + 1}`;
  }

  finishFunction() {
  }
}
