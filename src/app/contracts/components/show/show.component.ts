import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../classes/contract';
import { ContractsService } from '../../services/contracts.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Structure } from '../../../classes/structure';
import { Third } from '../../../classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { Document } from '../../../classes/document';
import { environment } from '../../../../environments/environment';
import { CardsService } from '../../services/cards.service';
import { ToastrService } from 'ngx-toastr';
import {Helper} from '../../../classes/helper';

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
            this.parcels = res.data.parcels;
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
        this.toaster.success('Le document a été téléchargé avec succès.');
      }, error => {
        this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
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
            name: this.docTypes.find(dt => dt.ID ===  doc.type).Name,
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
      case 'Inactif': {
        return 'm-badge m-badge--warning m-badge--wide';
      }
      case 'inprogress': {
        return 'm-badge m-badge--info m-badge--wide';
      }
      case 'Actif': {
        return 'm-badge m-badge--success m-badge--wide';
      }
      case 'Suspendu': {
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

