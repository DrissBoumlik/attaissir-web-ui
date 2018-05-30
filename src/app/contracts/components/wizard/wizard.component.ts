import { Component, OnInit } from '@angular/core';
import { Third } from '../../../thirds/classes/third';
import { Structure } from '../../classes/structure';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';

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
  searchForm: any;
  addThird: boolean;
  thirds: any;
  tiers: Third[];
  addButtonOptions: any;
  removeButtonOptions: any;

  constructor(public tier: Third,
    public currentThird: Third,
    public structure: Structure,
    public tierService: ThirdsService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.tierService.getThirds().subscribe(tiers => {
      this.tiers = this.tierService.dataFormatter(tiers, false);
      this.thirds = Third.getDataSource(this.tiers);

      console.log(this.tiers);
      console.log(this.thirds);
    });

    this.addThird = false;
    this.searchForm = {
      cin: ''
    };
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
        const campaign = this.campaigns[this.campaigns.length - 1];
        this.campaigns.pop(campaign + 1);
      }
    };
  }

  goToArea = ($e) => {
    if (!this.currentThird.id) {
      this.toastr.error('Select or create a Aggregated first!');
    }
  }

  goToParcels = ($e) => {
    // code here
  }

  campaignProps = (campaign: number) => {
    return `${campaign} - ${campaign + 1}`;
  }

  listSelectionChanged = (e) => {
    this.currentThird = e.addedItems[0];
  }


  searchCIN = () => {
    console.log(this.searchForm);
    this.tierService.getThirdByCIN(this.searchForm.cin);
  }

  logEvent(e) { }

  finishFunction() {
  }
}
