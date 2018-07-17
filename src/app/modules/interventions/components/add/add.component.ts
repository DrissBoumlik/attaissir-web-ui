import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../articles/services/articles.service';
import { ArticleCategiesService } from '../../../articles/services/article-categies.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import { InterventionService } from '../../services/intervention.service';
import { ActivatedRoute } from '@angular/router';
import { ThirdsService } from '../../../thirds/services/thirds.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  checkBoxValue: boolean;
  indeterminateValue: boolean;

  third_id: any;
  family_id: any;
  sub_family_id: any;

  buttonsave: any;
  buttonValider: any;
  buttonOptions: any;
  buttoncancel: any;

  interventions: any;
  articleOptions: any = [];
  familleOptions: any = [];
  commandeOptions: any;
  subFamilleOptions: any = [];

  sub_famille: any;

  semances: any;
  products: any;

  addSemance: any;
  addProduct: any;

  prestations_service: any;



  constructor(public familleService: ArticleCategiesService, public articleService: ArticlesService, public interventionService: InterventionService,
    private route: ActivatedRoute, private thirdsService: ThirdsService
  ) {

    this.products = [];
    this.interventions = [];
    this.semances = [];

    this.prestations_service = [
      { name: 'OptionA', value: '1', checked: true },
      { name: 'OptionB', value: '2', checked: false },
      { name: 'OptionC', value: '3', checked: true }
    ];

  }

  ngOnInit() {

    console.log(this.third_id);

    this.addSemance = {
      text: 'AJOUTER',
      type: 'success',
      useSubmitBehavior: false,
      onClick: () => {
        this.semances.push({
          'famille_id': this.interventions.semance_famille,
          'sub_famille_id': this.interventions.semance_sub_famille,
          'article_id': this.interventions.semance_article,
          'quantity1': this.interventions.semance_quantity
        });
      }
    };

    this.addProduct = {
      text: 'AJOUTER',
      type: 'success',
      useSubmitBehavior: false,
      onClick: () => {
        this.products.push({
          'famille_id': this.products.prod_famille,
          'sub_famille_id': this.products.prod_sub_famille,
          'article_id': this.products.prod_article,
          'quantity1': this.products.prod_quantity
        });
      }
    };

    this.buttoncancel = {
      text: 'ANNULER',
      type: 'danger',
      useSubmitBehavior: true,
      onClick: () => {

      }
    };


    this.buttonValider = {
      text: 'VALIDER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: () => {

      }
    };


    this.buttonsave = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: () => {

      }
    };




    this.familleOptions = {
      label: 'Famille',
      displayExpr: 'name',
      valueExpr: 'id',
      searchEnabled: true,
      dataSource: new CustomStore({
        load: (loadOptions: any) => {
          return this.familleService.getArticleCategoriesDx(loadOptions)
            .toPromise()
            .then(response => {
              console.log(response);
              const json = response;
              return json;
            })
            .catch(error => {
              console.log(error);
              throw error;
            });
        },
        byKey: (key) => {
          console.log(key);
          return key;
        }
      }),
      onSelectionChanged: (event) => {
        this.subFamilleOptions = {
          label: 'Sous Famille',
          displayExpr: 'name',
          valueExpr: 'id',
          searchEnabled: true,
          dataSource: new CustomStore({
            load: (loadOptions: any) => {
              return this.familleService.getArticleSubCategories(event.selectedItem.id)
                .toPromise()
                .then(response => {
                  const json = response.data;
                  return json;
                })
                .catch(error => {
                  throw error;
                });
            }
          }),
          onSelectionChanged: (e) => {
            this.articleOptions = {
              label: 'Sous Famille',
              displayExpr: 'name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  return this.articleService.getArticlesByFamily(e.selectedItem.id)
                    .toPromise()
                    .then(response => {
                      const json = response.data;
                      return json;
                    })
                    .catch(error => {
                      throw error;
                    });
                }
              })
            };
          }
        };
      }
    };


    this.articleService.getArticlesByFamily(15)
      .toPromise()
      .then(response => {
        response.data.forEach((it) => {
          this.prestations_service.push({ id: it.id, name: it.name, value: it.id, checked: false });

        });
      })
      .catch(error => {
        throw error;
      });

    this.interventions.semance_famille = this.route.snapshot.queryParams['family_id'];
    this.interventions.prod_famille = this.route.snapshot.queryParams['family_id'];

    this.third_id = this.route.snapshot.queryParams['third_party_id'];
    this.family_id = this.route.snapshot.queryParams['family_id'];
    this.sub_family_id = this.route.snapshot.queryParams['sub_family_id'];

    this.thirdsService.getThird(this.third_id, "aggregated", true)
      .subscribe(response => {
        this.interventions = response.data;
        // console.log(response.data);
        // this.interventions = this.helper.dataFormatter(response, false);

      }, error1 => {
        // this.toastr.warning('Utilisateur non trouvé.');

      });




  }





}
