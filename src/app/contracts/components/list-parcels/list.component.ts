import { Component, OnInit } from '@angular/core';
import {ParcelsService} from '../../services/parcels.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import 'devextreme/integration/jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  parcels: any;
  selectedItems: any;

  constructor(public parcelsServices: ParcelsService,
              private router: Router) {
    this.parcels = {};
  }

  ngOnInit() {
    this.parcels.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.parcelsServices.getParcelsDx(loadOptions)
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

  gotoShow = (id, link) => {
    this.router.navigate([`/${link}/afficher/${id}`]).catch(
      err => {
        throw err; // this.toastr.error(err.error.message);
      }
    );
  }

  onStartEdit = (e) => {};
  onRemoveParcel = (e) => {};
  deleteRecords = () => {};

}
