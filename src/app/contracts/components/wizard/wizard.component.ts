import { Component, OnInit } from '@angular/core';
import {Third} from '../../../thirds/classes/third';
import {Structure} from '../../classes/structure';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  navBarLayout: string;
  campaigns: any;
  campaign: string;
  superficies: any;
  structures: any;
  addButtonOptions: any;
  removeButtonOptions: any;

  constructor(public tier: Third,
              public structure: Structure) {
  }

  ngOnInit() {
    this.campaigns = [2019];
    this.navBarLayout = 'large-filled-symbols';
    this.addButtonOptions = {
      text: '',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      onClick: (e) => {
        const campaign = this.campaigns[this.campaigns.length - 1];
        this.campaigns.push(campaign + 1);
      }
    };
    this.removeButtonOptions = {
      text: '',
      icon: 'remove',
      type: 'danger',
      useSubmitBehavior: false,
      onClick: (e) => {
        console.log(this.campaigns);
        const campaign = this.campaigns[this.campaigns.length - 1];
        this.campaigns.pop(campaign + 1);
        console.log(this.campaigns);
      }
    };
  }

  campaignProps(campaign: number) {
    return `${campaign} - ${campaign + 1}`;
  }

  logEvent(e) {}

  finishFunction() {
  }
}
