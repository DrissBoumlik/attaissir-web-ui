import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import 'devextreme/integration/jquery';
import { ContractsService } from '../../services/contracts.service';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { Helper } from '../../../../shared/classes/helper';

declare const require: any;
const $ = require('jquery');


@Component({
  selector: 'app-list-contract',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contracts: any;
  currentRowStatus: boolean;
  contract_status: string;
  helper: any;

  constructor(private contractsService: ContractsService,
    private thirdService: ThirdsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.contracts = {};
    this.helper = Helper;
  }

  ngOnInit() {
    this.contractsService.getContractsVars().subscribe(data => {
      this.contract_status = data['contract_status'];
    }, error1 => {
      throw error1;
    });
    this.contracts.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.contractsService.getContractsDx(loadOptions)
          .toPromise()
          .then(response => {
            response['data'] = response['data'].map(data => {
              data['status'] = this.getStatus(data.status);
              return data;
            });
            console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      },
      remove: (event: any) => {
        return this.contractsService.deleteContract(event.id)
          .toPromise()
          .then(response => {
            this.toastr.success('Le contrat a été supprimé avec succès');
          })
          .catch(error => {
            this.toastr.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      },
    });
  }





  selectionChanged(e) {
    /*e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);*/
  }

  contentReady(e) {
    /* if (!e.component.getSelectedRowKeys().length) {
       e.component.selectRowsByIndexes(0);
     }*/
  }



  showDetails(idContract: number) {
    this.router.navigate([`/contrats/afficher/${idContract}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }

  onStartEdit = (e) => {
    this.router.navigate([`/contrats/modifier/${e.data.id}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }

  onCellPrepared = (e) => {
    if (e.columnIndex === 10) {
      if (typeof e.key !== 'undefined') {
        if (e.key.status !== 'inprogress') {
          e.cellElement.find('.dx-link-delete').remove();
        }
      }
    }
  }

  getStatus(value: string): string {
    return this.contract_status[value].toUpperCase();
  }

}
