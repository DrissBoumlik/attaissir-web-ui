import {Component, OnInit} from '@angular/core';
import {ParcelsService} from '../../services/parcels.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import 'devextreme/integration/jquery';
import {Router} from '@angular/router';
import {Helper} from '../../../../shared/classes/helper';

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
        console.log(loadOptions);
        return this.parcelsServices.getParcelsDx(loadOptions)
          .toPromise()
          .then((response: any) => {
            response.data.map((parcel) => {
              parcel.rib = !parcel.bank_code ? '' :  `${parcel.bank_code}${parcel.bank_account_number}${parcel.bank_rib_key}`;
              return parcel;
            });
            /*data = data['data'].filter((a) => {
              console.log(a);
              a['parcels'] = [];
              for (let i = 0; i < data['data'].length; i++) {
                data['data'][i].rib =  `${data['data'][i].bank_code}${data['data'][i].bank_account_number}${data['data'][i].bank_rib_key}`;
                if (a.id === data['data'][i].parcel_id) {
                  a['parcels'].push(data['data'][i]);
                }
              }
              return !a.parcel_id;
            });
            console.log(data);
            response['data'] = data;*/
            //  response['totalCount'] = data.filter(total => total.is_logical).length;
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  onStartEdit = (e) => {
  };
  onRemoveParcel = (e) => {
  };
  deleteRecords = () => {
  };

}
