import { Component, Input, OnInit } from '@angular/core';
import { Third } from '../../../classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../../classes/contract';
import { Structure } from '../../../classes/structure';
import { CampaignService } from '../../../contracts/services/campaign.service';
import { GroundsService } from '../../../contracts/services/grounds.service';
import { ZonesService } from '../../../contracts/services/zones.service';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { Zone } from '../../../classes/zone';
import { ContractedArea } from '../../../classes/contracted-area';
import { ContractedAreaService } from '../../../contracts/services/contracted-area.service';
import { AgreementGround } from '../../../classes/agreement-ground';
import { AgreementGroundsService } from '../../../contracts/services/agreement-grounds.service';
import { Campaign } from '../../../classes/campaign';
import { Router } from '@angular/router';
import {Helper} from '../../../classes/helper';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() contract?: Contract;
  @Input() currentThird?: Third;
  @Input() structure?: Structure;
  @Input() groundsList?: any[];
  @Input() campaigns?: any[];
  @Input() readOnly: boolean;

  contracts: any;
  allMode: any;
  checkBoxesMode: any;
  tierData: string;

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
  currentParcel: any[];

  cdaEditorOptions: any;
  zoneEditorOptions: any;
  matriculeEditorOptions: any;
  blocEditorOptions: any;
  sectorEditorOptions: any;
  worthEditorOptions: any;
  expirationDateOptions: any;
  contracteditorOptions: any;
  totalSupEditorOptions: any;

  parcels: any[];
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
    public tierService: ThirdsService,
    public campaignService: CampaignService,
    private toastr: ToastrService,
    private thirdService: ThirdsService,
    private groundService: GroundsService,
    private zoneService: ZonesService,
    private contractService: ContractsService,
    private contractedArea: ContractedAreaService,
    private agreementGroundService: AgreementGroundsService,
    private router: Router) {
  }

  ngOnInit() {
    this.tierService.getThirdsDx().subscribe(tiers => {
      this.tiers = this.tierService.dataFormatter(tiers, false);
      this.thirds = Third.getDataSource(this.tiers, 'cin');
    }, error1 => {
      this.toastr.error(error1.error.message);
    });

    this.contractService.getContractsVars().subscribe((data) => {
      this.contracteditorOptions = {
        label: 'Type contrat',
        value: 'annual',
        dataSource: Helper.dataSourceformatter(data['contract_types']),
        displayExpr: 'Name',
        valueExpr: 'Id'
      };

      this.worthEditorOptions = {
        dataSource: Helper.dataSourceformatter(data['tenure']),
        displayExpr: 'Name',
        valueExpr: 'Id'
      };
    }, error1 => {
      throw error1;
    });

    this.totalSupEditorOptions = {
    };

    this.maxYears = 5;
    this.tierData = 'tierData';
    this.groundsList = [];
    this.contract.application_date = new Date();
    this.expirationDateOptions = {
      label: 'Date d\'expiration',
      value: new Date(2019, 3, 27),
      min: this.contract.application_date
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
      text: 'Ajouter parcelle',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      onClick: (e) => {
        const z = new Zone();
        z.zone_id = this.block_id;
        z.zone_type_id = 7;
        z.code = e.mle;

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
        displayExpr: 'name',
        valueExpr: 'name',
        value: '',
        searchEnabled: true,
        onSelectionChanged: (e) => {
          // Zone
          if (e.selectedItem) {
            this.zoneService.getZonesByCDA(e.selectedItem.id).subscribe(zone => {
              this.zones = this.zoneService.dataFormatter(zone, false).zones;
              this.zoneEditorOptions = {
                items: this.zones,
                displayExpr: 'name',
                valueExpr: 'name',
                value: '',
                searchEnabled: true,
                onSelectionChanged: (event) => {
                  // Sector
                  if (event.selectedItem) {
                    this.zoneService.getSectors(event.selectedItem.id).subscribe(secteur => {
                      this.sectors = this.zoneService.dataFormatter(secteur, false).zones;
                      this.sectorEditorOptions = {
                        items: this.sectors,
                        displayExpr: 'name',
                        valueExpr: 'name',
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
                                displayExpr: 'name',
                                valueExpr: 'name',
                                value: '',
                                searchEnabled: true,
                                onSelectionChanged: (e2) => {
                                  // Ground
                                  if (e2.selectedItem) {
                                    this.zoneService.getBlocs(e2.selectedItem.id).subscribe(ground => {
                                      this.mles = this.zoneService.dataFormatter(ground, false).zones;
                                      this.matriculeEditorOptions = {
                                        editorType: 'dxSelectBox',
                                        items: this.mles,
                                        displayExpr: 'name',
                                        valueExpr: 'name',
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

    this.addThird = false;


    /*this.campaignService.getCampaigns().subscribe(camp => {
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
      this.toastr.error(error1.error.message);
    });*/
    const year = new Date().getFullYear();
    this.campaigns = [
      {
        campaign: `${year}/${Number(year) + 1}`,
        surface: 0}
    ];

    this.navBarLayout = 'large-filled-symbols';

    this.addButtonOptions = {
      text: '',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      validationGroup: 'tierData',
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
      label: 'Type culture',
      items: ['cas', 'bas']
    };
  }

  goToContractInfo = () => {
    if (!this.currentThird.cin) {
      this.toastr.error('Sélectionnez ou créez un agrégé pour avancer!');
    } else {
      console.log(this.currentThird);
    }
  }

  goToArea = () => {
    if (!this.contract.application_date) {
      this.toastr.error('Remplissez les champs du contrat pour avancer!');
    } else {
      this.maxYears = (this.contract.type === 'annuel') ? 1 : 5;
      console.log(this.currentThird);
    }
  }


  goToParcels = () => {
    if (!this.currentThird.cin) {
      this.toastr.error('Sélectionnez ou créez un agrégé pour avancer!');
    } else if (this.campaigns.length <= 0 || this.campaigns[0].area <= 0) {
      this.toastr.error('Sélectionnez au moins une campagne pour continuer et la superficie doit être supérieure à 0!');
    } else {
      console.log(this.currentThird);
      console.log(this.campaigns);
    }
  }


  onFormSubmit = (e) => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.tier = new Third();
      this.currentThird = data[0];
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
    }, err => {
      this.toastr.error(err.error.message);
    });
    this.addThird = false;
  }
  saveThird = (e) => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.tier = new Third();
      this.currentThird = data[0];
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
    }, err => {
      this.toastr.error(err.error.message);
    });
    this.addThird = false;
  }

  cancelThird = () => {
    this.addThird = false;
    this.currentThird = new Third();
    this.currentThird.cin = '';
  }

  checker = (tocheck) => {
    if (typeof tocheck === 'undefined') {
      return false;
    }
    return tocheck;
  }

  listSelectionChanged = (e) => {
    if (!this.isEdit) {
      this.currentThird = e.addedItems[0];
    }
  }

  logEvent(e) {
  }

  finishFunction(e) {
    e.preventDefault();
    const tenantId = JSON.parse(localStorage.getItem('tenantId'));
    this.contract.third_party_id = this.currentThird.id;
    this.contract.signature_date = new Date();
    this.contract.structure_id = tenantId;
    if (this.isEdit) {
      this.contract.parent_id = this.contract.id;
    }

    this.contract.type = 'annuel';
    this.contractService.addContract(this.contract).subscribe(contract => {
      contract = this.contractService.dataFormatter(contract, false);

      this.campaigns = this.campaigns.map(c => {

        return {
          contracted_surface: c.area,
          agreement_id: contract['id'],
          campaign_id: c.id
        };
      });
      this.contractedArea.addMultiAreas({ 'contracted_surfaces': this.campaigns }).subscribe(data => {
        data = this.contractedArea.dataFormatter(data, false);
        const groundsList = this.groundsList.map(ground => {
          return {
            ground_id: ground.id,
            mode_worth: ground.mode_worth,
            agreement_id: contract['id'],
            annuel_surface: ground.annuel_surface
          };
        });
        this.agreementGroundService.addAgreementGround({ 'agreement_grounds': groundsList }).subscribe(d => {
          d = this.contractedArea.dataFormatter(d, false);
          this.router.navigate([`/contrats/afficher/${contract['id']}`]);
        }, error1 => {
          this.toastr.error(error1.error.message);
        });

      }, error1 => {
        this.toastr.error(error1.error.message);
      });
    }, error1 => {
      this.toastr.error(error1.error.message);
    });
  }
}
