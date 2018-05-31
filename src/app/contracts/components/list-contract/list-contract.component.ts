import {Component, OnInit} from '@angular/core';
import {Contract} from '../../classes/contract';
import {ContractsService} from '../../services/contracts.service';
import {Third} from '../../../thirds/classes/third';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.scss']
})
export class ListContractComponent implements OnInit {
  contracts: Contract[];

  constructor(private contractsService: ContractsService,
              private thirdService: ThirdsService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
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
        this.toastr.error(err.message);
      }
    );
  }

  showDetails(idContract: number) {
    this.router.navigate(['../show/' + idContract], {relativeTo: this.route}).catch(
      err => {
        this.toastr.error(err);
      }
    );
  }


}

