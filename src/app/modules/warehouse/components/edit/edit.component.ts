import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Third} from '../../../../shared/classes/third';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {Helper} from '../../../../shared/classes/helper';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {WarehoseService} from '../../service/warehose.service';
import {Warehouse} from '../../../../shared/classes/warehouse';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;
  helper: any;

  constructor(public route: ActivatedRoute,
              private location: Location,
              public warehouse: Warehouse,
              private router: Router,
              public warehouseService: WarehoseService,
              private toastr: ToastrService) {
    this.helper = Helper;
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.warehouseService.getWarehouse(this.id, true)
          .subscribe(data => {
            console.log(data);
            this.warehouse = this.helper.dataFormatter(data, false);

          }, error1 => {
            this.toastr.warning('Magasin non trouvé.');
            this.location.back();
          });
      } else {
        this.toastr.warning('ID non fourni.');
        this.location.back();
      }
    });
  }



  /**
   * Submiting form data
   * @param e Event
   */
  onFormSubmit = function(e) {
    console.log('tttt1');
    this.warehouseService.editWarehouse(this.warehouse).subscribe(data => {
      this.toastr.success(
        `${this.warehouse.name.toUpperCase()} informations modifiées avec succès`
      );
    }, err => {
      throw err;
       // this.toastr.error(err.error.message);
    });

    e.preventDefault();
  };

}
