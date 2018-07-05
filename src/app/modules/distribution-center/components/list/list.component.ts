import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {WarehouseService} from '../../services/warehouse.service';
import {Warehouse} from '../../../../shared/classes/warehouse';
import {ToastrService} from 'ngx-toastr';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  warehouses: any = {};

  constructor(private whService: WarehouseService,
              private toaster: ToastrService) { }

  ngOnInit() {
  this.warehouses.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.whService.getWarehousesDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            const json = response;
            return json;
          })
          .catch(error => {
            console.log(error);
            throw error;
          });
      },
      remove: (event: any) => {
        return this.whService.deleteWarehouse(event.id)
          .toPromise()
          .then(response => {
            console.log(response);
            this.toaster.success('Le centre de distribution a été supprimé avec succès');
          })
          .catch(error => {
            this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      },
      insert: (event: any) => {
        const warehouse = new Warehouse();
        warehouse.email = event.email;
        warehouse.city = event.city;
        warehouse.name = event.name;
        warehouse.address = event.address;
        warehouse.zip_code = event.zip_code;
        warehouse.tel = event.tel;
        warehouse.convention_ref = event.convention_ref;
        warehouse.structure_id = +localStorage.getItem('structure_id');
        console.log(warehouse);
        return this.whService.addIncident(warehouse)
          .toPromise()
          .then(res => {
            this.toaster.success('Le centre de distribution a été ajouté avec succès');
          })
          .catch(err => {
            this.toaster.error('Une erreur s\'est produite, veuillez réessayer plus tard.');
          });
      }
    });
  }

}
