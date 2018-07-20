import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehoseService } from '../../service/warehose.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  magasin: any = null;

  constructor(private warehoseService: WarehoseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.magasin = [];

  }


  ngOnInit() {

    this.route.params.subscribe(
      params => {
        this.warehoseService.getWarehouse(params.id).subscribe((response) => {
          this.magasin = response.data;
        });
      });
  }


}
