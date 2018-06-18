import { Component, Input, OnInit } from '@angular/core';
import { Third } from '../../../classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../../classes/contract';
import { Structure } from '../../../classes/structure';
import { SoilsService } from '../../../contracts/services/soils.service';
import { ZonesService } from '../../../contracts/services/zones.service';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { Zone } from '../../../classes/zone';
import { Router } from '@angular/router';
import { Helper } from '../../../classes/helper';
import { ParcelsService } from '../../../contracts/services/parcels.service';


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

  searchThird: string;
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
  mle: any;
  parcelForm: any;

  cdaEditorOptions: any;
  zoneEditorOptions: any;
  blocEditorOptions: any;
  sectorEditorOptions: any;
  worthEditorOptions: any;
  expirationDateOptions: any;
  contracteditorOptions: any;
  totalSupEditorOptions: any;

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
    private toastr: ToastrService,
    private thirdService: ThirdsService,
    private soilsService: SoilsService,
    private zoneService: ZonesService,
    private contractService: ContractsService,
    private contractedArea: ParcelsService,
    private parcelsService: ParcelsService,
    private router: Router) {
  }

  ngOnInit() {

    this.contractService.getContractsVars().subscribe((data) => {
      this.contracteditorOptions = {
        label: 'Type contrat',
        value: 'annual',
        dataSource: Helper.dataSourceformatter(data['contract_types']),
        displayExpr: 'Name',
        valueExpr: 'ID'
      };

      this.worthEditorOptions = {
        label: 'Mode faire-valoir',
        dataSource: Helper.dataSourceformatter(data['tenure']),
        displayExpr: 'Name',
        valueExpr: 'ID'
      };
    }, error1 => {
      throw error1;
    });

    this.totalSupEditorOptions = {};

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
      registration_number: null,
      total_surface: null,
      annuel_surface: null,
      code_ormva: null,
      tenure: null
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

        this.soilsService.addGround(this.parcelForm).subscribe(ground => {
          ground = this.soilsService.dataFormatter(ground, false);
          ground['tenure'] = this.parcelForm.tenure;
          ground['annuel_surface'] = this.parcelForm.annuel_surface;
          ground['code_ormva'] = this.parcelForm.code_ormva;
          if (Number(this.parcelForm.annuel_surface) > Number(this.parcelForm.total_surface)) {
            this.toastr.warning('La superficie contractée doit être inférieure ou égale à la superficie totale.');
          } else {
            this.parcelForm = {
              cda: null,
              zone: null,
              sector: null,
              block: null,
              registration_number: null,
              total_surface: null,
              annuel_surface: null,
              code_ormva: null,
              tenure: null
            };
            this.groundsList.push(ground);
          }
          console.log(this.groundsList);
        }, error1 => {
          this.toastr.warning(error1.error.message);
        });
      }
    };
    this.zoneService.getCDAs().subscribe(cda => {
      // CDA
      this.cdas = this.zoneService.dataFormatter(cda, true);
      this.cdaEditorOptions = {
        label: 'CDA',
        items: this.cdas,
        displayExpr: 'name',
        valueExpr: 'code',
        searchEnabled: true,
        onSelectionChanged: (e) => {
          // Zone
          if (e.selectedItem) {
            this.zoneService.getZonesByCDA(e.selectedItem.code).subscribe(zone => {
              this.zones = this.zoneService.dataFormatter(zone, true);
              this.zoneEditorOptions = {
                label: 'Zone',
                items: this.zones,
                displayExpr: 'name',
                valueExpr: 'code',
                value: '',
                searchEnabled: true,
                onSelectionChanged: (event) => {
                  // Sector
                  if (event.selectedItem) {
                    this.zoneService.getSectors(event.selectedItem.code).subscribe(secteur => {
                      this.sectors = this.zoneService.dataFormatter(secteur, true);
                      this.sectorEditorOptions = {
                        label: 'Secteur',
                        items: this.sectors,
                        displayExpr: 'name',
                        valueExpr: 'code',
                        value: '',
                        searchEnabled: true,
                        onSelectionChanged: (event1) => {
                          // Bloc
                          if (event1.selectedItem) {
                            this.block_id = event1.selectedItem.id;
                            this.zoneService.getBlocs(event1.selectedItem.code).subscribe(block => {
                              this.blocs = this.zoneService.dataFormatter(block, true);
                              this.blocEditorOptions = {
                                label: 'Bloc',
                                items: this.blocs,
                                displayExpr: 'name',
                                valueExpr: 'code',
                                value: '',
                                searchEnabled: true,
                                onSelectionChanged: (e2) => {
                                }
                              };
                            }, error1 => {
                              this.toastr.warning(error1.error.message);
                            });
                          }
                        }
                      };
                    }, error1 => {
                      this.toastr.warning(error1.error.message);
                    });
                  }

                }
              };
            }, error1 => {
              this.toastr.warning(error1.error.message);
            });
          }
        }
      };

    }, error1 => {
      this.toastr.warning(error1.error.message);
    });

    this.addThird = false;

    let year = new Date().getFullYear();
    this.campaigns = [
      {
        campaign: `${year}/${Number(year) + 1}`,
        surface: 0
      }
    ];

    this.navBarLayout = 'large-filled-symbols';

    this.addButtonOptions = {
      text: '',
      icon: 'plus',
      type: 'success',
      useSubmitBehavior: false,
      validationGroup: 'tierData',
      onClick: (e) => {
        year += 1;
        this.campaigns.push(
          {
            campaign: `${year}/${Number(year) + 1}`,
            surface: 0
          });
        console.log(this.campaigns);
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

  editParcels = (e) => {

    if (e.newData.hasOwnProperty('annuel_surface') && e.newData.hasOwnProperty('total_surface')) {
      if (Number(e.newData.annuel_surface) > Number(e.newData.total_surface)) {
        e.cancel = true;
        this.toastr.warning('La superficie contractée doit être inférieure ou égale à la superficie totale.');
        return false;
      }
    } else if (e.newData.hasOwnProperty('annuel_surface')) {
      if (Number(e.newData.annuel_surface) > Number(e.oldData.total_surface)) {
        e.cancel = true;
        this.toastr.warning('La superficie contractée doit être inférieure ou égale à la superficie totale.');
        return false;
      }
    } else if (e.newData.hasOwnProperty('total_surface')) {
      if (Number(e.oldData.annuel_surface) > Number(e.newData.total_surface)) {
        e.cancel = true;
        this.toastr.warning('La superficie contractée doit être inférieure ou égale à la superficie totale.');
        return false;
      }
    }

    e.newData['id'] = e.oldData.id;
    this.soilsService.editGround(e.newData).subscribe(ground => {
      this.toastr.success('Les modifications sont effectuées avec suces.');
    }, error1 => {
      this.toastr.warning(error1.error.message);
    });
  }

  search = () => {
    this.thirdService.getThirdByCIN(this.searchThird).subscribe(data => {
      this.currentThird = this.thirdService.dataFormatter(data, false);
    }, error1 => {
      this.toastr.warning('L\'argégé n\'exist pas');
    });
  }

  goToContractInfo = () => {
    if (!this.currentThird.cin) {
      this.toastr.warning('Sélectionnez ou créez un agrégé pour avancer!');
    }
  }

  goToArea = () => {
    if (!this.contract.application_date) {
      this.toastr.warning('Remplissez les champs du contrat pour avancer!');
    } else {
      this.maxYears = (this.contract.type === 'annual') ? 1 : 5;
    }
  }


  goToParcels = () => {
    if (!this.currentThird.cin) {
      this.toastr.warning('Sélectionnez ou créez un agrégé pour avancer!');
    } else if (this.campaigns.length <= 0 || this.campaigns[0].surface <= 0) {
      this.toastr.warning('Sélectionnez au moins une campagne pour continuer et la superficie doit être supérieure à 0!');
    }
  }


  onFormSubmit = (e) => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.currentThird = this.thirdService.dataFormatter(data, false);
      this.tier = new Third();
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
    }, err => {
      this.toastr.warning(err.error.message);
    });
    this.addThird = false;
  }
  saveThird = (e) => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.currentThird = this.thirdService.dataFormatter(data, false);
      this.tier = new Third();
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
    }, err => {
      this.toastr.warning(err.error.message);
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
    const tenantId = localStorage.getItem('tenantId');
    this.contract.third_party_id = this.currentThird.id;
    this.contract.signature_date = new Date();
    this.contract.structure_id = Number(tenantId);
    if (this.isEdit) {
      this.contract.parent_id = this.contract.id;
      this.contract.type = 'annual';
    }
    this.contract.contracted_surface = this.campaigns;
    this.contract.compaign_surface = this.campaigns[0].surface;

    let surfaces = 0;
    this.groundsList.map(ground => {
      surfaces += ground.annuel_surface;
      return ground;
    });

    if (Number(this.contract.compaign_surface) !== Number(surfaces)) {
      this.toastr.warning('Les superficies contractées doivent être égales à la superficie de la campagne courant.');
      return false;
    }

    this.contractService.addContract(this.contract).subscribe(contract => {
      contract = this.contractService.dataFormatter(contract, false);

      this.groundsList.map((soil) => {
        console.log(soil);
        const soilObject = {
          soil_id: soil.id,
          tenure: soil.tenure,
          contract_id: contract['id'],
          annuel_surface: soil.annuel_surface,
          code_ormva: soil.code_ormva
        };
        this.parcelsService.addParcel(soilObject).subscribe(d => {
          d = this.parcelsService.dataFormatter(d, false);
          const id = (this.isEdit) ? this.contract.id : contract['id'];
          this.router.navigate([`/contrats/afficher/${id}`]);
        }, error1 => {
          this.toastr.warning(error1.error.message);
        });
        return soil;
      });
    }, error1 => {
      throw error1;
    });
    /*
      /*
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
          this.toastr.warning(error1.error.message);
        });

      }, error1 => {
        this.toastr.warning(error1.error.message);
      });*/
    /*}, error1 => {
      this.toastr.warning(error1.error.message);
    });*/
  }
}
