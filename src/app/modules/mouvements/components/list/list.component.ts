import {Component, OnInit} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from 'util';
import {MouvementsService} from '../../service/mouvements.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  mouvements: any = {};
  helper: any;


  constructor(private mouvementsService: MouvementsService) {
    this.helper = Helper;
  }


  ngOnInit() {
    this.mouvements.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.mouvementsService.getListeDemandesDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);

            response.data.forEach((it) => {
              if (it.type === 'receive') {
                it.type = 'réception';
              }
              if (it.type === 'return') {
                it.type = 'retour fournisseur';
              }
              if (it.to_warehouse_name != null) {
                it.recepteur = it.to_warehouse_name;
              } else if (it.to_third_name != null) {
                it.recepteur = it.to_third_name;
              }

              if (it.from_third_name != null) {
                it.emetter = it.from_third_name;
              } else if (it.from_warehouse_name != null) {
                it.emetter = it.from_warehouse_name;
              }
            });
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });


    Helper.permissionMethod(['none']);
    {
      console.log('ok');

    }
  }


  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done') {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress') {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'canceled') {
      return 'm-badge m-badge--danger m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }


  gotoShow(event) {

  }

}
