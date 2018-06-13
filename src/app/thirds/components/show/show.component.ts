import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdsService} from '../../services/thirds.service';
import {Third} from '../../../classes/third';
import {ToastrService} from 'ngx-toastr';
import {Contract} from '../../../classes/contract';
import {Document} from '../../../classes/document';
import {ContractsService} from '../../../contracts/services/contracts.service';
import {CardsService} from '../../../contracts/services/cards.service';
import {environment} from '../../../../environments/environment';
import {Helper} from '../../../classes/helper';

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
  documents: any;
  cards: any;
  patternRIB: any = /^\d{24}$/i;
  documentsList = true;
  docTypes: any;
  filePath = [];
  bank_accounts: any;

  constructor(private thirdService: ThirdsService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService,
              private contractService: ContractsService,
              private cardsService: CardsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.thirdService.getThird(+params.id, false).subscribe(
          (res: any) => {
            this.third = this.thirdService.dataFormatter(res, false);
            this.bank_accounts = [{
              bank_name: this.third.bank_name,
              bank_account_number: this.third.bank_account_number,
              bank_code: this.third.bank_code,
              bank_rib_key: this.third.bank_rib_key
            }];
            this.contracts = this.third['contracts'];
            this.cards = this.third.cards;
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
    this.thirdService.getDocTypes().subscribe(
      (res: any) => {
        this.docTypes = Helper.dataSourceformatter(res);
      }
    );
  }

  onRemoveBA(e: any) {
    e.cancel = true;
    e.data['id'] = this.third.id;
    e.data['bank_code'] = '';
    e.data['bank_account_number'] = '';
    e.data['bank_rib_key'] = '';
    e.data['bank_name'] = '';

    this.thirdService.editThird(e.data).subscribe(
      () => {
        this.toaster.success('Le compte bancaire a été supprimé avec succès.');
        e.cancel = false;
      },
      (err) => {
        throw err;
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
        throw err; // this.toaster.error(err.message);
      }
    );
  }


  onUpdateBA(e: any) {
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
        throw err; // this.toaster.error(err.message);
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
        throw err; // this.toaster.error(err.message);
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
    /*e.data.name = this.docTypes.find(dt => {
      return dt.id === newDoc.type;
    }).name;*/
    this.thirdService.addDocument(newDoc.file, newDoc.type, null, this.third.id.toString()).subscribe(
      res => {
        this.loadDocuments();
        d.resolve();
      }, error => {
      });
    e.cancel = d.promise();
  }

  loadDocuments() {
    this.thirdService.getThird(this.third.id, false).subscribe(
      (res: any) => {
        this.documents = res.data.documents.map(doc => {
          return doc = {
            downloadPath: doc.path,
            id: doc.id,
            path: doc.path,
            name: doc.name,
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
        return 'm-badge m-badge--wide m-badge--warning';
      }
      case 'actif': {
        return 'm-badge m-badge--wide m-badge--success';
      }
      case 'encours': {
        return 'm-badge m-badge--wide m-badge--info';
      }
      default: {
        return 'm-badge m-badge--wide m-badge--danger';
      }
    }
  }

  getAdequateAction(idCarte: number): string {
    let value;
    value = this.third.cards.find(card => {
      return card.id === idCarte;
    }).status;
    switch (value) {
      case 'inactif': {
        return 'Activer';
      }
      default: {
        return 'Désactiver';
      }
    }
  }

  /*getThirdAgreements = (idThird: number) => {
    this.contractService.getContractsByAgregre(idThird).subscribe(
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
  }*/

  showDetails(idContract: number) {
    this.router.navigate(['/contrats/show/' + idContract]).catch(
      err => {
        this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
      }
    );
  }

  switchCarteStatus(idCarte: number) {
    const carte = this.third.cards.find(card => {
      return card.id === idCarte;
    });
    const action = carte.status = carte.status === 'actif' ? 'activate' : 'deactivate';
    this.cardsService.massCards([idCarte], action).subscribe(
      (res) => {
        carte.status = carte.status === 'actif' ? 'inactif' : 'actif';
      },
      (err) => {
        this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
      }
    );
  }

  canHaveAction(id: number) {
    const carte = this.third.cards.find(card => {
      return card.id === id;
    });
    return carte.status === 'actif' || carte.status === 'inactif';
  }


  DeclareStolen(idCarte: number) {
    const carte = this.third.cards.find(card => {
      return card.id === idCarte;
    });
    carte.status = 'perdu';
    this.cardsService.editCard(carte).subscribe(
      (res) => {
      },
      (err) => {
      }
    );
  }


}
