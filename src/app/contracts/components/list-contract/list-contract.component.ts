import {Component, OnInit} from '@angular/core';
import {Contract} from '../../classes/contract';
import {ContractsService} from '../../services/contracts.service';
import {Third} from '../../../thirds/classes/third';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.scss']
})
export class ListContractComponent implements OnInit {
  contracts: Contract[];

  constructor(private contractsService: ContractsService,
              private thirdService: ThirdsService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.contracts = this.contractsService.getAllContracts();
    console.log(this.contracts);
  }

  onEditcontrat(contrat: any) {
    console.log(contrat);
  }

  getThirdDetails(IdTiers: any): any {

  }

  selectionChanged(e) {
    e.component.collapseAll(-1);
    e.component.expandRow(e.currentSelectedRowKeys[0]);
  }

  contentReady(e) {
   /* if (!e.component.getSelectedRowKeys().length) {
      e.component.selectRowsByIndexes(0);
    }*/
  }

  onDeleteContract(idContract: number) {
    this.contractsService.deleteContract(idContract).subscribe(
      () => {
        this.toastr.success('Le contrat a été supprimé avec succès');
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }
}
