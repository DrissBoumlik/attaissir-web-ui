import { Component, OnInit } from '@angular/core';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from "util";
import {ActivatedRoute, Router} from '@angular/router';
import {PreconisationsIntrantsService} from '../../service/preconisations-intrants.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

   preconisations_intrants: any = {};

  helper: any;

  constructor( private  route: ActivatedRoute, private  preconisationsIntrantsService: PreconisationsIntrantsService) {
    this.helper = Helper;
  }



  ngOnInit() {


    this.preconisations_intrants.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.preconisationsIntrantsService.getListeDemandesDx(loadOptions)
          .toPromise()
          .then(response => {
            return {
              data: response.data,
              totalCount: response.data.length
            };
          })
          .catch(error => {
            throw error;
          });
      }
    });

    this.route.params.subscribe(
      params => {
        if (params.cin == null) {
          console.log('all');
        } else {
          console.log('by_search');
        }
      });


  }


  gotoShow(event) {

  }



  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'Done'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'Inprogress'.toLowerCase()) {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'canceled'.toLowerCase() || value.toLowerCase() === 'Canceled'.toLowerCase()) {
      return 'm-badge m-badge--danger m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }



}
