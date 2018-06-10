import { Component, Input, OnInit } from '@angular/core';
import { Contract } from '../../../classes/contract';
import { ContractsService } from '../../services/contracts.service';
import { Third } from '../../../classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import 'devextreme/integration/jquery';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
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
            console.log(response);
            const json = response;

            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  onEditcontrat(contrat: any) {
    console.log(contrat);
  }

  getThirdDetails(IdTiers: any): any {

  }

  deleteRow = () => {
    console.log('ok');
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


  onDeleteContract(event: any) {
    event.cancel = true;
    this.contractsService.deleteContract(event.data.id).subscribe(
      () => {
        this.toastr.success('Le contrat a été supprimé avec succès');
        event.cancel = false;
      },
      (err) => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }

  showDetails(idContract: number) {
    this.router.navigate([`/contrats/afficher/${idContract}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }

  getStatusColor = (value: string): string => {
    this.currentRowStatus = (value === 'encours');
    switch (value) {
      case 'inactif': {
        return 'badge badge-pill badge-warning';
      }
      case 'actif': {
        return 'badge badge-pill badge-success';
      }
      case 'encours': {
        return 'badge badge-pill badge-info';
      }
      default: {
        return 'badge badge-pill badge-danger';
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
        return 'badge badge-pill badge-warning';
      }
      case 'actif': {
        return 'badge badge-pill badge-success';
      }
      case 'inprogress': {
        return 'badge badge-pill badge-info';
      }
      case 'suspendu': {
        return 'badge badge-pill badge-dark';
      }
      default: {
        return 'badge badge-pill badge-danger';
      }
    }
  }

  onCellPrepared = (e) => {
    if (e.columnIndex === 9) {
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
