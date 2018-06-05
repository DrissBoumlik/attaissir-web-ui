import {Component, OnInit} from '@angular/core';
import {Contract} from '../../classes/contract';
import {ContractsService} from '../../services/contracts.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {Structure} from '../../classes/structure';
import {Third} from '../../../thirds/classes/third';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {Document} from '../../../thirds/classes/document';
import {environment} from '../../../../environments/environment';
import {CardsService} from '../../services/cards.service';
import {ToastrService} from 'ngx-toastr';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.scss']
})
export class DetailContractComponent implements OnInit {
  contract: Contract;
  structure: Structure;
  third: Third;
  documents: Document[];
  campagnes: any;
  docTypes: any;
  filePath = [];
  id: number;
  avenants: any;
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
            this.campagnes = res.data.campaigns;
            this.documents = res.data.documents;
            this.avenants = res.data.avenants;
            this.isContractEncours = this.contract.status === 'encours';
            /* this.hasRightAttatchment = this.documents.find(doc => {
               return doc.type.id === 5;
             });*/


            this.contractService.getStrcutureById(res.data.structure.id).subscribe(
              (struct: Structure) => {
                this.structure = this.contractService.dataFormatter(struct, false);
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (error) => {
            /*this.router.navigate(['/404']).catch(
              err => {
                console.log(err);
              }
            );*/
          }
        );
      }
    );
    this.thirdsService.getDocTypes().subscribe(
      (res: any) => {
        this.docTypes = this.thirdsService.dataFormatter(res, false);
      }
    );

  }

  onRemoveDOC(e: any) {
    this.thirdService.deleteDocument(e.data.id).subscribe(
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
      type: e.data.label,
      file: this.filePath[0]
    };
    e.cancel = true;
    e.data.label = this.docTypes.find(dt => {
      return dt.id === newDoc.type;
    }).label;
    this.thirdsService.addDocument(newDoc.file).subscribe(
      res => {
        this.thirdsService.putDocumentInfo({
          agreement_id: this.contract.id,
          document_type_id: newDoc.type
        }, res.data.id).subscribe(
          result => {
            e.data.downloadPath = result.data.path;
            d.resolve();
          }
        );
      }, error => {
        console.log(error);
      });
    e.cancel = d.promise();
  }

  loadDocuments() {
    this.documents = this.contract.documents.map(doc => {
      return doc = {
        downloadPath: doc.path,
        id: doc.id,
        path: doc.path,
        label: doc.type.label
      };
    });
  }

  downloadDocument(data: any) {
    window.open(`${environment.apiUrl}/storage/${data.value}`);
  }


  addAvenant(idContract: number) {
    console.log(idContract);
  }

  getStatusColor(value: string): string {
    switch (value) {
      case 'inactif' : {
        return 'badge badge-pill badge-warning';
      }
      case 'actif' : {
        return 'badge badge-pill badge-success';
      }
      case 'encours' : {
        return 'badge badge-pill badge-info';
      }
      case 'suspendu' : {
        return 'badge badge-pill badge-dark';
      }
      default : {
        return 'badge badge-pill badge-danger';
      }
    }
  }

  activateContrat() {
    console.log(1);
    this.contractService.activateContract(this.contract.id).subscribe(
      (res) => {
        this.contract.status = 'actif';
        this.isContractEncours = false;
        this.toaster.success('Le contrat a été activé avec succés');
      },
      (err) => {
        this.toaster.error('Prière de joindre un contrat avant de valider');
      }
    );
  }
}

