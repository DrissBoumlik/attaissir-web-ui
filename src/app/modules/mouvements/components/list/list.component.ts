import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { WarehoseService } from '../../../warehouse/service/warehose.service';
import { Helper } from '../../../../shared/classes/helper';
import { isNull } from 'util';
import { MouvementsService } from '../../service/mouvements.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  mouvements: any = {};
  helper: any;


  constructor(private warehoseService: WarehoseService, private mouvementsService: MouvementsService) {
    this.helper = Helper;
  }



  ngOnInit() {
    this.mouvements.store = new CustomStore({
      load: (loadOptions: any) => {
        loadOptions['requireTotalCount'] = true;
        return this.mouvementsService.getListeDemandesDx(loadOptions)
          .toPromise()
          .then(response => {

            response.data.forEach((it) => {
              if (it.to_warehouse_name != null) {
                it.emetter = it.to_warehouse_name;
              } else if (it.to_third_name != null) {
                it.emetter = it.to_third_name;
              }

              if (it.from_third_name != null) {
                it.recepteur = it.from_third_name;
              } else if (it.from_warehouse_name != null) {
                it.recepteur = it.from_warehouse_name;
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
