import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {WarehoseService} from '../../../warehouse/service/warehose.service';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from "util";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  mouvements: any = {};

  mouvements_test = [];
  helper: any;


  constructor(private warehoseService: WarehoseService) {

    this.helper = Helper;

    this.mouvements_test =
      [ {id : 1, ref: 5146, type: 'typel', bon_nbr: 65465, emetter: 'med med', recepteur: 'med2 med 2', nbr_articles: 9 , status: 'recive'},
        {id : 1, ref: 5146, type: 'type2', bon_nbr: 65465, emetter: 'med med', recepteur: 'med2 med 2', nbr_articles: 9 , status: 'delivery'},
        {id : 1, ref: 5146, type: 'type2', bon_nbr: 65465, emetter: 'med med', recepteur: 'med2 med 2', nbr_articles: 9 , status: 'transfer'}
      ];

  }



  ngOnInit() {
this.mouvements = this.mouvements_test;
    /*this.mouvements.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.warehoseService.getAllDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });*/
  }



    getStatusColor(value: string): string {
      console.log(value);
      if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'recive'.toLowerCase() || value.toLowerCase() === 'Recive'.toLowerCase()) {
      return 'm-badge m-badge--primary m-badge--wide';
    } else if (value.toLowerCase() === 'delivery'.toLowerCase() || value.toLowerCase() === 'Delivery'.toLowerCase()) {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'transfer'.toLowerCase() || value.toLowerCase() === 'Transfer'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    }  else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }


  gotoShow(event) {

  }

}
