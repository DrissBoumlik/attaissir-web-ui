import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Structure } from '../../../../shared/classes/structure';
import { Third } from '../../../../shared/classes/third';
import { Contract } from '../../../../shared/classes/contract';
import { ContractsService } from '../../services/contracts.service';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { CardsService } from '../../services/cards.service';
import { Helper } from '../../../../shared/classes/helper';
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

  constructor(private contractService: ContractsService,
    private route: ActivatedRoute,
    private router: Router,
    private thirdsService: ThirdsService,
    public cardService: CardsService,
    private toaster: ToastrService) {
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
            this.parcels = res.data.parcels;
            this.parcels = this.parcels.map((data) => {
              return {
                perimeter: ((data.soil !== null) && (data.soil.perimeter !== null))
                  ? data.soil.perimeter : 'Pas de données',
                region: ((data.soil !== null) && (data.soil.region !== null))
                  ? data.soil.region : 'Pas de données',
                district: ((data.soil !== null) && (data.soil.district !== null))
                  ? data.soil.district : 'Pas de données',
                rural_commune: ((data.soil !== null) && (data.soil.rural_commune !== null))
                  ? data.soil.rural_commune : 'Pas de données',
                cda: ((data.soil !== null) && (data.soil.cda !== null))
                  ? data.soil.cda : 'Pas de données',
                zone: ((data.soil !== null) && (data.soil.zone !== null))
                  ? data.soil.zone : 'Pas de données',
                sector: ((data.soil !== null) && (data.soil.sector !== null))
                  ? data.soil.sector : 'Pas de données',
                block: ((data.soil !== null) && (data.soil.block !== null))
                  ? data.soil.block : 'Pas de données',
                registration_number: ((data.soil !== null) && (data.soil.registration_number !== null))
                  ? data.soil.registration_number : 'Pas de données',
                annuel_surface: data.annuel_surface,
                tenure: data.tenure,
                code_ormva: data.code_ormva
              };
            });
            this.isContractEncours = this.contract.status === 'inprogress';
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


  getStatusColor(value: string): string {
    switch (value) {
      case 'inactif': {
        return 'm-badge m-badge--warning m-badge--wide';
      }
      case 'inprogress': {
        return 'm-badge m-badge--info m-badge--wide';
      }
      case 'actif': {
        return 'm-badge m-badge--success m-badge--wide';
      }
      case 'suspended': {
        return 'm-badge m-badge--danger m-badge--wide';
      }
      default: {
        return 'm-badge m-badge--primary m-badge--wide';
      }
    }
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


  downloadContract() {
    this.contractService.printContract(this.contract.id).subscribe(data => {
      window.open(data['data']['file']);
    }, err => {
      throw err;
    });

  }

}

