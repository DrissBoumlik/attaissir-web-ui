import { Component, OnInit } from '@angular/core';
import { WarehoseService } from '../../../warehouse/service/warehose.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mystock',
  templateUrl: './mystock.component.html',
  styleUrls: ['./mystock.component.scss']
})
export class MystockComponent implements OnInit {

  constructor(private warehouseService: WarehoseService, private router: Router) { }

  ngOnInit() {

    this.warehouseService.getWarehouseByStruct(Number(localStorage.getItem('tenantId'))).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/stock/situation'], { queryParams: { magasin: response.data.id } });

    });

    // console.log(localStorage.getItem('tenantId'));
  }

}
