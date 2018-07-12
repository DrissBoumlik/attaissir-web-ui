import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WarehoseService } from '../../service/warehose.service';
import CustomStore from 'devextreme/data/custom_store';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ZonesService } from '../../../contracts/services/zones.service';
import { Helper } from '../../../../shared/classes/helper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  warehouses: any = {};
  selectedItems: any[] = [];
  helper: any;

  loadIndicatorVisible: any = false;

  constructor(private warehoseService: WarehoseService,
    private thirdService: ThirdsService,
    private zoneService: ZonesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.helper = Helper;

  }


  ngOnInit() {
    this.warehouses.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.warehoseService.getAllDx(loadOptions)
          .toPromise()
          .then(response => {
            return response;

          })
          .catch(error => {
            throw error;
          });
      },
      remove: (event: any) => {
        return this.warehoseService.deleteWarehouse(event.id)
          .toPromise()
          .then(res => {
            this.toastr.success('msg');
          })
          .catch(err => {
            throw err;
          });
      }
    });
  }


  gotoShow(ev: any) {

  }




  deleteRecords() {
    this.selectedItems.forEach((item) => {
      this.warehouses.remove(item);
    });
  }

  /**
   * Delete a third and update the list
   * @param {number} thirdId
   */
  onRemoveThird(id: number): any {
    this.warehoseService.deleteWarehouse(id).subscribe(
      (res) => {
        this.toastr.success('Nouveau agrégé ajouté avec succès.');
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }



  onStartEdit(id: number) {
    this.router.navigate([`/magasin/modifier/${id}`]).catch(
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }


  warehouse_nav(id) {
    this.router.navigate(['/stock/situation'], { queryParams: { magasin: id } });
  }




}
