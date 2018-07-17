import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandesService } from '../../service/demandes.service';
import { Helper } from '../../../../shared/classes/helper';
import { Article } from '../../../../shared/classes/article';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  order: any;
  produits: Article[];
  helper: any;

  constructor(private route: ActivatedRoute,
    private demandesService: DemandesService) {
    this.produits = [];
    this.helper = Helper;
    this.order = {
      id: 0
    };
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {

        this.demandesService.getOrder(params.id).subscribe((response) => {
          this.order = response.data;
          this.produits = this.order.articles;
        });

      });
  }

}
