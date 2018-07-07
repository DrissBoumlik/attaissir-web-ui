import { Component, OnInit } from '@angular/core';
import {ListeDesDemandesService} from '../../service/liste-des-demandes.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import {Helper} from '../../../../shared/classes/helper';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list_des_demandes: any;
  helper: any;
  constructor(public listeDesDemandesService: ListeDesDemandesService) {
    this.helper = Helper;
    this.list_des_demandes = {};
  }

  ngOnInit() {
      this.list_des_demandes.store = new CustomStore({
        load: (loadOptions: any) => {
          console.log('loqd');
          return this.listeDesDemandesService.getListeDemandesDx(loadOptions)
            .toPromise()
            .then(response => {
              console.log(response);
              const json = response;
              return json;
            })
            .catch(error => {
              throw error;
            });
        }
      });
  }



  gotoShow() {

  }

  getStatusColor() {

  }

}
