import { Component, OnInit } from '@angular/core';
import { Contract } from '../../classes/contract';
import { Third } from '../../../thirds/classes/third';
import { AgreementGround } from '../../classes/agreement-ground';
import { ContractsService } from '../../services/contracts.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  agreement_grounds: AgreementGround[];

  constructor(public contract: Contract,
    public tier: Third,
    public contractService: ContractsService,
              public toastr: ToastrService) { }

  ngOnInit() {
    this.contractService.getContracts().subscribe(data => {
      //
    }, error1 => {
      this.toastr.error(error1.error.message);
    });
  }

}
