import { Component, OnInit } from '@angular/core';
import { PreconisationsIntrantsService } from '../../../preconisations-intrants/service/preconisations-intrants.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MouvementsService } from '../../service/mouvements.service';
import { Helper } from '../../../../shared/classes/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-retour',
  templateUrl: './show-retour.component.html',
  styleUrls: ['./show-retour.component.scss']
})
export class ShowRetourComponent implements OnInit {

  mouvement: any;
  articles: any;
  selectedItems: any;
  popupDeleteVisible: any;
  popupDeliverVisible: any;
  retour_valider_enabled: any;
  products = [];
  stock_operation = {};
  helper: any;


  constructor(private preconisationsIntrantsService: PreconisationsIntrantsService, private route: ActivatedRoute, private toastr: ToastrService,
    private mouvementService: MouvementsService, private router: Router) {

    this.helper = Helper;
    this.articles = [];
    this.products = [];

  }

  ngOnInit() {


    this.route.params.subscribe(
      params => {
        this.preconisationsIntrantsService.getPreconisation(params.id).subscribe((response) => {
          this.mouvement = response.data;
          this.articles = response.data.articles;

          let dd: any; let mm: any; let today: any; let yyyy: any;
          today = new Date();
          dd = today.getDate();
          mm = today.getMonth() + 1;
          yyyy = today.getFullYear();
          if (dd < 10) {
            dd = '0' + dd;
          }
          if (mm < 10) {
            mm = '0' + mm;
          }
          today = dd + '/' + mm + '/' + yyyy;
          this.mouvement.date = today;

          this.stock_operation = {
            commande: this.mouvement.order_id,
            emetteur: this.mouvement.third_party_id,
            recepteur: this.mouvement.source,
            type: 'return'
          };




        }, error1 => {
          throw error1;
        });
      });
  }



  removeRetourItem(id) {
    this.articles.forEach((it) => {

      if (it.id === id) {
        const index = this.articles.indexOf(it, 0);
        this.articles.splice(index, 1);
      }
    });
  }



  valuechange(e: any, data: any, value: any): void {



    this.retour_valider_enabled = true;

    this.articles.forEach((it) => {

      if (it.id === data.data.id) {
        if (it.quantity < value) {
          this.retour_valider_enabled = false;

          this.toastr.error('la quantité retour est supérieure à la quantité globale');
        } else {
          if (value !== 0) {
            it.quantity_retour1 = value;
          }
        }
      }

    });

  }


  Deliver() {

    this.products = [];
    this.articles.forEach((it) => {

      if (typeof it.quantity_retour1 !== 'undefined') {
        this.products.push({
          // 'famille_id': it.article.category.article_category.id,
          // 'sub_famille_id': it.article.category.id ,
          'article_id': it.id,
          'quantity_retour1': it.quantity_retour1
        });
      }
    });

    console.log(this.stock_operation);
    console.log(this.products);
    const data = {
      'stock_operation': this.stock_operation,
      'products': this.products
    };
    console.log(data);
    this.mouvementService.addReturn(data).subscribe(d => {
      d = this.helper.dataFormatter(d, false);
      this.toastr.success(
        `Mouvement ajouté avec succès.`);
      this.router.navigate([`/mouvements/afficher/${d['id']}`]);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    });

  }


}






