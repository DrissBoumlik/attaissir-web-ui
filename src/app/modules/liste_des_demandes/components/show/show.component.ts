import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListeDesDemandesService } from '../../service/liste-des-demandes.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  order: any;
  produits: Article[];
  constructor(private route: ActivatedRoute, private listeDesDemandesService: ListeDesDemandesService) {
    this.produits = [];
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.order = this.listeDesDemandesService.getOrder(params.id).subscribe((response) => {
          this.order = response.data;


          response.data.orderarticles.forEach((it) => {
            const article = new Article();
            article.id = it.id;
            article.quantity = it.quantity;
            article.price = it.price;
            article.name = it.article.name;
            article.category = it.article.category.name;
            article.sub_category = it.article.category.article_category.name;

            console.log(article);

            this.produits.push(article);
            //  console.log(article);


          });

          //  console.log(this.produits);

        });
      });

  }

}

export class Article {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  category: any;
  sub_category: string;
}
