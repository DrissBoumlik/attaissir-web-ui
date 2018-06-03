import { Component, OnInit } from '@angular/core';
import { Contract } from '../../classes/contract';
import { ContractsService } from '../../services/contracts.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Structure } from '../../classes/structure';
import { Third } from '../../../thirds/classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { Document } from '../../../thirds/classes/document';

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

  constructor(private contractService: ContractsService,
    private route: ActivatedRoute,
    private router: Router,
    private thirdsService: ThirdsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.contractService.getContract(+params.id).subscribe(
          (res: any) => {
            this.contract = res.data;
            this.third = res.data.third_party;
            this.campagnes = res.data.campaigns;
            this.documents = res.data.documents;
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
        this.docTypes = this.thirdsService.dataFormatter(res, false);
      }
    );
  }

  onAddDOC(e: any) {
    console.log(e);
    console.log(this.filePath);
    const newDoc = {
      type: e.data.label,
      file: this.filePath[0]
    };
    console.log(newDoc);
    this.thirdsService.addDocument(newDoc.file).subscribe(
      res => {
        this.thirdsService.putDocumentInfo({
          agreement_id: this.contract.id,
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

}

