import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contract } from '../../classes/contract';
import { Third } from '../../classes/third';
import { Structure } from '../../classes/structure';
import { Zone } from '../../classes/zone';
import { ThirdsService } from '../../../modules/thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { SoilsService } from '../../../modules/contracts/services/soils.service';
import { ZonesService } from '../../../modules/contracts/services/zones.service';
import { ParcelsService } from '../../../modules/parcels/services/parcels.service';
import { ContractsService } from '../../../modules/contracts/services/contracts.service';
import { Helper } from '../../classes/helper';
import { Parcel } from '../../classes/parcel';


@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() step2: string;
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
  helper: any;
  isCane: boolean;

  navBarLayout: string;
  block_id: number;
  cdas: any;
  zones: any;
  sectors: any;
  blocs: any;
  mle: any;
  parcelForm: any;
  clicked: boolean;

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
  parcels: any;
  addThird: boolean;
  thirds: any;
  area: number;
  tiers: Third[];
  addButtonOptions: any;
  removeButtonOptions: any;
  aggregatedOptions: any;
  addParcelOptions: any;

  constructor(public tier: Third,
    private toastr: ToastrService,
    private thirdService: ThirdsService,
    private soilsService: SoilsService,
    private zoneService: ZonesService,
    private contractService: ContractsService,
    private contractedArea: ParcelsService,
    private parcelsService: ParcelsService,
    private router: Router) {
    this.helper = Helper;
    this.clicked = false;
    this.isCane = false;
  }

  ngOnInit() {
    if (localStorage.getItem('tenantId') === '3' || localStorage.getItem('tenantId') === '8' || localStorage.getItem('tenantId') === '9') {
      this.isCane = true;
    }
    this.contractService.getContractsVars().subscribe((data) => {
      this.contracteditorOptions = {
        label: 'Type contrat',
        value: 'annual',
        dataSource: Helper.dataSourceformatter(data['contract_types']),
        displayExpr: 'Name',
        valueExpr: 'ID',
        onSelectionChanged: (e) => {
        }
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
      min: this.contract.application_date
    };
    this.allMode = 'allPages';
    this.checkBoxesMode = 'onClick';
    this.parcelForm = {
      cda: null,
      cda_id: null,
      cda_name: null,
      zone: null,
      zone_id: null,
      zone_name: null,
      secteur: null,
      block: null,

      registration_number: null,
      total_surface: null,
      annuel_surface: null,
      code_ormva: null,
      tenure: null,
      parcel_tmp_id: null
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

        let soilExist = false;
        this.groundsList.map((ground) => {
          if (ground.cda_id === this.parcelForm.cda
            && ground.zone_id === this.parcelForm.zone
            && ground.registration_number === this.parcelForm.registration_number
            && ground.code_ormva === this.parcelForm.code_ormva) {
            soilExist = true;
          }
          return ground;
        });
        this.parcelForm.registration_number = this.parcelForm.registration_number.split('_').join('-');
        if (!soilExist) {
          this.soilsService.addGround(this.parcelForm).subscribe(ground => {
            ground = this.helper.dataFormatter(ground, false);
            ground['tenure'] = this.parcelForm.tenure;
            ground['annuel_surface'] = this.parcelForm.annuel_surface;
            ground['code_ormva'] = this.parcelForm.code_ormva;
            if (Number(this.parcelForm.annuel_surface) > Number(this.parcelForm.total_surface)) {
              this.toastr.warning('La superficie contractée doit être inférieure ou égale à la superficie totale.');
            } else {
              this.parcelForm = {
                cda: null,
                cda_id: null,
                cda_name: null,
                zone: null,
                zone_id: null,
                zone_name: null,
                sector: null,
                block: null,
                registration_number: null,
                total_surface: null,
                annuel_surface: null,
                code_ormva: null,
                tenure: null,
                parcel_tmp_id: null
              };
              this.groundsList.push(ground);
              
              this.zoneService.getCDAs().subscribe(cda => {
                // CDA
                this.cdas = this.helper.dataFormatter(cda, false);
                this.cdaEditorOptions = {
                  label: 'CDA',
                  items: this.cdas,
                  displayExpr: 'name',
                  valueExpr: 'zone_id',
                  searchEnabled: true,
                  onInitialized: (e) => {
                    if (e.selectedItem) {
                      this.zoneService.getZonesByCDA(e.selectedItem.zone_id).subscribe(zone => {
                        this.zones = this.helper.dataFormatter(zone, false);
                        this.zoneEditorOptions = {
                          label: 'Zone',
                          items: this.zones,
                          displayExpr: 'name',
                          valueExpr: 'zone_id',
                          searchEnabled: true,
                          onSelectionChanged: (event) => {
                          }
                        };
                      }, error1 => {
                        this.toastr.warning(error1.error.message);
                      });
                    }
                  },
                  onSelectionChanged: (e) => {
                    // Zone
                    if (e.selectedItem) {
                      this.zoneService.getZonesByCDA(e.selectedItem.zone_id).subscribe(zone => {
                        this.zones = this.helper.dataFormatter(zone, false);
                        this.zoneEditorOptions = {
                          label: 'Zone',
                          items: this.zones,
                          displayExpr: 'name',
                          valueExpr: 'zone_id',
                          searchEnabled: true,
                          onSelectionChanged: (event) => {
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
            console.log(this.groundsList);
          }, error1 => {
            this.toastr.warning(error1.error.message);
          });
        } else {
          this.toastr.warning('Parcelle déja ajouter!');
        }
      }
    };
    
    this.zoneService.getCDAs().subscribe(cda => {
      // CDA
      this.cdas = this.helper.dataFormatter(cda, false);
      this.cdaEditorOptions = {
        label: 'CDA',
        items: this.cdas,
        displayExpr: 'name',
        valueExpr: 'zone_id',
        searchEnabled: true,
        onSelectionChanged: (e) => {
          // Zone
          if (e.selectedItem) {
            this.zoneService.getZonesByCDA(e.selectedItem.zone_id).subscribe(zone => {
              this.zones = this.helper.dataFormatter(zone, false);
              this.zoneEditorOptions = {
                label: 'Zone',
                items: this.zones,
                displayExpr: 'name',
                valueExpr: 'zone_id',
                searchEnabled: true,
                onSelectionChanged: (event) => {
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
        year -= 1;
      }
    };

    this.aggregatedOptions = {
      label: 'Type culture',
      items: ['cas', 'bas']
    };
  }
  
  getZones = (cda_id) => {
    return this.zoneService.getZonesByCDA(cda_id).subscribe(zone => {
      return this.helper.dataFormatter(zone, false);
    });
  }
  
  initParcelRow = (e) => {
    console.log(e);
    /*this.zoneService.getZonesByCDA().subscribe(zone => {
      this.zones = this.helper.dataFormatter(zone, false);
      this.zoneEditorOptions = {
        label: 'Zone',
        items: this.zones,
        displayExpr: 'name',
        valueExpr: 'code',
        value: '',
        searchEnabled: true,
        onSelectionChanged: (event) => {
        }
      };
    }, error1 => {
      this.toastr.warning(error1.error.message);
    });*/
  }
  removeParcelRow = (e) => {
    console.log(e);
    if (!!e.data.parcel_tmp_id) {
      this.parcelsService.deleteParcel(e.data.parcel_tmp_id).subscribe( data => console.log(data), err => console.log(err));
    }
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
    console.log(e.newData);
    console.log(e.oldData);
    this.soilsService.editGround(e.newData).subscribe(ground => {
      this.toastr.success('Les modifications sont effectuées avec suces.');
    }, error1 => {
      this.toastr.warning(error1.error.message);
    });
    if (e.oldData.parcel_tmp_id) {
      e.newData['id'] = e.oldData.parcel_tmp_id;
      this.parcelsService.editParcel(e.newData).subscribe(d => {
        d = this.helper.dataFormatter(d, false);
        console.log(d);
      }, error1 => {
        this.toastr.warning(error1.error.message);
      });
      e.newData['id'] = e.oldData.id;
    }
  }

  search = () => {
    this.thirdService.getThirdByCIN(this.searchThird).subscribe(data => {
      this.currentThird = this.helper.dataFormatter(data, false);
    }, error1 => {
      this.toastr.warning('L\'argégé n\'exist pas');
    });
  }

  goToContractInfo = () => {
    if (!this.currentThird.id) {
      this.toastr.warning('Sélectionnez ou créez un agrégé pour avancer!');
    }
  }

  goToArea = () => {
    if (!this.contract.application_date) {
      this.toastr.warning('Remplissez les champs du contrat pour avancer!');
    } else {
      this.maxYears = (this.contract.type === 'annual') ? 1 : 5;
      if (localStorage.getItem('tenantId') === '3' || localStorage.getItem('tenantId') === '8' || localStorage.getItem('tenantId') === '9') {
        this.maxYears = 7;
      }

      if (this.isEdit) {
        this.maxYears = 1;
      }
    }
  }


  goToParcels = () => {
    if (!this.currentThird.id) {
      this.toastr.warning('Sélectionnez ou créez un agrégé pour avancer!');
    } else if (this.campaigns.length <= 0 || this.campaigns[0].surface <= 0) {
      this.toastr.warning('Sélectionnez au moins une campagne pour continuer et la superficie doit être supérieure à 0!');
    }
  }


  onFormSubmit = (e) => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.currentThird = this.helper.dataFormatter(data, false);
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
        this.addThird = false;
    }, err => {
      let msg = `Problème dans les données saisies dans le système!`;
      if (err.error.errors['cin'] !== undefined) {
          msg = `Ce CIN exist déja exist!`;
      }
      this.toastr.warning(msg);
    });
  }
  saveThird = (e) => {
    this.thirdService.addThird(this.currentThird).subscribe(data => {
      this.currentThird = this.helper.dataFormatter(data, false);
      this.toastr.success(
        `Nouveau agrégé ajouté avec succès.`);
        this.addThird = false;
    }, err => {
      let msg = `Problème dans les données saisies dans le système!`;
      if (err.error.errors['cin'] !== undefined) {
          msg = `Ce CIN exist déja exist!`;
      }
      this.toastr.warning(msg);
    });
  }

  cancelThird = () => {
    this.addThird = false;
    this.currentThird = new Third();
    this.currentThird.cin = '';
    this.currentThird.id = 0;
  }

  newThird = () => {
    this.addThird = true;
    this.currentThird.cin = '';
    this.currentThird.id = 0;
  }

  finishFunction(e) {
    e.preventDefault();
    const tenantId = localStorage.getItem('tenantId');
    console.log(this.currentThird);
    if (!this.currentThird.id) {
      console.log(this.currentThird);
    }
    this.contract.third_party_id = this.currentThird.id;
    this.contract.signature_date = new Date();
    this.contract.expiration_date = new Date();
    this.contract.structure_id = Number(tenantId);
    if (this.isEdit) {
      this.contract.parent_id = (this.contract.status === 'inprogress') ? null : this.contract.id;
      this.contract.type = 'annual';
      this.contract.status = 'inprogress';
    }
    if (this.campaigns.length === 1) {
      this.contract.type = 'annual';
    }
    this.contract.contracted_surface = this.campaigns;
    this.contract.compaign_surface = this.campaigns[0].surface;

    this.contract.application_date = new Date(this.contract.application_date);

    Object.assign(this.contract.expiration_date, this.contract.application_date);

    this.contract.expiration_date.setFullYear(this.contract.application_date.getFullYear() + this.campaigns.length);

    if (!!this.contract.parent_id) {
      this.contract.expiration_date.setFullYear(this.contract.application_date.getFullYear() + 1);
    }
    if (localStorage.getItem('tenantId') === '3' || localStorage.getItem('tenantId') === '8' || localStorage.getItem('tenantId') === '9') {
      this.contract.expiration_date.setFullYear(this.contract.application_date.getFullYear() + 7);
    }

    let surfaces = 0;
    this.groundsList.map(ground => {
      surfaces += Number(ground.annuel_surface);
      return ground;
    });

    if (Number(this.contract.compaign_surface) !== Number(surfaces)) {
      console.log(surfaces);
      console.log(this.contract.compaign_surface);
      this.toastr.warning('Les superficies contractées doivent être égales à la superficie de la campagne courant.');
      return false;
    }

    if (this.isEdit && !this.contract.parent_id) {
      this.contractService.editContract(this.contract).throttleTime(3000)
        .subscribe((contract: any) => {
        contract = this.helper.dataFormatter(contract, false);
        this.groundsList = this.groundsList.map((ground: any) => {
          console.log(ground);
          ground['soil_id'] = ground['id'];
          ground['contract_id'] = contract['id'];
          ground['campaign_id'] = contract.campaign.id;
          ground['third_party_id'] = this.currentThird.id;
          // delete ground.id;
          return ground;
        });

        this.parcelsService.addParcel(this.groundsList).subscribe(d => {
          d = this.helper.dataFormatter(d, false);
          console.log(d);
          const id = (this.isEdit) ? this.contract.id : contract['id'];
          this.router.navigate([`/contrats/afficher/${id}`]);
        }, error1 => {
          this.toastr.warning(error1.error.message);
          if (!this.isEdit) {
            this.contractService.deleteContract(contract.id).subscribe(c => console.log(c), err => console.log(err));
          }
        });
      }, error1 => {
        throw error1;
      });
    } else {
      this.contractService.addContract(this.contract).throttleTime(3000)
        .subscribe((contract: any) => {
        contract = this.helper.dataFormatter(contract, false);
        this.groundsList = this.groundsList.map((ground: any) => {
          console.log(ground);
          ground['soil_id'] = ground['id'];
          ground['contract_id'] = contract['id'];
          ground['campaign_id'] = contract.campaign.id;
          ground['third_party_id'] = this.currentThird.id;
          // delete ground.id;
          return ground;
        });
        this.parcelsService.addParcel(this.groundsList).subscribe(d => {
          d = this.helper.dataFormatter(d, false);
          console.log(d);
          const id = (this.isEdit) ? this.contract.id : contract['id'];
          this.router.navigate([`/contrats/afficher/${id}`]);
        }, error1 => {
          this.toastr.warning(error1.error.message);
          if (!this.isEdit) {
            this.contractService.deleteContract(contract.id).subscribe(c => console.log(c), err => console.log(err));
          }
        })
      }, error1 => {
        throw error1;
      });
    }
  }
}
