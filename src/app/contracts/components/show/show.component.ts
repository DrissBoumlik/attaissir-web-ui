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
            console.log(this.contract);
            this.third = res.data.third_party;
            this.campagnes = res.data.contracted_surface;
            this.avenants = res.data.amendments;
            this.parcels = res.data.parcels;
            this.isContractEncours = this.contract.status === 'inprogress';
            /* this.hasRightAttatchment = this.documents.find(doc => {
               return doc.type.id === 5;
             });*/


            /*this.contractService.getStrcutureById(res.data.structure.id).subscribe(
              (struct: Structure) => {
                this.structure = this.contractService.dataFormatter(struct, false);
              },
              (err) => {
                console.log(err);
              }Object
            );*/
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
    this.thirdsService.getDocTypes().subscribe(
      (res: any) => {
        this.docTypes = Helper.dataSourceformatter(res);
        console.log(this.docTypes);
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
    console.log(e);
    e.cancel = true;
    /*e.data.name = this.docTypes.find(dt => {
      return dt.id === newDoc.type;
    }).name;*/
    this.thirdsService.addDocument(newDoc.file, newDoc.type, this.contract.id.toString(), this.third.id.toString()).subscribe(
      res => {
        this.loadDocuments();
        d.resolve();

        /*this.thirdsService.putDocumentInfo({
          contract_id: this.contract.id,
          type: newDoc.type
        }, res.data.id).subscribe(
          result => {
            e.data.downloadPath = result.data.path;
            d.resolve();
          }
        );*/
      }, error => {
        console.log(error);
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
            name: doc.type
          };
        });
      }
    );
  }

  downloadDocument(data: any) {
    window.open(`${environment.apiUrl}/storage/${data.value}`);
  }


  addAvenant(idContract: number) {
    console.log(idContract);
  }

  getStatusColor(value: string): string {
    switch (value) {
      case 'inactif': {
        return 'alert alert-warning';
      }
      case 'inprogress': {
        return 'alert alert-info';
      }
      case 'actif': {
        return 'alert alert-success';
      }
      case 'suspendu': {
        return 'alert alert-danger';
      }
      default: {
        return 'alert alert-primary';
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


  downloadContract() {
    this.contractService.printContract(this.contract.id).subscribe(data => {
      console.log(data['data']['file']);
      window.open(data['data']['file']);
    }, err => {
      throw err;
    });

  }

}

