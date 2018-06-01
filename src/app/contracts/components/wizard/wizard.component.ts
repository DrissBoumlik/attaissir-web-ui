import { Component, Input, OnInit } from '@angular/core';
import { Third } from '../../../thirds/classes/third';
import { Structure } from '../../classes/structure';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../classes/contract';
import { CampaignService } from '../../services/campaign.service';
import { GroundsService } from '../../services/grounds.service';
import { Ground } from '../../classes/ground';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @Input() isEdit: boolean;

  navBarLayout: string;
  cdas: any;
  zones: any;
  matricules: any;
  parcelForm: any;
  campaignsRes: any[];
  currentParcel: any[];

  cdaEditorOptions: any;
  zoneEditorOptions: any;
  matriculeEditorOption: any;

  parcels: any[];
  campaigns: any[];
  maxYears: number;
  contract: Contract;
  grounds: Ground[];
  structures: any;
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
    private toastr: ToastrService,
    private thirdService: ThirdsService,
    private groundService: GroundsService) {
  }

  ngOnInit() {
    this.cdaEditorOptions = {
      items: this.cdas,
      value: '',
      OnValueChanged: () => {}
    };

    this.maxYears = 5;
    this.tierService.getThirds().subscribe(tiers => {
      this.tiers = this.tierService.dataFormatter(tiers, false);
      this.thirds = Third.getDataSource(this.tiers);
    }, error1 => {
      console.log(error1);
      this.toastr.error(error1.message);
    });

    this.addThird = false;

    this.groundService.getGrounds().subscribe(grounds => {
      this.grounds = this.groundService.dataFormatter(grounds, false);
    }, error1 => {
      console.log(error1);
      this.toastr.error(error1.message);
    });

    this.campaignService.getCampaigns().subscribe(camp => {
      this.campaignsRes = this.campaignService.dataFormatter(camp, false);

      this.campaigns = this.campaignsRes.map(c => {
        c['hidded'] = true;
        c['area'] = 0;
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

  deleteRecords = (e) => {
    console.log(e);
  }

  saveThird = () => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      console.log(data);
      this.tier = new Third();
      this.toastr.success(
        `New third party added successfully.`);
    }, err => {
      this.toastr.error(err.message);
    });
    this.addThird = false;
  }

  cancelThird = () => {
    this.addThird = false;
    this.currentThird = null;
  }

  checker = (tocheck) => {
    if (typeof tocheck === 'undefined') {
      return false;
    }
    return tocheck;
  }

  editGround = (event) => {
    event.cancel = true;
    this.groundService.editGround(event.data.id).subscribe(res => {
      this.toastr.success(
        `Ground has been edited successfully.`);
      event.cancel = false;
    }, error1 => {
      this.toastr.error(error1.message);
    });
  }
  addGround = (event) => {
    event.cancel = true;
    this.groundService.addGround(event.data).subscribe(res => {
      this.toastr.success(
        `New Ground has been added successfully.`);
      event.cancel = false;
    }, error1 => {
      this.toastr.error(error1.message);
    });
  }

  AddParcel = () => {}

  deleteGround = (event) => {
    event.cancel = true;
    this.groundService.deleteGround(event.data.id).subscribe(
      () => {
        this.toastr.success('Ground has been deleted successfully.');
        event.cancel = false;
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
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
      this.toastr.error('Select or create a Aggregated first!');
    } else if (this.campaigns.length <= 0 || this.campaigns[0].area <= 0) {
      this.toastr.error('Select at least one campaign to continue and area shoyuld be greater then 0!');
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
