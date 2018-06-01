import { Component, OnInit } from '@angular/core';
import { Third } from '../../../thirds/classes/third';
import { Structure } from '../../classes/structure';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../classes/contract';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../classes/campaign';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  navBarLayout: string;

  campaignsRes: any[];
  campaigns: any[];
  maxYears: number;
  campaignsForm: any;
  contract: Contract;
  structures: any;
  searchForm: any;
  addThird: boolean;
  thirds: any;
  area: number;
  tiers: Third[];
  addButtonOptions: any;
  removeButtonOptions: any;

  constructor(public tier: Third,
    public currentThird: Third,
    public structure: Structure,
    public tierService: ThirdsService,
    public campaignService: CampaignService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.maxYears = 5;
    this.tierService.getThirds().subscribe(tiers => {
      this.tiers = this.tierService.dataFormatter(tiers, false);
      this.thirds = Third.getDataSource(this.tiers);
    }, error1 => {
      console.log(error1);
      this.toastr.error(error1.message);
    });

    this.addThird = false;
    this.searchForm = {
      cin: ''
    };


    this.campaignService.getCampaigns().subscribe( camp => {
      this.campaignsRes = this.campaignService.dataFormatter(camp, false);

      this.campaigns = this.campaignsRes.map(c => {
        c['hidded']  = true;
        c['area']    = 0;
        return c;
      });
      this.campaigns[0]['hidded'] = false;
      this.campaigns = this.campaignsRes.filter(c => !c.hidded);
    }, error1 => {
      console.log(error1);
      this.toastr.error(error1.message);
    });

    this.navBarLayout = 'large-filled-symbols';

    this.addButtonOptions = {
      text: '',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      onClick: (e) => {
        const tmp = this.campaignsRes[this.campaigns.length];
        this.campaigns.push(tmp);
      }
    };
    this.removeButtonOptions = {
      text: '',
      icon: 'remove',
      type: 'danger',
      useSubmitBehavior: false,
      onClick: (e) => {
        this.campaigns.pop();
      }
    };
  }

  checker = (tocheck) => {
    if (typeof tocheck === 'undefined') {
      return false;
    }
    return tocheck;
  }

  trackByIndex = (index: number, value: number) => {
    return index;
  }


  onAreaChanged = (area, i) => {
    this.campaigns[i].area = area;
  }

  goToArea = () => {
    if (!this.currentThird.cin) {
      this.toastr.error('Select or create a Aggregated first!');
    } else {
      console.log(this.currentThird);
    }
  }


  goToParcels = () => {
    if (!this.currentThird.cin) {
      this.toastr.error('Select at least one campaign to continue!');
    } else {
      console.log(this.currentThird);
      console.log(this.campaigns);
    }
  }

  listSelectionChanged = (e) => {
    this.currentThird = e.addedItems[0];
  }

  logEvent(e) {
  }

  finishFunction() {
    console.log(this.currentThird);
    console.log(this.campaigns);
    console.log(this.contract);
  }
}
