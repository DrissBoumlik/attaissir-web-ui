import { Component, OnInit } from '@angular/core';
import { Contract } from '../../classes/contract';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-list-contract',
  templateUrl: './list-contract.component.html',
  styleUrls: ['./list-contract.component.scss']
})
export class ListContractComponent implements OnInit {
  contracts: Contract[];

  constructor(private contractsService: ContractsService) { }

  ngOnInit() {
    this.contracts = null;// this.contractsService.getAllContracts();
    console.log(this.contracts);
  }

  onEditcontrat(contrat: any) {
    console.log(contrat);
  }
}
