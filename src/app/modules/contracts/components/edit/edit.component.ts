import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contract } from '../../../../shared/classes/contract';
import { Third } from '../../../../shared/classes/third';
import { Structure } from '../../../../shared/classes/structure';
import { ContractsService } from '../../services/contracts.service';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  groundsList?: any[];
  campaigns?: any[];
  id: number;
  helper: any;

  constructor(
    public contract: Contract,
    public currentThird: Third,
    public structure: Structure,
    public route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private contractService: ContractsService) {
    this.helper = Helper;
  }

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
            const grounds = res.data.parcels.map(data => {
              return {
                id: data['soil']['id'],
                parcel_tmp_id: data['id'],
                tenure: data['tenure_id'],
                registration_number: data['soil']['registration_number'],
                cda: data['soil']['cda_id'],
                zone: data['soil']['zone_id'],
                sector: data['soil']['sector'],
                block: data['soil']['block'],
                code_ormva: data['code_ormva'],
                total_surface: data['soil']['total_surface'],
                annuel_surface: data['annuel_surface']
              };
            });
            this.groundsList = grounds;
            this.currentThird = res.data.third_party;
            // this.campaigns = res.data.campaigns;
            this.contractService.getStrcutureById(res.data.structure.id).subscribe(
              (struct: Structure) => {
                this.structure = this.helper.dataFormatter(struct, false);
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
