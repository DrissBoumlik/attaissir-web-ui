import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdsService } from '../../services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContractsService } from '../../../contracts/services/contracts.service';
import { CardsService } from '../../../contracts/services/cards.service';
import { Contract } from '../../../../shared/classes/contract';
import { Third } from '../../../../shared/classes/third';
import { Helper } from '../../../../shared/classes/helper';
import { environment } from '../../../../../environments/environment';

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
  title: string;
  card_status: any;
  patternRIB: any = /^\d{24}$/i;
  documentsList = true;
  docTypes: any;
  filePath = [];
  bank_accounts: any;
  contract_status: any;
  helper: any;
  thirdType: string;

  constructor(private thirdService: ThirdsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toaster: ToastrService,
    private contractService: ContractsService,
    private cardsService: CardsService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.title = this.helper.getThirdTypeName(this.location.path());
    this.thirdType = this.helper.getThirdType(this.location.path());
    this.contractService.getContractsVars().subscribe(data => {
      this.contract_status = data['contract_status'];
    }, error1 => {
      throw error1;
    });
    this.thirdService.getThirdsVars().subscribe(data => {
      console.log(data);
      this.card_status = data['card_status'];
    }, error1 => {
      throw error1;
    });

    this.route.params.subscribe(
      params => {
        this.thirdService.getThird(+params.id, this.thirdType, false).subscribe(
          (res: any) => {
            this.third = this.helper.dataFormatter(res, false);
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

  getContract = (id) => {
    let contract;
    contract = this.contracts.filter(c => {

      return Number(c.id) === Number(id);
    });
    return contract[0];
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
        this.toaster.success('Le document a été téléchargé avec succès.');
      }, error => {
        d.reject('Le document que vous essayez d\'importer est  trop volumineux, ou bien corrompu.');
      });
    e.cancel = d.promise();
  }

  loadDocuments() {
    this.thirdService.getThird(this.third.id, this.thirdType, false).subscribe(
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


  getAdequateAction(idCarte: number): string {
    let value;
    value = this.third.cards.find(card => {
      return card.id === idCarte;
    }).status;
    switch (value) {
      case 'inactive': {
        return 'Activer';
      }
      default: {
        return 'Désactiver';
      }
    }
  }


  DeclareLost(idCarte: number) {
    const carte = this.third.cards.find(card => {
      return card.id === idCarte;
    });
    this.cardsService.editCard(carte.id, 'cancel').subscribe(
      (res) => {
        carte.status = 'lost';
        this.toaster.success('La carte  a été déclrée perdu');
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
    return carte.status === 'active' || carte.status === 'inactive';
  }

  activateCard(idCarte: number, bool?: string) {
    const action = bool ? 'deactivate' : 'activate';
    const carte = this.third.cards.find(card => {
      return card.id === idCarte;
    });
    this.cardsService.massCards([idCarte], action).subscribe(
      (res) => {
        carte.status = carte.status === 'active' ? 'inactive' : 'active';
        this.toaster.success('Opération réussie');
      },
      (err) => {
        this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
      }
    );
  }

  declareLost(value: number): boolean {
    const card = this.cards.find(c => c.id === value);
    return (card.printed_at && card.status !== 'lost');
  }

  canActivateCard(id: number): boolean {
    const card = this.cards.find(c => c.id === id);
    return (card.printed_at && card.status === 'inactive');
  }

  canDeactivateCard(id: number): boolean {
    const card = this.cards.find(c => c.id === id);
    return (card.printed_at && card.status === 'active');
  }
}
