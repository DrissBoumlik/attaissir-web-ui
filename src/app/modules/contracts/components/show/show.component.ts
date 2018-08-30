import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Structure } from '../../../../shared/classes/structure';
import { Third } from '../../../../shared/classes/third';
import { Contract } from '../../../../shared/classes/contract';
import { ContractsService } from '../../services/contracts.service';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { Helper } from '../../../../shared/classes/helper';
import { RightHolderService } from '../../services/right-holder.service';
import { ParcelsService } from '../../../parcels/services/parcels.service';
import { CardsService } from '../../../cards/services/cards.service';
import { Parcel } from '../../../../shared/classes/parcel';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-detail-contract',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  contract: Contract;
  structure: Structure;
  third: Third;
  documents: Document[];
  campagnes: any;
  docTypes: any;
  filePath = [];
  id: number;
  avenants: any;
  avenant: any;
  parcels: any;
  canValidateContract: boolean;
  hasRightAttatchment: boolean;
  isContractEncours: boolean;
  helper: any;
  rightsholders: any;
  selectedItems: any[];



  constructor(private contractService: ContractsService,
    private route: ActivatedRoute,
    private router: Router,
    private rightHolderService: RightHolderService,
    private thirdsService: ThirdsService,
    public parcelService: ParcelsService,
    public cardService: CardsService,
    private toaster: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.contractService.getContract(+params.id).subscribe(
          (res: any) => {
            this.id = params.id;
            this.contract = res.data;
            this.third = res.data.third_party;
            this.campagnes = res.data.contracted_surface;
            this.avenants = res.data.amendments;
            this.avenant = (this.avenants.length > 0) ? this.avenants[this.avenants.length - 1] : null;
            this.parcels = res.data.parcels.map((data) => {
              return this.helper.makeParcel(data);
            }).filter((a) => {
              return !a.parcel_id;
            });
            console.log(this.parcels);
            this.isContractEncours = this.contract.status === 'inprogress';

            this.rightHolderService.getAllDx(this.id).subscribe((_res: any) => {
              this.rightsholders = _res;
            }
            );

          },
          (error) => {
            this.router.navigate(['/404']).catch(
              err => {
              }
            );
          }
        );
      }
    );
    this.thirdsService.getDocTypes().subscribe(
      (res: any) => {
        this.docTypes = Helper.dataSourceformatter(res);
      }
    );

  }

  onRemoveDOC(e: any) {
    this.thirdsService.deleteDocument(e.data.id).subscribe(
      (res) => {
        this.toaster.success('Le document a été supprimé avec succès.');
      },
      (err) => {
        this.toaster.error(err.message);
      }
    );
  }

  onAddDOC(e: any) {
    const d = new $.Deferred();
    const newDoc = {
      type: e.data.name,
      file: this.filePath[0]
    };
    e.cancel = true;
    this.thirdsService.addDocument(newDoc.file, newDoc.type, this.contract.id.toString(), this.third.id.toString()).subscribe(
      res => {
        this.loadDocuments();
        d.resolve();
        e.cancel = true;
        this.toaster.success('Le document a été téléchargé avec succès.');
      }, error => {
        d.reject('Le document que vous essayez d\'importer est  trop volumineux, ou bien corrompu.');
      });
    e.cancel = d.promise();
  }

  onAddRightHolder(e: any) {
    const d = new $.Deferred();
    const newRightHolder = {
      contract_id: this.id,
      full_name: e.data.full_name,
      cin: e.data.cin,
      description: e.data.description
    };
    e.cancel = false;
    this.rightHolderService.addRightHolder(newRightHolder).subscribe(
      res => {
        this.loadDocuments();
        d.resolve();
        e.cancel = true;
        this.toaster.success('L element a été ajouté avec succès.');

         this.rightHolderService.getAllDx(this.id).subscribe((_res: any) => {
              this.rightsholders = _res;
            });

      }, error => {
        //  d.resolve();
        e.cancel = true;
        d.reject('erreur');
      });
    e.cancel = d.promise();
  }

  loadDocuments() {
    this.contractService.getContract(this.contract.id).subscribe(
      (res: any) => {
        this.documents = res.data.documents.map(doc => {
          return doc = {
            downloadPath: doc.path,
            id: doc.id,
            path: doc.path,
            name: this.docTypes.find(dt => dt.ID === doc.type).Name,
          };
        });
      }
    );
  }

  downloadDocument(data: any) {
    window.open(`${environment.apiUrl}/storage/${data.value}`);
  }

  activateContrat() {
    this.contractService.activateContract(this.contract.id).subscribe(
      (res) => {
        this.contract.status_value = 'Actif';
        this.isContractEncours = false;
        this.toaster.success('Le contrat a été activé avec succés');
      },
      (err) => {
        this.toaster.error('Prière de joindre un contrat signé avant de valider');
      }
    );
  }

  createLogicalParcel = (e) => {
    console.log(this.selectedItems);
    let annuel_surfaces = 0;
    let name = '';
    let zone: number;
    let soil_id: number;
    const parcels = this.selectedItems.map(p => {
      annuel_surfaces += Number(p.annuel_surface);
      name = `${p.cda}${p.zone}`;
      zone = p.zone_id;
      soil_id = p.soil_id;
      return {
        id: p.id
      };
    });
    const parcel = new Parcel();
    parcel.name = name;
    parcel.annuel_surface = annuel_surfaces;
    parcel.exploited_surface = null;
    parcel.manuel_surface = null;
    parcel.gps_surface = null;
    parcel.harvested_surface = null;
    parcel.abandoned_surface = null;
    parcel.cleared_surface = null;
    parcel.stricken_surface = null;
    parcel.zone_id = zone;
    parcel.third_party_id = this.third.id;
    parcel.campaign_id = this.contract.campaign.id;
    parcel.soil_id = soil_id;
    parcel.contract_id = this.contract.id;
    parcel.is_logical = true;
    const data = {
      parcels: parcels,
      parcel: parcel
    };
    this.parcelService.addParcelLogical(this.helper.realObject(data)).subscribe(d => {
      d = this.helper.dataFormatter(d, false);
      console.log(d);
      this.parcels = [];
      this.parcels.push(d);
      const physical_parcels = d['parcels'].filter(dat1 => !dat1.parcel_id);
      this.parcels = this.parcels.concat(physical_parcels).map(dat => {
        return this.helper.makeParcel(dat);
      });
      this.toaster.success('Le parcelle logique est crée avec succés');
    }, error1 => {
      throw error1;
    });
  }

  initSelectionRows = (e) => {
    /*if (!e.values[1]) {
      console.log(e.rowElement[0].cells[0].remove());
    }*/
    console.log(e);
  }


  downloadContract() {
    this.contractService.printContract(this.contract.id).subscribe(data => {
      window.open(data['data']['file']);
    }, err => {
      throw err;
    });
  }


  onUpdateRightHolder(e: any) {
    console.log(e);
    const d = new $.Deferred();
    const updateRightHolder = {
      contract_id: this.id,
      full_name: e.newData.full_name,
      cin: e.newData.cin,
      description: e.newData.description
    };
    e.cancel = true;
    console.log(e);
    this.rightHolderService.editRightHolder(e.oldData.id, updateRightHolder).subscribe(
      res => {
        this.loadDocuments();
        d.resolve();
        e.cancel = true;
        this.toaster.success('L element a été modifié avec succès.');
      }, error => {
        // d.reject('erreur');
      });
    e.cancel = d.promise();
  }


  onRemoveRightHolder(event): any {

    this.rightHolderService.deleteRightHolder(event.data.id).subscribe(
      (res) => {
        this.toaster.success('l \' element est supprimé avec succès.');
      },
      (err) => {
        throw err;
      }
    );
  }


}
