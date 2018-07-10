import { Component, OnInit } from '@angular/core';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from "util";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  preconisations_intrants: any;
  helper: any;

  constructor( ) {
    this.helper = Helper;
  }

  ngOnInit() {

    this.preconisations_intrants = [
      {
    id : 5 , ref : 56, cda : 'CDA 231' , zone : 3, parcelle : 3831, nom_agriculteur : 'MAYOU MANSOUR' , cin : 'GB84622',
    nbr_article : 7, date_de_commande : '21/06/2018 16:24:22', etat : 'ENCOURS'
    },
      {
        id : 7 , ref : 14 , cda : 'CDA 954' , zone : 7, parcelle : 232, nom_agriculteur : 'ILYAS HASSAN' , cin : 'D89452',
        nbr_article : 7, date_de_commande : '04/01/2018 01:04:22', etat : 'ANNULÉ'
      }

    ];

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
