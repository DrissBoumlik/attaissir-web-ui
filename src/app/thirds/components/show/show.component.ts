import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdsService} from '../../services/thirds.service';
import {Third} from '../../classes/third';
import {ToastrService} from 'ngx-toastr';
import {Contract} from '../../../contracts/classes/contract';
import {Document} from '../../classes/document';
import {ContractsService} from '../../../contracts/services/contracts.service';
import {CardsService} from '../../../contracts/services/cards.service';
import {environment} from '../../../../environments/environment';
declare const require: any;
const $ = require('jquery');


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  third: Third;
  contracts: Contract[];
  documents: Document[];
  patternRIB: any = /^\d{24}$/i;
  documentsList = true;
  docTypes: any;
  filePath = [];

  constructor(private thirdService: ThirdsService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private contractService: ContractsService,
              private carteService: CardsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.thirdService.getThird(+params.id).subscribe(
          (res: any) => {
            this.third = this.thirdService.dataFormatter(res, false);

          },
          (error) => {
            this.router.navigate(['/404']).catch(
              err => {
                console.log(err);
              }
            );
          }
        );
      }
    );
    this.thirdService.getDocTypes().subscribe(
      (res: any) => {
        this.docTypes = this.thirdService.dataFormatter(res, false);
        /* this.docTypes = this.docTypes.map((type: any) => {
           type.id = Number.parseInt(type.id);
           return type;
         });*/
      }
    );
  }

  onRemoveBA(e: any) {
    e.cancel = true;
    this.thirdService.deleteBankAccount(e.data.id).subscribe(
      () => {
        this.toaster.success('Le compte bancaire a été supprimé avec succès.');
        e.cancel = false;
        this.third.bank_accounts = this.third.bank_accounts.filter(ba => {
          return ba.id !== e.data.id;
        });
      },
      (err) => {
        this.toaster.error(err.message);
      }
    );
  }

  onAddBA(e: any) {
    const newBA = {
      bank: e.data.bank,
      rib: e.data.rib,
      third_party_id: this.third.id
    };
    this.thirdService.addBankAccount(newBA).subscribe(
      () => {
        e.cancel = false;
        this.toaster.success('Le compte bancaire a été ajouté avec succès.');
      },
      (err) => {
        this.toaster.error(err.error.message);
      }
    );
  }


  onUpdateBA(e: any) {
    console.log(e);
    const newBA = {
      bank: e.newData.bank ? e.newData.bank : e.oldData.bank,
      rib: e.newData.rib ? e.newData.rib : e.oldData.rib,
      third_party_id: this.third.id
    };
    this.thirdService.updateBankAccount(newBA, e.oldData.id).subscribe(
      () => {
        this.toaster.success('Le compte bancaire a été modifié avec succès.');
      },
      (err) => {
        e.cancel = false;
        this.toaster.error(err.error.message);
      }
    );
  }

  onStartUpdate(e: any) {
    e.data.rib = e.data.rib.replace(/\s/g, '');
  }

  onStartUpdateOrInsertDocument() {
    this.documentsList = false;
  }

  onUpdateDOC(e: any) {

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
    this.thirdService.addDocument(newDoc.file).subscribe(
      res => {
        this.thirdService.putDocumentInfo({
          third_party_id: this.third.id,
          document_type_id: newDoc.type
        }, res.data.id).subscribe(
          result => {
            e.data.downloadPath = res.data.path;
            d.resolve();
          }
        );
      }, error => {
        console.log(error);
      });
    e.cancel = d.promise();
  }

  loadDocuments() {
    this.documents = this.third.documents.map(doc => {
      return doc = {
        downloadPath: doc.path,
        id: doc.id,
        path: doc.path,
        label: doc.type.label
      };
    });
    console.log(this.documents);
  }

  downloadDocument(data: any) {
    window.open(`${environment.apiUrl}/storage/${data.value}`);
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
      default : {
        return 'badge badge-pill badge-danger';
      }
    }
  }

  getAdequateAction(idCarte: number): string {
    let value;
    value = this.third.cards.find(card => {
      return card.id === idCarte;
    }).status;
    switch (value) {
      case 'inactif' : {
        return 'Activer';
      }
      default : {
        return 'Désactiver';
      }
    }
  }

  getThirdAgreements = (idThird: number) => {
    this.contractService.getContracts().subscribe(
      (res: any) => {
        this.contracts = [];
        res.data.forEach(contract => {
          if (contract.third_cin === this.third.cin) {
            this.contractService.getContract(contract.id).subscribe(
              (contr: any) => {
                this.contracts.push(contr.data);
              }
            );
          }
        });
      }
    );
  }

  showDetails(idContract: number) {
    this.router.navigate(['/contrats/show/' + idContract]).catch(
      err => {
        this.toaster.error(err);
      }
    );
  }

  switchCarteStatus(idCarte: number) {
    const carte = this.third.cards.find(card => {
      return card.id === idCarte;
    });
    carte.status = carte.status === 'actif' ? 'inactif' : 'actif';
    this.carteService.editCard(carte).subscribe(
      (res) => {
        console.log('res : ' + res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
