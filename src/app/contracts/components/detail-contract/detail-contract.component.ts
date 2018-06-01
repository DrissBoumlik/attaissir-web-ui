
import { Component, OnInit } from '@angular/core';
import { Contract } from '../../classes/contract';
import { ContractsService } from '../../services/contracts.service';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Structure } from '../../classes/structure';
import { Third } from '../../../thirds/classes/third';
import { ThirdsService } from '../../../thirds/services/thirds.service';

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.scss']
})
export class DetailContractComponent implements OnInit {
  contract: Contract;
  structure: Structure;
  third: Third;
  attatchments: any;

  constructor(private contractService: ContractsService,
    private route: ActivatedRoute,
    private router: Router,
    private thirdsService: ThirdsService) { }

  ngOnInit() {
    /*this.route.params.subscribe(
      params => {
        this.contractService.getContract(+params.id).subscribe(
          (res: any) => {
            this.contract = res.data;
            this.third = this.contract.third;
            this.structure = this.contract.structure;
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
    );*/
  }

}

