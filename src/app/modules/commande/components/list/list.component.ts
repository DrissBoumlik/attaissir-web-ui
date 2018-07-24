import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WarehoseService } from '../../../warehouse/service/warehose.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  commandes: any = {};

  constructor(private warehoseService: WarehoseService,
    private toastr: ToastrService) {
  }


  ngOnInit() {
    /* this.warehouses.store = new CustomStore({
       load: (loadOptions: any) => {
         return this.warehoseService.getAllDx(loadOptions)
           .toPromise()
           .then(response => {
             const json = response;
             return json;
           })
           .catch(error => {
             throw error;
           });
       },
       remove: (event: any) => {
         console.log(event);
         return this.warehoseService.deleteWarehouse(event.id)
           .toPromise()
           .then(res => {
             this.toastr.success('msg');
           })
           .catch(err => {
             console.log(err);
             throw err;
           });
       }
     });*/
  }


  gotoShow(ev: any) { }

}
