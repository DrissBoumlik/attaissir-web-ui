import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThirdsService } from '../../services/thirds.service';
import { Third } from '../../classes/third';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../../contracts/classes/contract';
import { Document } from '../../classes/document';

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
    private toaster: ToastrService) {
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

  }

  onAddDOC(e: any) {
    console.log(e);
    console.log(this.filePath);
    const newDoc = {
      type: e.data.label,
      file: this.filePath[0]
    };
    console.log(newDoc);
    this.thirdService.addDocument(newDoc.file).subscribe(
      res => {
        this.thirdService.putDocumentInfo({
          third_party_id: this.third.id,
          document_type_id: newDoc.type
        }, res.data.id).subscribe(
          result => {
            console.log(result);
          }
        );
      }, error => {
        console.log(error);
      });
  }

  loadDocuments() {
    this.documents = this.thirdService.loadDocuments(this.third.id);
    console.log(this.documents);
  }

  downloadDocument(data: any) {
    window.open(data.value);
  }

}
