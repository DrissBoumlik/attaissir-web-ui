import { Component, OnInit } from '@angular/core';
import { ParcelsService } from '../../services/parcels.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import 'devextreme/integration/jquery';
import { Router } from '@angular/router';
import { Helper } from '../../../../shared/classes/helper';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  parcels: any;
  selectedItems: any;
  helper: any;

  constructor(public parcelsServices: ParcelsService,
    private router: Router) {
    this.parcels = {};
    this.helper = Helper;
  }

  ngOnInit() {
    this.parcels.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.parcelsServices.getParcelsDx(loadOptions)
          .toPromise()
          .then(response => {
            let data = response;
            data = data['data'].filter((a) => {
              console.log(a);
              a['parcels'] = [];
              for (let i = 0; i < data['data'].length; i++) {
                if (a.id === data['data'][i].parcel_id) {
                  a['parcels'].push(data['data'][i]);
                }
              }
              return !a.parcel_id;
            });
            console.log(data);
            response['data'] = data;
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  onStartEdit = (e) => { };
  onRemoveParcel = (e) => { };
  deleteRecords = () => { };

}
