<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandesService } from '../../service/demandes.service';
import { Helper } from '../../../../shared/classes/helper';
import { Article } from '../../../../shared/classes/article';
=======
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemandesService} from '../../service/demandes.service';
import {Helper} from '../../../../shared/classes/helper';
import {Article} from '../../../../shared/classes/article';
>>>>>>> 815c4ae3d5dc6e1eb620a8fe21b58ccb71f0a357

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
<<<<<<< HEAD
        this.demandesService.getOrder(params.id).subscribe((response) => {
          this.order = response.data;
          this.produits = this.order.articles;


          /*this.order.articles.forEach((it) => {
            const article = new Article();
            article.id = it.id;
            article.quantity = it.quantity;
            article.price = it.price;
            article.name = it.article.name;
            article.category = it.article.category.name;
            article.sub_category = it.article.category.article_category.name;
            this.produits.push(article);
            //  console.log(article);
          });*/
          //  console.log(this.produits);
=======
        this.listeDesDemandesService.getOrder(params.id).subscribe((response) => {
          this.demandesService.getOrder(params.id).subscribe((response) => {
            this.order = response.data;

            /*this.order.articles.forEach((it) => {
              const article = new Article();
              article.id = it.id;
              article.quantity = it.quantity;
              article.price = it.price;
              article.name = it.article.name;
              article.category = it.article.category.name;
              article.sub_category = it.article.category.article_category.name;
              this.produits.push(article);
              //  console.log(article);
            });*/
            //  console.log(this.produits);
          });
>>>>>>> 815c4ae3d5dc6e1eb620a8fe21b58ccb71f0a357
        });

      };
  }

}
