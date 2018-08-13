import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from '../../service/warehose.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  magasin: any = null;

  constructor(private WarehouseService: WarehouseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.magasin = [];

  }


  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.WarehouseService.getWarehouse(params.id).subscribe((response) => {
          this.magasin = response.data;
        });
      });
  }


}
