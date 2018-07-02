import {Component, OnInit} from '@angular/core';
import {WarehoseService} from '../../service/warehose.service';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {Router} from '@angular/router';
import {Warehouse} from '../../../../shared/classes/warehouse';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  constructor(public warehouse: Warehouse,
              private router: Router,
              public warehouseService: WarehoseService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }


  onFormSubmit = function (e) {
    console.log(e);
    this.warehouseService.addWarehouse(this.magasin).subscribe(data => {
      data = this.warehoseService.dataFormatter(data, false);
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
