import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { isNull } from "util";
import { ActivatedRoute, Router } from '@angular/router';
import { PreconisationsIntrantsService } from '../../service/preconisations-intrants.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  preconisations_intrants: any = {};
  helper: any;

  constructor(private route: ActivatedRoute, private preconisationsIntrantsService: PreconisationsIntrantsService) {
    this.helper = Helper;
  }



  ngOnInit() {

    this.preconisations_intrants.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.preconisationsIntrantsService.getListeDemandesDx( loadOptions )
          .toPromise()
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });

  }




}
