import {Component, OnInit} from '@angular/core';
import {WarehoseService} from '../../service/warehose.service';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {Router} from '@angular/router';
import {Warehouse} from '../../../../shared/classes/warehouse';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  helper: any

  constructor(
              private router: Router,
              public warehouse: Warehouse,
              public warehouseService: WarehoseService,
              private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    console.log('test');

  }


  onFormSubmit = function (e) {
    console.log('ok');
    this.warehouseService.addWarehouse(this.warehouse).subscribe(data => {
      this.toastr.success(
        `Nouveau magasin ajouté avec succès.`);
      this.router.navigate(['/magasin']);
    }, err => {
      throw err;
      // this.toastr.error(err.error.message);
    });
    e.preventDefault();
  };

}
