import { Component, OnInit } from '@angular/core';
import { Contract } from '../../../classes/contract';
import { Third } from '../../../classes/third';
import { Structure } from '../../../classes/structure';
import { Location } from '@angular/common';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractsService } from '../../services/contracts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  groundsList?: any[];
  campaigns?: any[];
  id: number;

  constructor(
    public contract: Contract,
    public currentThird: Third,
    public structure: Structure,
    public route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private contractService: ContractsService) { }

  ngOnInit() {
    this.groundsList = [];
    this.campaigns = [];

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        // e
      } else {
        this.toastr.warning('ID not provided.');
        this.location.back();
      }
    });

    this.route.params.subscribe(
      params => {
        this.contractService.getContract(+params.id).subscribe(
          (res: any) => {
            this.id = params.id;
            this.contract = res.data;
            this.currentThird = res.data.third_party;
            // this.campaigns = res.data.campaigns;
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
            /*this.router.navigate(['/404']).catch(
              err => {
                console.log(err);
              }
            );*/
          }
        );
      }
    );
  }
}
