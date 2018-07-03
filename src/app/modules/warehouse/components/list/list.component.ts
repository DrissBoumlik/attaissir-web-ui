import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WarehoseService } from '../../service/warehose.service';
import CustomStore from 'devextreme/data/custom_store';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { ZonesService } from '../../../contracts/services/zones.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  warehouses: any = {};

  constructor(private warehoseService: WarehoseService,
    private thirdService: ThirdsService,
    private zoneService: ZonesService,
    private toastr: ToastrService) {
  }


  ngOnInit() {
    this.warehouses.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.warehoseService.getAllDx(loadOptions)
          .toPromise()
          .then(response => {
            let third = {};
            response['data'] = response['data'].map(ress => {
              ress.third_party_id = 2;
              ress.zone_id = 14;
              this.zoneService.getCDAs().subscribe(
                cdas => {
                  const cda = cdas.find(c => {
                    return c.id === ress.zone_id;
                  });
                  ress.cda = cda.name;
                }
              );
              this.thirdService.getThird(ress.third_party_id, 'aggregared', false).subscribe(
                (res: any) => {
                  third = res.data;
                  ress.third = third;
                }
              );
              return ress;
            });
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
    });
  }


  gotoShow(ev: any) { }
}
