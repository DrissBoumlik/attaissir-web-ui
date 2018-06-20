import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import 'devextreme/integration/jquery';
import { ContractsService } from '../../services/contracts.service';
import { ThirdsService } from '../../../thirds/services/thirds.service';

declare const require: any;
const $ = require('jquery');


@Component({
  selector: 'app-list-contract',
  templateUrl: './list-current.component.html',
  styleUrls: ['./list-current.component.scss']
})
export class ListCurrentComponent implements OnInit {
  contracts: any;
  currentRowStatus: boolean;
  contract_status: string;

  constructor(private contractsService: ContractsService,
    private thirdService: ThirdsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    this.contracts = {};
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
            let json = this.contractsService.dataFormatter(response, false);
            json = json.filter(data => {
              return data.parent_id === null;
            }).map(data => {
              return this.getCurrentContract(data, json);
            });
            console.log(json);
            return {
              data: json,
              totalCount: json.length
            };
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

  getCurrentContract = (contract: any, contracts: any) => {
    console.log(contracts);
    const avenants = contracts.filter(c => Number(c.parent_id) === Number(contract.id));
    console.log(avenants);
    return (avenants.length > 0) ? avenants[0] : contract;
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

  getStatusColor = (value: string): string => {
    this.currentRowStatus = (value === 'inprogress');
    switch (value) {
      case 'inactif': {
        return 'm-badge m-badge--wide m-badge--warning';
      }
      case 'actif': {
        return 'm-badge m-badge--wide m-badge--success';
      }
      case 'inprogress': {
        return 'm-badge m-badge--wide m-badge--info';
      }
      default: {
        return 'm-badge m-badge--wide m-badge--danger';
      }
    }
  }

  onStartEdit = (e) => {
    this.router.navigate([`/contrats/modifier/${e.data.id}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }


  getStatusClr(value: string): string {
    switch (value) {
      case 'inactif': {
        return 'm-badge m-badge--warning m-badge--wide';
      }
      case 'actif': {
        return 'm-badge m-badge--success m-badge--wide';
      }
      case 'inprogress': {
        return 'm-badge m-badge--info m-badge--wide';
      }
      case 'suspended': {
        return 'm-badge m-badge--wide m-badge--dark';
      }
      default: {
        return 'm-badge m-badge--wide m-badge--danger';
      }
    }
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
