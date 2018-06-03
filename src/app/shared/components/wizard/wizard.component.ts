import { Component, Input, OnInit } from '@angular/core';
import { Third } from '../../../thirds/classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../../contracts/classes/contract';
import { Ground } from '../../../contracts/classes/ground';
import { Structure } from '../../../contracts/classes/structure';
import { CampaignService } from '../../../contracts/services/campaign.service';
import { GroundsService } from '../../../contracts/services/grounds.service';
import { ZonesService } from '../../../contracts/services/zones.service';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { Zone } from '../../../contracts/classes/zone';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @Input() isEdit: boolean;

  contracts: any;
  allMode: any;
  checkBoxesMode: any;

  navBarLayout: string;
  block_id: number;
  cdas: any;
  zones: any;
  sectors: any;
  blocs: any;
  grounds: any;
  mles: any;
  mle: any;
  parcelForm: any;
  campaignsRes: any[];
  groundsList: any[];
  currentParcel: any[];

  cdaEditorOptions: any;
  zoneEditorOptions: any;
  matriculeEditorOptions: any;
  blocEditorOptions: any;
  sectorEditorOptions: any;
  worthEditorOptions: any;

  parcels: any[];
  campaigns: any[];
  maxYears: number;
  structures: any;
  addThird: boolean;
  thirds: any;
  area: number;
  tiers: Third[];
  addButtonOptions: any;
  removeButtonOptions: any;
  aggregatedOptions: any;
  addParcelOptions: any;

  constructor(public tier: Third,
    public currentThird: Third,
    public structure: Structure,
    public contract: Contract,
    public tierService: ThirdsService,
    public campaignService: CampaignService,
    private toastr: ToastrService,
    private thirdService: ThirdsService,
    private groundService: GroundsService,
    private zoneService: ZonesService,
    private contractService: ContractsService) {
  }

  ngOnInit() {
    this.groundsList = [];
    this.worthEditorOptions = {
      items: ['propritaire', 'location', 'procuration']
    };
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick';
    this.parcelForm = {
      cda: null,
      zone: null,
      secteur: null,
      block: null,
      mle: null,
      total_surface: null,
      yearly_surface: null,
      mode_worth: null
    };
    this.addParcelOptions = {
      text: 'Add parcel',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      onClick: (e) => {
        const z = new Zone();
        z.zone_id = this.block_id;
        z.zone_type_id = 7;
        z.label = e.mle;

        this.groundService.addGround(this.parcelForm).subscribe(ground => {
          ground = this.groundService.dataFormatter(ground, false);
          this.parcelForm = {
            cda: null,
            zone: null,
            secteur: null,
            block: null,
            mle: null,
            total_surface: null,
            yearly_surface: null,
            mode_worth: null
          };
          console.log(ground);
          this.groundsList.push(ground);
        }, error1 => {
          this.toastr.error(error1.error.message);
        });
      }
    };
    this.zoneService.getCDAs().subscribe(cda => {
      // CDA
      this.cdas = this.zoneService.dataFormatter(cda, false).zones;
      this.cdaEditorOptions = {
        items: this.cdas,
        displayExpr: 'libelle',
        valueExpr: 'libelle',
        value: '',
        searchEnabled: true,
        onSelectionChanged: (e) => {
          // Zone
          if (e.selectedItem) {
            this.zoneService.getZonesByCDA(e.selectedItem.id).subscribe(zone => {
              this.zones = this.zoneService.dataFormatter(zone, false).zones;
              this.zoneEditorOptions = {
                items: this.zones,
                displayExpr: 'libelle',
                valueExpr: 'libelle',
                value: '',
                searchEnabled: true,
                onSelectionChanged: (event) => {
                  // Sector
                  if (event.selectedItem) {
                    this.zoneService.getSectors(event.selectedItem.id).subscribe(secteur => {
                      this.sectors = this.zoneService.dataFormatter(secteur, false).zones;
                      this.sectorEditorOptions = {
                        items: this.sectors,
                        displayExpr: 'libelle',
                        valueExpr: 'libelle',
                        value: '',
                        searchEnabled: true,
                        onSelectionChanged: (event1) => {
                          // Bloc
                          if (event1.selectedItem) {
                            this.block_id = event1.selectedItem.id;
                            this.zoneService.getBlocs(event1.selectedItem.id).subscribe(block => {
                              this.blocs = this.zoneService.dataFormatter(block, false).zones;
                              this.blocEditorOptions = {
                                items: this.blocs,
                                displayExpr: 'libelle',
                                valueExpr: 'libelle',
                                value: '',
                                searchEnabled: true,
                                onSelectionChanged: (e2) => {
                                  // Ground
                                  if (e2.selectedItem) {
                                    this.zoneService.getBlocs(e2.selectedItem.id).subscribe(ground => {
                                      console.log(this.mles);
                                      this.mles = this.zoneService.dataFormatter(ground, false).zones;
                                      this.matriculeEditorOptions = {
                                        editorType: 'dxSelectBox',
                                        items: this.mles,
                                        displayExpr: 'libelle',
                                        valueExpr: 'libelle',
                                        value: '',
                                        searchEnabled: true,
                                        onSelectionChanged: (e1) => {
                                          console.log(e1);
                                        }
                                      };
                                    }, error1 => {
                                      this.toastr.error(error1.error.message);
                                    });
                                  }
                                }
                              };
                            }, error1 => {
                              this.toastr.error(error1.error.message);
                            });
                          }
                        }
                      };
                    }, error1 => {
                      this.toastr.error(error1.error.message);
                    });
                  }

                }
              };
            }, error1 => {
              this.toastr.error(error1.error.message);
            });
          }
        }
      };

    }, error1 => {
      this.toastr.error(error1.error.message);
    });

    this.maxYears = 5;
    this.tierService.getThirds().subscribe(tiers => {
      this.tiers = this.tierService.dataFormatter(tiers, false);
      this.thirds = Third.getDataSource(this.tiers, 'cin');
    }, error1 => {
      console.log(error1);
      this.toastr.error(error1.error.message);
    });

    this.addThird = false;


    this.campaignService.getCampaigns().subscribe(camp => {
      this.campaignsRes = this.campaignService.dataFormatter(camp, false);

      this.campaigns = this.campaignsRes.map(c => {
        c['hidded'] = true;
        c['area'] = 0;
        return c;
      });
      if (this.campaigns.length > 0) {
        this.campaigns[0]['hidded'] = false;
        this.campaigns = this.campaignsRes.filter(c => !c.hidded);
      }
    }, error1 => {
      console.log(error1);
      this.toastr.error(error1.error.message);
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

    this.aggregatedOptions = {
      label: 'Culture type',
      items: ['cas', 'bas']
    };
  }

  goToContractInfo = () => {
    if (!this.currentThird.cin) {
      this.toastr.error('Select or create a Aggregated first!');
    } else {
      console.log(this.currentThird);
    }
  }

  goToArea = () => {
    console.log(this.contract);
    console.log(this.currentThird);
    if (!this.contract.code_ormva) {
      this.toastr.error('Fill the contract fields first!');
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

  deleteRecords = (e) => {
    console.log(e);
  }

  saveThird = () => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.tier = new Third();
      this.currentThird = data[0];
      this.toastr.success(
        `New third party added successfully.`);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
    this.addThird = false;
  }

  cancelThird = () => {
    this.addThird = false;
    this.currentThird = new Third();
  }

  checker = (tocheck) => {
    if (typeof tocheck === 'undefined') {
      return false;
    }
    return tocheck;
  }

  listSelectionChanged = (e) => {
    this.currentThird = e.addedItems[0];
  }

  logEvent(e) {
  }

  finishFunction(e) {
    e.preventDefault();
    console.log(this.currentThird);
    console.log(this.campaigns);
    console.log(this.contract);
    console.log(this.parcelForm);
    // this.contractService.addContract(this.contract).subscribe(contract => {}, error1 => {});
  }
}
